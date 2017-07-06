// TODO the usage of global is a temporary workatround that needs to be refactored out

'use strict';

/**
 * @module uri
 * This module contains basic functionality to build url's to endpoints.
 */
import {parse, format} from 'url';

/**
 * Builds a URI ready for redirecting
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
        this._port = port; // can be null of the URL doesn't mention it
        this._defaultParams = defaultParams;
    }

    build(pathname, params, subdomain = '') {
        const query = Object.assign({}, this._defaultParams);
        Object.keys(params).forEach(k => {
            if (params[k] !== undefined) {
                query[k] = params[k];
            }
        });
        return format({
            protocol: this._protocol,
            hostname: subdomain + this._hostname,
            port: this._port,
            query,
            pathname
        });
    }
}

module.exports = Builder;
