(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SPiD"] = factory();
	else
		root["SPiD"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDKError = exports.SDKError = function (_Error) {
    _inherits(SDKError, _Error);

    function SDKError(message) {
        _classCallCheck(this, SDKError);

        return _possibleConstructorReturn(this, (SDKError.__proto__ || Object.getPrototypeOf(SDKError)).call(this, message));
    }

    return SDKError;
}(Error);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(11);
exports.encode = exports.stringify = __webpack_require__(12);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(8);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _fetchJsonp = __webpack_require__(9);

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _querystring = __webpack_require__(1);

var _querystring2 = _interopRequireDefault(_querystring);

var _package = __webpack_require__(17);

var _popup = __webpack_require__(5);

var _SDKError = __webpack_require__(0);

var _SDKError2 = _interopRequireDefault(_SDKError);

var _uri = __webpack_require__(6);

var _uri2 = _interopRequireDefault(_uri);

var _persistence = __webpack_require__(4);

var _persistence2 = _interopRequireDefault(_persistence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SDK = function () {
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
     */
    function SDK(options) {
        _classCallCheck(this, SDK);

        // validate options
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
            throw new TypeError('options must be an object but it is ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + ': ' + options);
        }
        if (typeof options.client_id !== 'string') {
            throw new TypeError('client_id parameter is required');
        }
        if (typeof options.redirect_uri !== 'string') {
            throw new TypeError('redirect_uri parameter is required');
        }
        if (typeof options.serverUrl !== 'string') {
            throw new TypeError('serverUrl parameter is required');
        }
        // Set minimum refresh timeout
        if (typeof options.refresh_timeout !== 'number' || options.refresh_timeout <= 60000) {
            options.refresh_timeout = 60000;
        }
        this.fetch = _fetchJsonp2.default;
        this.options = options;
        this.event = new _eventemitter2.default();
        this._sessionInitiatedSent = false;
        this._userStatus = 'unknown';
        if (options.cache) {
            this.cache = new _persistence2.default.InMemoryCache();
        }
        // Old session
        this._session = {};
        this.persist = this.getPersistenceModule(options.persistence);
        this.uriBuilder = new _uri2.default.Builder(options.serverUrl, {
            client_id: options.client_id,
            redirect_uri: options.redirect_uri
        });
        this.event.emit('initialized');
    }

    _createClass(SDK, [{
        key: 'getPersistenceModule',
        value: function getPersistenceModule() {
            var which = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'localstorage';

            // TODO this could use heavy refactoring and optimization
            var key = 'spid_js_' + this.options.client_id;
            switch (which) {
                case 'localstorage':
                    return new _persistence2.default.WebStoragePersistence(key);
                case 'cookie':
                    return new _persistence2.default.CookiePersistence(key);
                default:
                    return new _persistence2.default.NullPersistence();
            }
        }
    }, {
        key: 'version',
        value: function version() {
            return _package.version;
        }
    }, {
        key: 'clearClientData',
        value: function clearClientData() {
            this.persist.clear();
            this.cookie.clearVarnishCookie();
        }
    }, {
        key: 'acceptAgreement',
        value: function acceptAgreement() {
            var _this = this;

            return this.fetch(this.uriBuilder.agreement()).then(function () {
                _this.clearClientData();
                return _this.hasSession();
            });
        }
    }, {
        key: 'emitSessionEvent',
        value: function emitSessionEvent(previous, current) {
            // Respons contains a visitor
            if (current.visitor) {
                this.event.emit('SPiD.visitor', current.visitor);
            }
            // User has created a session, or user is no longer the same
            if (current.userId && previous.userId !== current.userId) {
                this.event.emit('SPiD.login', current);
            }
            // User is no longer logged in
            if (previous.userId && !current.userId) {
                this.event.emit('SPiD.logout', current);
            }
            // One user was logged in, and it is no longer same user
            if (previous.userId && current.userId && previous.userId !== current.userId) {
                this.event.emit('SPiD.userChange', current);
            }
            // There is a user now, or there used to be a user
            if (current.userId || previous.userId) {
                this.event.emit('SPiD.sessionChange', current);
            }
            // No user neither before nor after
            if (!(current.userId || previous.userId)) {
                this.event.emit('SPiD.notLoggedin', current);
            }
            // Fired when the session is successfully initiated for the first time
            if (current.userId && !this._sessionInitiatedSent) {
                this._sessionInitiatedSent = true;
                this.event.emit('SPiD.sessionInit', current);
            }
            // Triggered when the userStatus flag in the session has changed
            if (current.userStatus !== this._userStatus) {
                this._userStatus = current.userStatus;
                this.event.emit('SPiD.statusChange', current);
            }
            // TODO: VGS.loginStatus?
        }
    }, {
        key: 'hasSession',
        value: function hasSession() {
            var _this2 = this;

            // Try to resolve from cache (it has a TTL)
            var cachedData = this.persist.get();
            if (cachedData) {
                return Promise.resolve(cachedData);
            }
            this.fetch(this.options.useSessionCluster ? this.uriBuilder.sessionCluster(1) : this.uriBuilder.session(1)).catch(function (err) {
                if (_this2.options.useSessionCluster && err && err.type === 'LoginException') {
                    // we were trying the session cluster but it failed, let's try the PHP endpoint
                    _this2.event.emit('SPiD.loginException');
                    // Fallback to core
                    // TODO what if the first call was already to cors ha? :) Double-call?
                    return fetch(_this2.uriBuilder.session(1));
                }
                throw new _SDKError2.default(err);
            }).then(function (data) {
                // TODO shouldn't it be `&&` instead of `||` ?
                if (data.result || _this2.options.cache && _this2.options.cache.hasSession) {
                    // TODO maybe the persist classes themselves should fallback to TTL smartly?
                    _this2.persist.set(data, data.expiresIn || _this2.options.cache.hasSessionTTL);
                }
                _this2.emitSessionEvent(_this2._session, data);
                _this2._session = data;
            }, function (err) {
                return _this2.event.emit('SPiD.error', err);
            });
        }
    }, {
        key: 'hasProduct',
        value: function hasProduct(productId) {
            var _this3 = this;

            var cacheKey = 'prd_' + productId;
            if (this.cache) {
                var cachedVal = this.cache.get(cacheKey);
                return Promise.resolve(cachedVal);
            }
            return this.fetch(this.uriBuilder.product(productId)).then(function (data) {
                if (data.result) {
                    if (_this3.cache) {
                        _this3.cache.set(cacheKey, data, _this3.cache.hasProduct);
                    }
                    _this3.event.emit('SPiD.hasProduct', {
                        productId: productId,
                        result: data.result
                    });
                }
            });
        }
    }, {
        key: 'hasSubscription',
        value: function hasSubscription(productId) {
            var _this4 = this;

            var cacheKey = 'pub_' + productId;
            if (this.cache) {
                var cachedVal = this.cache.get(cacheKey);
                return Promise.resolve(cachedVal);
            }
            return this.fetch(this.uriBuilder.subscription(productId)).then(function (data) {
                if (data.result) {
                    if (_this4.cache) {
                        _this4.cache.set(cacheKey, data, _this4.cache.hasSubscription);
                    }
                    _this4.event.emit('SPiD.hasSubscription', {
                        // TODO Would be nicer if we returned productId instead of subscriptionId
                        subscriptionId: productId,
                        result: data.result
                    });
                }
            });
        }
    }, {
        key: 'setTraits',
        value: function setTraits(traits) {
            return this.fetch(this.uriBuilder.traits(traits));
        }

        /**
         * @remark in order to work correctly this function needs to be called in response to a user
         * even (like click or tap) otherwise the popup will be blocked by the browser's popup blockers
         * and has to be explicitly authorized to be shown.
         */

    }, {
        key: 'login',
        value: function login(redirect_uri) {
            if (this.options.popup) {
                if (this._lastLoginPopupRef) {
                    this._lastLoginPopupRef.close();
                }
                var loginPopupRef = (0, _popup.openPopup)(this.uriBuilder.loginNew(redirect_uri), 'Login');
                if (loginPopupRef) {
                    this._lastLoginPopupRef = loginPopupRef;
                    (0, _popup.keepPopupFocused)(loginPopupRef);
                    return loginPopupRef;
                }
            }
            window.location = this.uriBuilder.loginNew();
            return window;
        }
    }, {
        key: 'logout',
        value: function logout(redirect_uri) {
            var _this5 = this;

            return this.fetch(this.uriBuilder.logout(redirect_uri)).then(function (data) {
                _this5.clearClientData();
                _this5.event.emit('logout', data);
            });
        }
    }]);

    return SDK;
}();

exports.default = SDK;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SDK = __webpack_require__(2);

var _SDK2 = _interopRequireDefault(_SDK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SDK2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module persistence
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A set of routines that deal with persistence in cookie or web storage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _browserCookies = __webpack_require__(7);

var _browserCookies2 = _interopRequireDefault(_browserCookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var nowSec = function nowSec() {
    return Date.now() * 1000;
};

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
            throw new TypeError('Invalid type for relative time: ' + expiresIn);
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
var expiresOnDate = function expiresOnDate(expiresIn) {
    return new Date(expiresOn(expiresIn));
};

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

var VarnishCookie = function () {
    function VarnishCookie() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SP_ID';

        _classCallCheck(this, VarnishCookie);

        this.key = key;
    }

    /**
     * Sets or updates the varnish cookie
     * @param {string} value - the value to be stored
     * @param {number|string} expiresIn - the relative number of milliseconds when the value will be
     *        expired
     */


    _createClass(VarnishCookie, [{
        key: 'set',
        value: function set(spId, expiresIn) {
            var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            _browserCookies2.default.set(this.name, spId, {
                expires: expiresOnDate(expiresIn),
                domain: domain
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            _browserCookies2.default.erase(this.key);
        }
    }]);

    return VarnishCookie;
}();

/**
 * A dummy storage that acts as /dev/null in Unix systems
 * and basically ignores everything that's passed to it
 */


var NullPersistence = function () {
    /** @implements Persis */
    function NullPersistence() {
        _classCallCheck(this, NullPersistence);
    }

    _createClass(NullPersistence, [{
        key: 'get',
        value: function get() {}
    }, {
        key: 'set',
        value: function set() {}
    }, {
        key: 'clear',
        value: function clear() {}
    }]);

    return NullPersistence;
}();

var CookiePersistence = function () {
    /** @implements Persis */
    function CookiePersistence(key) {
        var setVarnishCookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var shouldThrow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, CookiePersistence);

        this.key = key;
        this.shouldThrow = shouldThrow;
        if (setVarnishCookie) {
            this.varnishCookie = new VarnishCookie();
        }
    }

    _createClass(CookiePersistence, [{
        key: 'get',
        value: function get() {
            var cookieValue = _browserCookies2.default.get(this.key);
            if (cookieValue) {
                try {
                    var session = JSON.parse(unescape(cookieValue));
                    // decodes as a string, convert to a number
                    // TODO handle NaN
                    session.expiresIn = parseInt(session.expiresIn, 10);
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
    }, {
        key: 'set',
        value: function set(value, expiresIn) {
            if (!value) {
                return false;
            }
            // If set to "", browser-cookies will use the current domain
            var domain = value.baseDomain || '';
            if (value.sp_id && this.varnishCookie) {
                this.varnishCookie.set(value.sp_id, expiresIn, domain);
            }
            try {
                _browserCookies2.default.set(this.key, escape(JSON.stringify(value)), {
                    expires: expiresOnDate(expiresIn),
                    domain: domain
                });
                return true;
            } catch (encodingOrSetCookieError) {
                if (this.shouldThrow) {
                    throw encodingOrSetCookieError;
                }
                return false;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            _browserCookies2.default.erase(this.key);
        }
    }]);

    return CookiePersistence;
}();

var WebStoragePersistence = function () {
    /**
     * [constructor description]
     * @param  {string} key - the key that will be used to store all values
     * @param  {object} [storage=window.localStorage] - the type of web storage to use. Can be a
     *         reference to localStorage or sessionStorage. Make sure it's a valid object and works.
     * @param  {Boolean} [shouldThrow=false] - Swallow the error so the caller doesn't have to deal with it
     */
    function WebStoragePersistence(key) {
        var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.localStorage;
        var shouldThrow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, WebStoragePersistence);

        if (storage === undefined) {
            if (window && window.localStorage) {
                storage = window.localStorage;
            }
        }
        this.storage = storage;
        this.key = key;
        this.shouldThrow = shouldThrow;
    }

    _createClass(WebStoragePersistence, [{
        key: 'get',
        value: function get() {
            try {
                // TODO consider expiresIn
                var value = JSON.parse(this.storage.getItem(this.key));
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || isExpired(value._expires)) {
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
    }, {
        key: 'set',
        value: function set(value, expiresIn) {
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
    }, {
        key: 'clear',
        value: function clear() {
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
    }]);

    return WebStoragePersistence;
}();

var InMemoryCache = function () {
    function InMemoryCache(defaultExpiresIn) {
        _classCallCheck(this, InMemoryCache);

        this.storage = {};
        this.defaultExpiresIn = defaultExpiresIn;
    }

    _createClass(InMemoryCache, [{
        key: 'get',
        value: function get(key) {
            var value = this.storage[key];
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || isExpired(value._expires)) {
                this.clear(key);
                return undefined;
            }
            return value.value;
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            var expiresIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.defaultExpiresIn;

            this.storage[key] = {
                value: value,
                _expires: expiresOn(expiresIn)
            };
            return true;
        }
    }, {
        key: 'clear',
        value: function clear(key) {
            delete this.storage[key];
            return true;
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            var _this = this;

            Object.keys(this.storage).forEach(function (key) {
                return _this.clear(key);
            });
        }
    }]);

    return InMemoryCache;
}();

module.exports = { CookiePersistence: CookiePersistence, NullPersistence: NullPersistence, WebStoragePersistence: WebStoragePersistence, InMemoryCache: InMemoryCache };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keepPopupFocused = keepPopupFocused;
exports.openPopup = openPopup;
/**
 * A set of routines for dealing with popup windows
 * @module popup
 */

/**
 * Keeps a popup window focused as long as it is not closed
 * @param  {object} popupWindowRef - reference to a popup window
 * @return {void}
 */
function keepPopupFocused(popupWindowRef) {
    var intervalId = setInterval(function () {
        if (popupWindowRef.closed) {
            clearInterval(intervalId);
        } else {
            popupWindowRef.focus();
            keepPopupFocused(popupWindowRef);
        }
    }, 300);
}

function openPopup(url) {
    var windowName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Schibsted';
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 360;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 570;

    var settings = {
        width: width,
        height: height,
        top: screen.height ? (screen.height - height) / 2 : 100,
        left: screen.width ? (screen.width - width) / 2 : 100,
        /*
        For accessibility reasons, it is strongly encouraged to set this feature
        always on.
        @see https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Note_on_scrollbars
        */
        scrollbars: 'yes',
        location: 'no',
        directories: 'no',
        status: 'no',
        menubar: 'no',
        toolbar: 'no',
        resizable: 'yes'
    };
    var settingsArr = [];
    Object.keys(settings).forEach(function (key) {
        return settingsArr.push(key + '=' + settings[key]);
    });
    return window.open(url, windowName, settingsArr.join(','));
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// TODO the usage of global is a temporary workatround that needs to be refactored out



/**
 * @module uri
 * This module contains routines and functions for getting the endpoints for SPiD API
 * servers or various endpoints that the user will be redirected to.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = __webpack_require__(13);

var _SDKError = __webpack_require__(0);

var _SDKError2 = _interopRequireDefault(_SDKError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @private */
var SERVER_HOSTNAMES = {
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
function normalizeHostname() {
    var hostname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'LOCAL';

    if (typeof hostname !== 'string' || hostname === '') {
        throw new _SDKError2.default('Invalid host: "' + hostname + '" (should be a non-empty string)');
    }
    return SERVER_HOSTNAMES[hostname.toUpperCase()] || hostname;
}

/**
 * Builds a URI ready for redirecting pages to SPiD
 * This is very early and work in progress so avoid it if you can.
 */

var Builder = function () {
    /**
     * Creates a URL builder. The terminology used here is similar to the Node's URL documentations
     * @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param  {string} serverUrl - the host name of the server (including port number if it's different from 80)
     * @param  {object} defaultParams - a map of params that will be added to all urls as query string
     * @param  {string} defaultParams.client_id - client id that is mandatory for most URLs
     * @param  {object} defaultParams.redirect_uri - redirect uri that is mandatory for most URLs
     */
    function Builder(serverUrl, defaultParams) {
        _classCallCheck(this, Builder);

        var _parse = (0, _url.parse)(serverUrl),
            protocol = _parse.protocol,
            hostname = _parse.hostname,
            port = _parse.port;

        this._hostname = hostname;
        this._protocol = protocol;
        this._port = port;
        this._defaultParams = defaultParams;
    }

    _createClass(Builder, [{
        key: '_build',
        value: function _build(pathname, params) {
            var subdomain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            var query = Object.assign({}, this._defaultParams, params);
            return (0, _url.format)({
                protocol: this._protocol,
                hostname: subdomain + this._hostname,
                port: this._port,
                query: query,
                pathname: pathname
            });
        }
    }, {
        key: 'login',
        value: function login() {
            return this._build('flow/login', { response_type: 'code' });
        }
    }, {
        key: 'auth',
        value: function auth() {
            return this._build('flow/auth', { response_type: 'code' });
        }
    }, {
        key: 'signup',
        value: function signup() {
            return this._build('flow/signup', { response_type: 'code' });
        }
    }, {
        key: 'logout',
        value: function logout() {
            return this._build('logout', { response_type: 'code' });
        }
    }, {
        key: 'account',
        value: function account() {
            return this._build('account/summary', { response_type: 'code' });
        }
    }, {
        key: 'purchaseHistory',
        value: function purchaseHistory() {
            return this._build('account/purchasehistory');
        }
    }, {
        key: 'subscriptions',
        value: function subscriptions() {
            return this._build('account/subscriptions');
        }
    }, {
        key: 'products',
        value: function products() {
            return this._build('account/products');
        }
    }, {
        key: 'redeem',
        value: function redeem() {
            var voucherCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return this._build('account/summary', { voucher_code: voucherCode });
        }
    }, {
        key: 'purchaseProduct',
        value: function purchaseProduct() {
            var productId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return this._build('flow/checkout', {
                response_type: 'code',
                flow: 'payment',
                product_id: productId
            });
        }
    }, {
        key: 'purchaseCampaign',
        value: function purchaseCampaign() {
            var campaignId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var productId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var voucherCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return this._build('flow/checkout', {
                response_type: 'code',
                flow: 'payment',
                campaign_id: campaignId,
                product_id: productId,
                voucher_code: voucherCode
            });
        }
    }, {
        key: 'loginNew',
        value: function loginNew(redirect_uri) {
            return this._build('bff-oauth/authorize', {
                'response_type': 'code',
                'scope': 'openid',
                redirect_uri: redirect_uri
            });
        }

        /**
         * Query session cluster endpoint which is the faster and preferred way
         * @param  {number} autologin - only 0 or 1 are accepted
         * @return {string} the full url
         */

    }, {
        key: 'sessionCluster',
        value: function sessionCluster(autologin) {
            return this._build('rpc/hasSession.js', { autologin: autologin }, 'session.');
        }

        /**
         * Query session endpoint
         * @param  {number} autologin - only 0 or 1 are accepted
         * @return {string} the full url
         */

    }, {
        key: 'session',
        value: function session(autologin) {
            return this._build('ajax/hasSession.js', { autologin: autologin });
        }
    }, {
        key: 'product',
        value: function product(productId) {
            return this._build('ajax/hasproduct.js', { product_id: productId });
        }
    }, {
        key: 'subscription',
        value: function subscription(productId) {
            return this._build('ajax/hassubscription.js', { product_id: productId });
        }
    }, {
        key: 'agreement',
        value: function agreement() {
            return this._build('ajax/acceptAgreement.js');
        }
    }, {
        key: 'traits',
        value: function traits(_traits) {
            return this._build('ajax/traits.js', { t: _traits });
        }
    }]);

    return Builder;
}();

module.exports = { normalizeHostname: normalizeHostname, Builder: Builder };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

exports.defaults = {};

exports.set = function(name, value, options) {
  // Retrieve options and defaults
  var opts = options || {};
  var defaults = exports.defaults;

  // Apply default value for unspecified options
  var expires  = opts.expires  || defaults.expires;
  var domain   = opts.domain   || defaults.domain;
  var path     = opts.path     !== undefined ? opts.path     : (defaults.path !== undefined ? defaults.path : '/');
  var secure   = opts.secure   !== undefined ? opts.secure   : defaults.secure;
  var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;

  // Determine cookie expiration date
  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
  var expDate = expires ? new Date(
      // in case expires is an integer, it should specify the number of days till the cookie expires
      typeof expires === 'number' ? new Date().getTime() + (expires * 864e5) :
      // else expires should be either a Date object or in a format recognized by Date.parse()
      expires
  ) : '';

  // Set cookie
  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
  .replace('(', '%28')
  .replace(')', '%29') +
  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
  (domain   ? ';domain=' + domain : '') +                                          // Add domain
  (path     ? ';path='   + path   : '') +                                          // Add path
  (secure   ? ';secure'           : '') +                                          // Add secure option
  (httponly ? ';httponly'         : '');                                           // Add httponly option
};

exports.get = function(name) {
  var cookies = document.cookie.split(';');

  // Iterate all cookies
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var cookieLength = cookie.length;

    // Determine separator index ("name=value")
    var separatorIndex = cookie.indexOf('=');

    // IE<11 emits the equal sign when the cookie value is empty
    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

    var cookie_name = decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+/, ''));

    // Return cookie value if the name matches
    if (cookie_name === name) {
      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
    }
  }

  // Return `null` as the cookie was not found
  return null;
};

exports.erase = function(name, options) {
  exports.set(name, '', {
    expires:  -1,
    domain:   options && options.domain,
    path:     options && options.path,
    secure:   0,
    httponly: 0}
  );
};

exports.all = function() {
  var all = {};
  var cookies = document.cookie.split(';');

  // Iterate all cookies
  for(var i = 0; i < cookies.length; i++) {
	  var cookie = cookies[i];
    var cookieLength = cookie.length;

	  // Determine separator index ("name=value")
	  var separatorIndex = cookie.indexOf('=');

	  // IE<11 emits the equal sign when the cookie value is empty
	  separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

    // add the cookie name and value to the `all` object
	  var cookie_name = decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+/, ''));
	  all[cookie_name] = decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	}

  return all;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
  // error if request timeout
  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    document.getElementsByTagName('head')[0].removeChild(script);
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module), __webpack_require__(15)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(10);
var util = __webpack_require__(14);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(1);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
	"name": "schibsted-browser-sdk",
	"version": "0.0.2",
	"description": "Browser SDK for Schibsted Identity and Payment",
	"keywords": [
		"schibsted",
		"identity",
		"payment",
		"oauth"
	],
	"license": "MIT",
	"main": "index.js",
	"browser": "dist/bundle.js",
	"scripts": {
		"lint": "eslint .",
		"pretest": "npm run build",
		"test": "mocha -r jsdom-global/register --compilers js:babel-core/register --recursive test",
		"docs": "eslint . && rm -rf docs && jsdoc -c ./jsdoc.json",
		"preversion": "npm run build-prod && npm run lint && npm test && npm run docs && travis lint",
		"postversion": "git push && git push --tags",
		"build-prod": "webpack --optimize-minimize --displayModules --display-reasons --sort-modules-by size",
		"build": "webpack --displayModules --display-reasons --sort-modules-by size"
	},
	"dependencies": {
		"browser-cookies": "^1.1.0",
		"eventemitter3": "^2.0.3",
		"fetch-jsonp": "^1.0.6",
		"querystring": "^0.2.0"
	},
	"devDependencies": {
		"babel-core": "^6.24.1",
		"babel-loader": "^7.0.0",
		"babel-preset-es2015": "^6.24.1",
		"chai": "^4.0.0",
		"eslint": "^3.19.0",
		"eslint-config-schibsted": "^3.1.0",
		"eslint-plugin-import": "^2.2.0",
		"jsdoc": "^3.4.3",
		"jsdom": "^11.0.0",
		"jsdom-global": "^3.0.2",
		"mocha": "^3.3.0",
		"webpack": "^2.5.1"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/schibsted/browser-sdk"
	},
	"bugs": {
		"url": "https://github.com/schibsted/browser-sdk/issues"
	}
};

/***/ })
/******/ ]);
});