'use strict';

import EventEmitter from 'eventemitter3';
import jsonpFetch from 'fetch-jsonp';
import { version } from '../package.json';
import { openPopup, keepPopupFocused } from './popup';
import SDKError from './SDKError';
import uri from './uri';
import persistence from './persistence';

export default class SDK {
    /**
     * @remark SPiD SDK v2 had a config merge functionality but we delegate it to the caller
     * @throws if the options object is missing or some of its values are invalid
     * @param {object} options
     * @param {string} options.redirect_uri - mandatory redirect uri
     * @param {string} options.client_id - mandatory client id
     * @param {boolean} options.popup - should we use a popup for login?
     * @param {boolean} options.useSessionCluster - should we use the session cluster
     *        (AKA HasSession endpoints)
     * @param {string} options.persistence {@link getPersistenceModule}
     * @param {object} [options.cache] - an object specifiying what to cache in memory
     * @param {object} [options.cache.hasSession] - should we cache hasSession data?
     *        The value is TTL in seconds
     * @param {object} [options.cache.hasProduct] - should we cache hasProduct data?
     *        The value is TTL in seconds
     * @param {object} [options.cache.hasSubscription] - should we cache hasSubscription data?
     *        The value is TTL in seconds
     * @param {string} [options.paymentServerUrl] - payment service
     */
    constructor(options) {
        // validate options
        if (typeof options !== 'object') {
            throw new TypeError(`options must be an object but it is ${typeof options}: ${options}`);
        }
        if ( typeof options.client_id !== 'string' ) {
            throw new TypeError('client_id parameter is required');
        }
        if ( typeof options.redirect_uri !== 'string' ) {
            throw new TypeError('redirect_uri parameter is required');
        }
        if ( typeof options.serverUrl !== 'string' ) {
            throw new TypeError('serverUrl parameter is required');
        }
        // Set minimum refresh timeout
        if (typeof options.refresh_timeout !== 'number' || options.refresh_timeout <= 60000) {
            options.refresh_timeout = 60000;
        }
        this.fetch = jsonpFetch;
        this.options = options;
        this.event = new EventEmitter();
        this._sessionInitiatedSent = false;
        this._userStatus = 'unknown';
        if (options.cache) {
            this.cache = new persistence.InMemoryCache();
        }
        // Old session
        this._session = {};
        this.persist = this.getPersistenceModule(options.persistence);
        this.uriBuilder = new uri.Builder(options.serverUrl, {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        });
        this.paymentUriBuilder = new uri.Builder(options.paymentServerUrl, {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        });
        this.event.emit('initialized');
    }

    getPersistenceModule(which = 'localstorage') {
        // TODO this could use heavy refactoring and optimization
        const key = `spid_js_${this.options.client_id}`;
        switch (which) {
            case 'localstorage':
                return new persistence.WebStoragePersistence(key);
            case 'cookie':
                return new persistence.CookiePersistence(key);
            default:
                return new persistence.NullPersistence();
        }
    }

    version() {
        return version;
    }

    clearClientData() {
        this.persist.clear();
        this.cookie.clearVarnishCookie();
    }

    acceptAgreement() {
        return this.fetch(this.uriBuilder.agreement())
            .then(() => {
                this.clearClientData();
                return this.hasSession();
            });
    }

    emitSessionEvent(previous, current) {
        // Respons contains a visitor
        if (current.visitor) {
            this.event.emit('visitor', current.visitor);
        }
        // User has created a session, or user is no longer the same
        if (current.userId && previous.userId !== current.userId) {
            this.event.emit('login', current);
        }
        // User is no longer logged in
        if (previous.userId && !current.userId) {
            this.event.emit('logout', current);
        }
        // One user was logged in, and it is no longer the same user
        if (previous.userId && current.userId && previous.userId !== current.userId) {
            this.event.emit('userChange', current);
        }
        // There is a user now, or there used to be a user
        if (previous.userId || current.userId) {
            this.event.emit('sessionChange', current);
        } else {
            // No user neither before nor after
            this.event.emit('notLoggedin', current);
        }
        // Fired when the session is successfully initiated for the first time
        if (current.userId && !this._sessionInitiatedSent) {
            this._sessionInitiatedSent = true;
            this.event.emit('sessionInit', current);
        }
        // Triggered when the userStatus flag in the session has changed
        if (current.userStatus !== this._userStatus) {
            this._userStatus = current.userStatus;
            this.event.emit('statusChange', current);
        }
        // TODO: VGS.loginStatus?
    }

    hasSession() {
        // Try to resolve from cache (it has a TTL)
        const cachedData = this.persist.get();
        if (cachedData) {
            return Promise.resolve(cachedData);
        }
        return this.fetch(this.options.useSessionCluster ? this.uriBuilder.sessionCluster(1) : this.uriBuilder.session(1))
            .catch(err => {
                if (this.options.useSessionCluster && err && err.type === 'LoginException') {
                    // we were trying the session cluster but it failed, let's try the PHP endpoint
                    this.event.emit('loginException');
                    // Fallback to core
                    // TODO what if the first call was already to cors ha? :) Double-call?
                    return fetch(this.uriBuilder.session(1));
                }
                throw new SDKError(err);
            })
            .then(response => response.json())
            .then(data => {
                // TODO shouldn't it be `&&` instead of `||` ?
                if (data.result || (this.options.cache && this.options.cache.hasSession)) {
                    // TODO maybe the persist classes themselves should fallback to TTL smartly?
                    this.persist.set(data, data.expiresIn || this.options.cache.hasSessionTTL);
                }
                this.emitSessionEvent(this._session, data);
                this._session = data;
            },
            err => this.event.emit('error', err)
        );
    }

    hasProduct(productId) {
        const cacheKey = `prd_${productId}`;
        if (this.cache) {
            const cachedVal = this.cache.get(cacheKey);
            return Promise.resolve(cachedVal);
        }
        return this.fetch(this.uriBuilder.product(productId))
            .then(data => {
                if (data.result) {
                    if (this.cache) {
                        this.cache.set(cacheKey, data, this.cache.hasProduct);
                    }
                    this.event.emit('hasProduct', {
                        productId,
                        result: data.result
                    });
                }
            });
    }

    hasSubscription(productId) {
        const cacheKey = `pub_${productId}`;
        if (this.cache) {
            const cachedVal = this.cache.get(cacheKey);
            return Promise.resolve(cachedVal);
        }
        return this.fetch(this.uriBuilder.subscription(productId))
            .then(data => {
                if (data.result) {
                    if (this.cache) {
                        this.cache.set(cacheKey, data, this.cache.hasSubscription);
                    }
                    this.event.emit('hasSubscription', {
                        // TODO Would be nicer if we returned productId instead of subscriptionId
                        subscriptionId: productId,
                        result: data.result
                    });
                }
            });
    }

    setTraits(traits) {
        return this.fetch(this.uriBuilder.traits(traits));
    }

    /**
     * @remark in order to work correctly this function needs to be called in response to a user
     * even (like click or tap) otherwise the popup will be blocked by the browser's popup blockers
     * and has to be explicitly authorized to be shown.
     * @param {string} [loginType=''] - Authentication Context Class Reference Values
     *        '' (empty string) means username/password login
     *        'otp-email' means one time password using email
     *        'otp-sms' means one time password using sms
     * @param {string} [redirectUri] - redirection uri that will receive the code
     */
    login(loginType, redirectUri) {
        if (this.options.popup) {
            if (this._lastPopupRef) {
                this._lastPopupRef.close();
            }
            const loginPopupRef = openPopup(this.uriBuilder.loginNew(loginType, redirectUri), 'Login');
            if (loginPopupRef) {
                this._lastPopupRef = loginPopupRef;
                keepPopupFocused(loginPopupRef)
                return loginPopupRef;
            }
        }
        window.location = this.uriBuilder.loginNew(loginType, redirectUri);
        return window;
    }

    logout(redirectUri) {
        return this.fetch(this.uriBuilder.logout(redirectUri))
            .then((data) => {
                this.clearClientData();
                this.event.emit('logout', data);
            });
    }

    payment(paylink, redirectUri = null) {
        if (this.options.popup) {
            if (this._lastPopupRef) {
                this._lastPopupRef.close();
            }
            const popupRef = openPopup(this.paymentUriBuilder.paymentPurchase(paylink, redirectUri), 'Purchase');
            if (popupRef) {
                this._lastPopupRef = popupRef;
                keepPopupFocused(popupRef)
                return popupRef;
            }
        }
        window.location = this.paymentUriBuilder.paymentPurchase(paylink, redirectUri);
        return window;
    }
}
