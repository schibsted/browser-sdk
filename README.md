![Schibsted Common Components Logo](cc-logo.png)

---

[![Build Status](https://travis-ci.org/schibsted/browser-sdk.svg?branch=master)](https://travis-ci.org/schibsted/browser-sdk)
[![GitHub issues](https://img.shields.io/github/issues/schibsted/browser-sdk.svg)](https://github.com/schibsted/browser-sdk/issues)
[![Version](https://img.shields.io/npm/v/schibsted-browser-sdk.svg?style=flat-square)](http://npm.im/schibsted-browser-sdk)
[![Downloads](https://img.shields.io/npm/dm/schibsted-browser-sdk.svg?style=flat-square)](http://npm-stat.com/charts.html?package=schibsted-browser-sdk&from=2017-01-01)
[![MIT License](https://img.shields.io/npm/l/schibsted-browser-sdk.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# Introduction

Let browser apps communicate with Schibsted Identity and Payment.

# Usage

Use the CDN version from:

https://d3iwtia3ndepsv.cloudfront.net/sdk/{VERSION}/schibsted-browser-sdk.js

*where `{VERSION}` matches what you see in the [package.json](./package.json)*

or install via npm and get it into your bundle.

```bash
$ npm install schibsted-browser-sdk
```

#### Note

**If you're targeting really old browsers you need to polyfill [fetch](https://github.com/github/fetch)
and [Promise](https://github.com/stefanpenner/es6-promise).**

# Documentation

You can see a live example of this SDK in action at [https://sdk-example.com/].
The code is available on [Github](https://github.com/schibsted/sdk-example).
First you need to instantiate the SDK:

```javascript
const spidOptions = {
    serverUrl: window.config.spidBaseUrl,
    paymentServerUrl: window.config.paymentServerUrl,
    popup: true,
    useSessionCluster: false,
    client_id: window.config.clientId,
    redirect_uri: window.location.origin
};

const spid = new SPiD.default(spidOptions);
```

Then you can make calls. For example to check if the user has a SPiD session already in the browser:

```javascript
spid.hasSession().then(
    (response) => console.log('HasSession success:', response),
    (err) => console.error('HasSession failure:', err)
);
```

If you want to be notified when a user logs in, logs out or changed, the SDK emits a few events that
can be subscribed to:

```javascript
spid.event.addListener('login', function () {
    alert('User already logged in.');
});

spid.event.addListener('logout', function () {
    alert('Logged out from SPiD.');
});
````

The current version of the SDK is basd on [the original SPiD SDK](https://github.com/schibsted/sdk-js)
The SDK is undergoing heavy refactoring and will be more modular and featureful in the future.
But the code is small, easy to read and well documented so it shouldn't be hard to follow.

## Code documentation

You can generate jsdocs locally:

```bash
$ git clone git@github.com:schibsted/browser-sdk.git
$ npm i
$ npm run docs
$ open docs/index.html
```

This populates the `./docs` directory.

# Tests

Tests are being added as we go forward.
You can run tests after installing deps:

```bash
$ npm it
```

# Contributing

It's [MIT](LICENCE.md) so [contribute](CONTRIBUTING.md).
