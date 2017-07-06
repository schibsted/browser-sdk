// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uri
 * This module contains routines and functions for getting the endpoints for SPiD API
 * servers or various endpoints that the user will be redirected to.
 */

import { parse, format } from 'url';
import SDKError from './SDKError';
import Uri from './uri';

/** @private */
const SERVER_HOSTNAMES = {
    LOCAL: 'http://spp.dev',
    DEV: 'https://identity-dev.schibsted.com',
    PRE: 'https://identity-pre.schibsted.com',
    PRO: 'https://login.schibsted.com',
    'PRO.NO': 'https://payment.schibsted.no',
    'PRO.COM': 'https://login.schibsted.com' // just an alias to PRO
};

/**
 * Returns the server url for a particular country and development support
 * @throws if the value for hostname parameter is not valid.
 * @param {string} [env='LOCAL'] - (case insensitive) can be:
 *        * any string representing a valud server hostname
 *        * 'PRO.NO' for production servers in Norway
 *        * 'PRO' or 'PRO.COM' for production servers for the rest of the world
 *        * 'PRE' for pre-production
 *        * 'DEV' for development servers (not accessible to all) and
 *        * 'LOCAL' for local docker environment when running SPiD in docker on 'spp.dev'
 *        For 'LOCAL', the `secure` param defaults to false.
 * @return {string} - server url including the protocol and hostname
 */
function normalizeHostname(env = 'LOCAL') {
    if (typeof env !== 'string' || env === '') {
        throw new SDKError(`Invalid host: "${env}" (should be a non-empty string)`);
    }
    return SERVER_HOSTNAMES[env.toUpperCase()];
}

/**
 * Builds a URI ready for redirecting pages to SPiD
 */
class Builder extends Uri {
    signup(loginType = '', redirectUri) {
        return this.build('bff-oauth/authorize', {
            'response_type': 'code',
            'scope': 'openid',
            'acr_values': loginType,
            redirect_uri: redirectUri
        });
    }

    logout() {
        return this.build('logout', { response_type: 'code' });
    }

    account() {
        return this.build('account/summary', { response_type: 'code' });
    }

    purchaseHistory() {
        return this.build('account/purchasehistory');
    }

    subscriptions() {
        return this.build('account/subscriptions');
    }

    products() {
        return this.build('account/products');
    }

    redeem(voucherCode) {
        return this.build('account/summary', { voucher_code: voucherCode });
    }

    // todo: for now this leads to the same page as signup, some way to swich login tab in UI would be nice
    login(loginType = '', redirectUri) {
        return this.build('bff-oauth/authorize', {
            'response_type': 'code',
            'scope': 'openid',
            'acr_values': loginType,
            redirect_uri: redirectUri
        });
    }

    /**
     * Query session cluster endpoint which is the faster and preferred way
     * @param  {number} autologin - only 0 or 1 are accepted
     * @return {string} the full url
     */
    sessionCluster(autologin) {
        return this.build('rpc/hasSession.js', { autologin }, 'session.');
    }

    /**
     * Query session endpoint
     * @param  {number} autologin - only 0 or 1 are accepted
     * @return {string} the full url
     */
    session(autologin) {
        return this.build('ajax/hasSession.js', { autologin });
    }

    product(productId) {
        return this.build('ajax/hasproduct.js', { product_id: productId });
    }

    subscription(productId) {
        return this.build('ajax/hassubscription.js', { product_id: productId });
    }

    agreement() {
        return this.build('ajax/acceptAgreement.js');
    }

    traits(traits) {
        return this.build('ajax/traits.js', { t: traits });
    }
}

module.exports = { normalizeHostname, Builder };
