// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uri
 * This module contains routines and functions for getting the endpoints for SPiD API
 * servers or various endpoints that the user will be redirected to.
 */

import { parse, format } from 'url';
import SDKError from './SDKError';

/** @private */
const SERVER_HOSTNAMES = {
    LOCAL: 'spp.dev',
    DEV: 'identity-dev.schibsted.com',
    PRE: 'identity-pre.schibsted.com',
    PRO: 'payment.schibsted.no',
    'PRO.NO': 'payment.schibsted.no',
    'PRO.COM': 'payment.schibsted.no' // just an alias to PRO
};

/**
 * Returns the server url for a particular country and development support
 * @throws if the value for hostname parameter is not valid.
 * @param {string} [hostname='LOCAL'] - (case insensitive) can be:
 *        * any string representing a valud server hostname
 *        * 'PRO.NO' for production servers in Norway
 *        * 'PRO' or 'PRO.COM' for production servers for the rest of the world
 *        * 'PRE' for pre-production
 *        * 'DEV' for development servers (not accessible to all) and
 *        * 'LOCAL' for local docker environment when running SPiD in docker on 'spp.dev'
 *        For 'LOCAL', the `secure` param defaults to false.
 * @return {string} - server url including the protocol and hostname
 */
function normalizeHostname(hostname = 'LOCAL') {
    if (typeof hostname !== 'string' || hostname === '') {
        throw new SDKError(`Invalid host: "${hostname}" (should be a non-empty string)`);
    }
    return SERVER_HOSTNAMES[hostname.toUpperCase()] || hostname;
}

/**
 * Builds a URI ready for redirecting pages to SPiD
 * This is very early and work in progress so avoid it if you can.
 */
class Builder {
    /**
     * Creates a URL builder. The terminology used here is similar to the Node's URL documentations
     * @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param  {string} serverUrl - the host name of the server (including port number if it's different from 80)
     * @param  {object} defaultParams - a map of params that will be added to all urls as query string
     * @param  {string} defaultParams.client_id - client id that is mandatory for most URLs
     * @param  {object} defaultParams.redirect_uri - redirect uri that is mandatory for most URLs
     */
    constructor(serverUrl, defaultParams) {
        const { protocol, hostname, port } = parse(serverUrl);
        this._hostname = hostname;
        this._protocol = protocol;
        this._port = port;
        this._defaultParams = defaultParams;
    }

    _build(pathname, params, subdomain = '') {
        const query = Object.assign({}, this._defaultParams, params);
        return format({
            protocol: this._protocol,
            hostname: subdomain + this._hostname,
            port: this._port,
            query,
            pathname
        });
    }

    login() {
        return this._build('flow/login', { response_type: 'code' });
    }

    auth() {
        return this._build('flow/auth', { response_type: 'code' });
    }

    signup() {
        return this._build('flow/signup', { response_type: 'code' });
    }

    logout() {
        return this._build('logout', { response_type: 'code' });
    }

    account() {
        return this._build('account/summary', { response_type: 'code' });
    }

    purchaseHistory() {
        return this._build('account/purchasehistory');
    }

    subscriptions() {
        return this._build('account/subscriptions');
    }

    products() {
        return this._build('account/products');
    }

    redeem(voucherCode = null) {
        return this._build('account/summary', { voucher_code: voucherCode });
    }

    purchaseProduct(productId = null) {
        return this._build('flow/checkout', {
            response_type: 'code',
            flow: 'payment',
            product_id: productId
        });
    }

    purchaseCampaign(campaignId = null, productId = null, voucherCode = null) {
        return this._build('flow/checkout', {
            response_type: 'code',
            flow: 'payment',
            campaign_id: campaignId,
            product_id: productId,
            voucher_code: voucherCode
        });
    }

    loginNew(redirectUri) {
        return this._build('bff-oauth/authorize', {
            'response_type': 'code',
            'scope': 'openid',
            redirect_uri: redirectUri
        });
    }

    /**
     * Query session cluster endpoint which is the faster and preferred way
     * @param  {number} autologin - only 0 or 1 are accepted
     * @return {string} the full url
     */
    sessionCluster(autologin) {
        return this._build('rpc/hasSession.js', { autologin }, 'session.');
    }

    /**
     * Query session endpoint
     * @param  {number} autologin - only 0 or 1 are accepted
     * @return {string} the full url
     */
    session(autologin) {
        return this._build('ajax/hasSession.js', { autologin });
    }

    product(productId) {
        return this._build('ajax/hasproduct.js', { product_id: productId });
    }

    subscription(productId) {
        return this._build('ajax/hassubscription.js', { product_id: productId });
    }

    agreement() {
        return this._build('ajax/acceptAgreement.js');
    }

    traits(traits) {
        return this._build('ajax/traits.js', { t: traits });
    }
}

module.exports = { normalizeHostname, Builder };
