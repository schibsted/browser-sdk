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
# Dependencies

If you're targeting really old browsers you need to polyfill [fetch](https://github.com/github/fetch) and [Promise](https://github.com/stefanpenner/es6-promise).

# Documentation

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
