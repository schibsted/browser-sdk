[![Build Status](https://travis-ci.org/schibsted/browser-sdk.svg?branch=master)](https://travis-ci.org/schibsted/browser-sdk)
[![GitHub issues](https://img.shields.io/github/issues/schibsted/browser-sdk.svg)](https://github.com/schibsted/browser-sdk/issues)
[![Version](https://img.shields.io/npm/v/schibsted-browser-sdk.svg?style=flat-square)](http://npm.im/schibsted-browser-sdk)
[![Downloads](https://img.shields.io/npm/dm/schibsted-browser-sdk.svg?style=flat-square)](http://npm-stat.com/charts.html?package=schibsted-browser-sdk&from=2017-01-01)
[![MIT License](https://img.shields.io/npm/l/schibsted-browser-sdk.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# Introduction

![Schibsted Common Components Logo](cc-logo.png)

This lib provides basic functionality for browser apps that need to communicate with Schibsted
Identity servers.

You can see [the HTML documentation](https://pages.github.schibsted.io/spt-identity/identity-web-sdk-browser/)
in the `/doc` folder (and generate it using `yarn run docs`).

This is a private package for now and still not decided where it'll go and with which license but the
node API is almost done.

No test so far but it's coming.

JSDoc in webpack? https://github.com/tfiwm/jsdoc-webpack-plugin

# IGNORE THE FOLLOWING NOTES

If you want fetch polyfill for older browsers, https://github.com/github/fetch

support BFF use case if it makes sense: https://github.schibsted.io/spt-identity/identity-web-bff/blob/master/middlewares/obtainToken.js

uget
sauselabs cross-browser tests

for browser you need to install the optional dependency (fetch, Promise, eventEmitter)
