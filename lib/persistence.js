/**
 * @module persistence
 * A set of routines that deal with persistence in cookie or web storage
 */

import cookies from 'browser-cookies';

/**
 * An interface for classes the implement the persistence
 * features.
 * @interface Persist
 */
/**
 * get the value
 * @function
 * @name Persist.get
 * @return {string|undefined} - returns the value or undefined if the value doesn't exist
 */
/**
 * set the value with an expiration
 * @function
 * @name Persist.set
 * @param {string} value
 * @param {number} expiresIn - the relative TTL of the value in seconds
 * @return {boolean} - wheather set was successful or not
 */
/**
 * get the value
 * @function
 * @name Persist.get
 * @return {string} - the actual value
 */
 /**
  * Clear the storage
  * @function
  * @name Persist.clear
  * @return {string} - weather cleaning up the storage was successful or not
  */

/**
 * Just like Date.now() but returns seconds instead of miliseconds
 * @return {number} - unix epoch in seconds
 */
const nowSec = () => Date.now() * 1000;

/**
 * Converts a relative time to absolute time (from the moment it's called)
 * @param  {number|string} expiresIn - number of miliseconds after now
 * @throws {TypeError} - if the number is not an integer or is a string that can't be converted
 * @return {number} - epoch time in seconds
 */
function expiresOn(expiresIn) {
    if (typeof expiresIn !== 'number') {
        expiresIn = Number.parseInt(expiresIn, 10);
        if (!Number.isSafeInteger()) {
            throw new TypeError(`Invalid type for relative time: ${expiresIn}`);
        }
    }
    return nowSec() + expiresIn;
}

/**
 * Same as expiresOn() but returns a Date object suitable to pass to cookie.expores and represents
 * the epoch time
* @param  {number|string} expiresIn - number of miliseconds after now
 * @return {Date} - a Date object suitable to pass to cookie.expores and represents the epoch time
 */
const expiresOnDate = (expiresIn) => new Date(expiresOn(expiresIn));

/**
 * Checks if an absolute time stamp (Unix epoch) is after now
 * @param  {number} absoluteTimestamp - seconds
 * @return {Boolean}
 */
function isExpired(absoluteTimestamp) {
    return nowSec() > absoluteTimestamp;
}

/**
 * Handles setting and updating the varnish cookie
 * @private
 */
class VarnishCookie {
    constructor(key = 'SP_ID') {
        this.key = key;
    }

    /**
     * Sets or updates the varnish cookie
     * @param {string} value - the value to be stored
     * @param {number|string} expiresIn - the relative number of milliseconds when the value will be
     *        expired
     */
    set(spId, expiresIn, domain = '') {
        cookies.set(this.name, spId, {
            expires: expiresOnDate(expiresIn),
            domain
        });
    }

    clear() {
        cookies.erase(this.key);
    }
}


/**
 * A dummy storage that acts as /dev/null in Unix systems
 * and basically ignores everything that's passed to it
 */
class NullPersistence {
    /** @implements Persis */
    constructor() {}
    get() {}
    set() {}
    clear() {}
}

class CookiePersistence {
    /** @implements Persis */
    constructor(key, setVarnishCookie = true, shouldThrow = false) {
        this.key = key;
        this.shouldThrow = shouldThrow;
        if (setVarnishCookie) {
            this.varnishCookie = new VarnishCookie();
        }
    }

    get() {
        const cookieValue = cookies.get(this.key);
        if (cookieValue) {
            try {
                const session = JSON.parse(unescape(cookieValue));
                // decodes as a string, convert to a number
                // TODO handle NaN
                session.expiresIn  = parseInt(session.expiresIn, 10);
                session.clientTime = parseInt(session.clientTime, 10);
                return session;
            } catch (decodeOrParseError) {
                if (this.shouldThrow) {
                    throw decodeOrParseError;
                }
                return undefined;
            }
        }
        return undefined;
    }

    set(value, expiresIn) {
        if (!value) {
            return false;
        }
        // If set to "", browser-cookies will use the current domain
        const domain = value.baseDomain || '';
        if (value.sp_id && this.varnishCookie) {
            this.varnishCookie.set(value.sp_id, expiresIn, domain);
        }
        try {
            cookies.set(this.key, escape(JSON.stringify(value)), {
                expires: expiresOnDate(expiresIn),
                domain
            });
            return true;
        } catch (encodingOrSetCookieError) {
            if (this.shouldThrow) {
                throw encodingOrSetCookieError;
            }
            return false;
        }
    }

    clear() {
        cookies.erase(this.key);
    }
}

class WebStoragePersistence {
    /**
     * [constructor description]
     * @param  {string} key - the key that will be used to store all values
     * @param  {object} [storage=window.localStorage] - the type of web storage to use. Can be a
     *         reference to localStorage or sessionStorage. Make sure it's a valid object and works.
     * @param  {Boolean} [shouldThrow=false] - Swallow the error so the caller doesn't have to deal with it
     */
    constructor(key, storage = window.localStorage, shouldThrow = false) {
        if (storage === undefined) {
            if (window && window.localStorage) {
                storage = window.localStorage;
            }
        }
        this.storage = storage;
        this.key = key;
        this.shouldThrow = shouldThrow;
    }

    get() {
        try {
            // TODO consider expiresIn
            const value = JSON.parse(this.storage.getItem(this.key));
            if (typeof value !== 'object' || isExpired(value._expires)) {
                this.clear();
                return undefined;
            }
            return value;
        } catch (storageOrParseError) {
            if (this.shouldThrow) {
                throw storageOrParseError;
            }
            // Swallow the error so the caller doesn't have to deal with it
            return undefined;
        }
    }

    set(value, expiresIn) {
        try {
            value._expires = expiresOn(expiresIn);
            this.storage.setItem(this.key, JSON.stringify(value));
            return true;
        } catch (storageOrStrinfigyError) {
            if (this.shouldThrow) {
                throw storageOrStrinfigyError;
            }
            return false;
        }
    }

    clear() {
        try {
            this.storage.removeItem(this.key);
            return true;
        } catch (storageError) {
            if (this.shouldThrow) {
                throw storageError;
            }
            return false;
        }
    }
}

class InMemoryCache {
    constructor(defaultExpiresIn) {
        this.storage = {};
        this.defaultExpiresIn = defaultExpiresIn;
    }

    get(key) {
        const value = this.storage[key];
        if (typeof value !== 'object' || isExpired(value._expires)) {
            this.clear(key);
            return undefined;
        }
        return value.value;
    }

    set(key, value, expiresIn = this.defaultExpiresIn) {
        this.storage[key] = {
            value,
            _expires: expiresOn(expiresIn)
        };
        return true;
    }

    clear(key) {
        delete this.storage[key];
        return true;
    }

    clearAll() {
        Object.keys(this.storage).forEach(key => this.clear(key));
    }
}

/**
 * Serializes a javascript variable ready to put it in the url
 * @throws if it can't stringify the resulting JSON object (for example if value is an object with loops)
 * @param {string|number|boolean|object|undefined} value - any value (including undefined) that needs to be serialized
 * @return {string} - a json string most optionally with a "value" component
 */
function serialize(value) {
    return JSON.stringify({ value });
}

/**
 * The opposite of the serialize() function above
 * @throws if the provided strinc can't be parsed as valid JSON
 * @param {string} str - a json string most optionally with a "value" component
 * @return {string|number|boolean|object|undefined}
 */
function deserialize(str) {
    return JSON.parse(str).value;
}

module.exports = { CookiePersistence, NullPersistence, WebStoragePersistence, InMemoryCache, serialize, deserialize };
