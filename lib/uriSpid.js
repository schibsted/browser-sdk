// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uriSpid
 * This module contains routines and functions for getting the endpoints for SPiD API
 * servers or various endpoints that the user will be redirected to.
 */
import Uri from './uri';

/**
 * Builds a URI ready for redirecting pages to SPiD
 */
class Builder extends Uri {
    constructor(hostName, defaultParams) {
        super(hostName, defaultParams);
        this.SERVER_HOSTNAMES = {
            LOCAL: 'http://spp.dev',
            DEV: 'https://identity-dev.schibsted.com',
            PRE: 'https://identity-pre.schibsted.com',
            PRO: 'https://login.schibsted.com',
            'PRO.NO': 'https://payment.schibsted.no',
            'PRO.COM': 'https://login.schibsted.com' // just an alias to PRO
        };
    }
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

module.exports = { Builder };
