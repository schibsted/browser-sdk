// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uri
 * This module contains basic functionality to build url's to endpoints.
 */
import {parse, format} from 'url';
import SDKError from './SDKError';

/**
 * Builds a URI ready for redirecting
 */
class Builder {
    /**
     * Creates a URL builder. The terminology used here is similar to the Node's URL documentations
     * @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param  {string} hostName - it is either env name LOCAL|DEV|PRE|PRO|PRO.NO|PRO.COM or the host name of the server (including port number if it's different from 80)
     * @param  {object} defaultParams - a map of params that will be added to all urls as query string
     * @param  {string} defaultParams.client_id - client id that is mandatory for most URLs
     * @param  {object} defaultParams.redirect_uri - redirect uri that is mandatory for most URLs
     */
    constructor(hostName, defaultParams) {
        this._hostName = hostName;
        this._defaultParams = defaultParams;
        this.SERVER_HOSTNAMES = {};
    }

    build(pathname, params = {}, subdomain = '') {
        const query = Object.assign({}, this._defaultParams);
        Object.keys(params).forEach(k => {
            if (params[k] !== undefined) {
                query[k] = params[k];
            }
        });
        const { protocol, hostname, port } = parse(this._normalizeHostname(this._hostName));
        return format({
            protocol: protocol,
            hostname: subdomain + hostname,
            port: port,
            query,
            pathname
        });
    }

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
    _normalizeHostname(env = 'LOCAL') {
        if (typeof env !== 'string' || env === '') {
            throw new SDKError(`Invalid host: "${env}" (should be a non-empty string)`);
        }
        if (this.SERVER_HOSTNAMES[env.toUpperCase()] === '') {
            throw new SDKError(`Not ready for "${env.toUpperCase()}" env yet`);
        }
        return this.SERVER_HOSTNAMES[env.toUpperCase()] || env;
    }
}

module.exports = Builder;
