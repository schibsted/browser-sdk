'use strict';
/**
 * @module uriBff
 * This module contains routines and functions for getting the endpoints exposed by BFF.
 */
import SDKError from './SDKError';
import Uri from './uri';

/** @private */
const SERVER_HOSTNAMES = {
    LOCAL: 'http://spp.dev:4100',
    DEV: 'https://front.identity-dev.schibsted.com',
    PRE: '',
    PRO: '',
    'PRO.NO': '',
    'PRO.COM': ''
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
    if (SERVER_HOSTNAMES[env.toUpperCase()] === '') {
        throw new SDKError(`Not ready for "${env.toUpperCase()}" env yet`);
    }
    return SERVER_HOSTNAMES[env.toUpperCase()];
}

/**
 * Builds a URI ready for redirecting pages to BFF's pages
 */
class Builder extends Uri {
    purchasePaylink(paylink, redirectUri) {
        return this.build('api/payment/purchase', {
            redirect_uri: redirectUri || this._defaultParams.redirect_uri,
            paylink,
        });
    }
}

module.exports = { normalizeHostname, Builder };
