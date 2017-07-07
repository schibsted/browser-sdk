'use strict';
/**
 * @module uriBff
 * This module contains routines and functions for getting the endpoints exposed by BFF.
 */
import Uri from './uri';

/**
 * Builds a URI ready for redirecting pages to BFF's pages
 */
class Builder extends Uri {
    constructor(hostName, defaultParams) {
        super(hostName, defaultParams);
        this.SERVER_HOSTNAMES = {
            LOCAL: 'http://spp.dev:4100',
            DEV: 'https://front.identity-dev.schibsted.com',
            PRE: '',
            PRO: '',
            'PRO.NO': '',
            'PRO.COM': ''
        };
    }

    purchasePaylink(paylink, redirectUri) {
        try {
            return this.build('api/payment/purchase', {
                redirect_uri: redirectUri,
                paylink,
            });
        } catch (e) {
            console.error('This method is not available for provided env.')
        }
    }
}

module.exports = { Builder };
