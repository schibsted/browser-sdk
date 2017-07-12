// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uri
 * This module contains basic functionality to build url's to endpoints.
 */
import {parse, format} from 'url';
import SDKError from './SDKError';

/**
 * Clones an object but only the keys that have a defined value
 * @param {object} src - source object
 * @return {object}
 */
function cloneDefined(src) {
    const result = {};
    Object.keys(src)
        .forEach(key => {
            if ( src[key] !== undefined ) {
                result[key] = src[key];
            }
        });
    return result;
}

/**
 * A simple utility function that allows passing shorthands from a dictionary
 * @private
 * @param {string} hostname - a hostname like http://example.com
 * @param {object} hostnameShorthands - an object of shorthands like { dev: 'http://dev.example.com' }
 * @throws SDKError if the hostname is not an string or is an empty string
 */
function urlNormalizer(hostname, hostnameShorthands = {}) {
    if (typeof hostname !== 'string' || hostname === '') {
        throw new SDKError(`"hostname" param must be a non empty string but it is ${typeof hostname}`);
    }
    return hostnameShorthands[hostname] || hostname;
}

/**
 * Builds a URI to an endpoint (for both flow endpoints or api endpoints) to a server.
 * Creates a URL builder. The terminology used here is similar to the Node's URL documentations
 * @private
 * @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
 * @param {string} hostName - it is either env name LOCAL|DEV|PRE|PRO|PRO.NO|PRO.COM or the host name of the server (including port number if it's different from 80)
 * @param {object} defaultParams - a map of params that will be added to all urls as query string
 * @param {string} defaultParams.client_id - client id that is mandatory for most URLs
 * @param {object} defaultParams.redirect_uri - redirect uri that is mandatory for most URLs
 */
function server(hostName, defaultParams = {}) {
    const { protocol, hostname, port } = parse(hostName);
    return function formatUrl(pathname = '', params = {}) {
        const query = Object.assign({}, cloneDefined(defaultParams), cloneDefined(params));
        return format({ protocol, hostname, port, query, pathname });
    }
}

class Uri {
    /**
     * Abstracts away the uri logic of the SDK
     * @param {object} options - the options that comes directly from SDK
     * @param {string} [options.serverUrl] - see SDK options
     * @param {string} [options.paymentServerUrl] - see SDK options
     * @param {string} [options.client_id] - see SDK options
     * @param {string} [options.redirect_uri] - see SDK options
     * @param {string} [options.env] - see SDK options
     */
    constructor(options) {
        const clientIdRedirectUri = {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        };
        if (!options.serverUrl) {
            options.serverUrl = options.env;
        }
        if (!options.paymentServerUrl) {
            options.paymentServerUrl = options.env;
        }
        // For SPiD endpoints that require clientId and redirectUri
        this._spidCR = server(urlNormalizer(options.serverUrl || 'LOCAL', {
            LOCAL: 'http://spp.dev',
            DEV: 'https://identity-dev.schibsted.com',
            PRE: 'https://identity-pre.schibsted.com',
            PRO: 'https://login.schibsted.com',
            'PRO.NO': 'https://payment.schibsted.no'
        }), clientIdRedirectUri);

        // For session cluster (has-session)i
        this._hasSessionCR = server(urlNormalizer(options.serverUrl || 'LOCAL', {
            LOCAL: 'http://session.spp.dev',
            DEV: 'https://session.identity-dev.schibsted.com',
            PRE: 'https://session.identity-pre.schibsted.com',
            PRO: 'https://session.login.schibsted.com',
            'PRO.NO': 'https://session.payment.schibsted.no'
        }), clientIdRedirectUri);

        // For BFF endpoints that require clientId and redirectUri
        this._bffCR = server(urlNormalizer(options.paymentServerUrl || 'LOCAL', {
            LOCAL: 'http://spp.dev:4100',
            DEV: 'https://front.identity-dev.schibsted.com'
        }), clientIdRedirectUri);
    }

    signup(loginType = '', redirectUri) {
        return this._spidCR('bff-oauth/authorize', {
            response_type: 'code',
            scope: 'openid',
            acr_values: loginType,
            redirect_uri: redirectUri
        });
    }

    logout() {
        return this._spidCR('logout', { response_type: 'code' });
    }

    account() {
        return this._spidCR('account/summary', { response_type: 'code' });
    }

    purchaseHistory() {
        return this._spidCR('account/purchasehistory');
    }

    subscriptions() {
        return this._spidCR('account/subscriptions');
    }

    products() {
        return this._spidCR('account/products');
    }

    redeem(voucherCode) {
        return this._spidCR('account/summary', { voucher_code: voucherCode });
    }

    // todo: for now this leads to the same page as signup, some way to swich login tab in UI would be nice
    login(loginType = '', redirectUri) {
        return this._spidCR('bff-oauth/authorize', {
            response_type: 'code',
            scope: 'openid',
            acr_values: loginType,
            redirect_uri: redirectUri
        });
    }

    /**
     * Query session cluster endpoint which is the faster and preferred way
     * @param  {number} [autologin=1] - only 0 or 1 are accepted
     * @throws SDKError if the value for autologin is invalid
     * @return {string} the full url
     */
    sessionCluster(autologin = 1) {
        if (autologin !== 0 && autologin !== 1) {
            throw new SDKError(`Invalid autologin value for sesseionCluster: "${autologin}"`)
        }
        return this._hasSessionCR('rpc/hasSession.js', { autologin });
    }

    /**
     * Query session endpoint
     * @param  {number} [autologin=1] - only 0 or 1 are accepted
     * @throws SDKError if the value for autologin is invalid
     * @return {string} the full url
     */
    session(autologin) {
        if (autologin !== 0 && autologin !== 1) {
            throw new SDKError(`Invalid autologin value for sesseionCluster: "${autologin}"`)
        }
        return this._spidCR('ajax/hasSession.js', { autologin });
    }

    product(productId) {
        return this._spidCR('ajax/hasproduct.js', { product_id: productId });
    }

    subscription(productId) {
        return this._spidCR('ajax/hassubscription.js', { product_id: productId });
    }

    agreement() {
        return this._spidCR('ajax/acceptAgreement.js');
    }

    traits(traits) {
        return this._spidCR('ajax/traits.js', { t: traits });
    }

    purchasePaylink(paylink, redirectUri) {
        return this._bffCR('api/payment/purchase', {
            paylink,
            redirect_uri: redirectUri
        });
    }
}

module.exports = { urlNormalizer, server, Uri };
