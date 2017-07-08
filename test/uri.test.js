'use strict';

import { URL } from 'url';
import { expect } from 'chai';
import { urlNormalizer, server, Uri } from '../lib/uri';

/**
 * A test utility function for checking the query parameters against an expected object
 * @param {URLSearchParams} searchParams
 * @param {object} expectedParams - a hash that represents the expected key&value params
 */
function checkSearchParams(searchParams, expectedParams) {
    Object.keys(expectedParams)
        .forEach(key => expect(searchParams.get(key)).to.equal(expectedParams[key], `${key} param`));
}

describe('urlNormalizer', () => {

    it('can handle hostname shorthands', () => {
        expect(urlNormalizer('SHORTHAND1', {
            'SHORTHAND1': 'http://shorthand1.local'
        })).to.equal('http://shorthand1.local');
    });

    it('returns the hostname parameter if the shorthand does not exist', () => {
        expect(urlNormalizer('SHORTHAND2', {
            'SHORTHAND1': 'http://shorthand1.local'
        })).to.equal('SHORTHAND2');
    });

});

describe('server', () => {

    it('can build uris with no default params', () => {
        const endpoint = new server('http://example.com');
        expect(endpoint('/server')).to.equal('http://example.com/server');
    });

    it('can build uris with params', () => {
        const endpoint = new server('http://example.com');
        expect(endpoint('/server', { a: 1, foo: 'bar' })).to.equal('http://example.com/server?a=1&foo=bar');
    });

    it('can build uris with default params', () => {
        const endpoint = new server('http://example.com', { a: 1, foo: 'bar' });
        expect(endpoint('/server')).to.equal('http://example.com/server?a=1&foo=bar');
    });

});

describe('Uri', () => {

    describe('login', () => {

        it('returns the expected endpoint', () => {
            const uri = new Uri({ serverUrl: 'http://spp.dev' });
            expect(uri.login('opt-email')).to.equal('http://spp.dev/bff-oauth/authorize?response_type=code&scope=openid&acr_values=opt-email');
        });

    });

    describe('sessionCluster', () => {

        it('returns the expected endpoint', () => {
            const uri = new Uri({ serverUrl: 'LOCAL' });
            expect(uri.sessionCluster(1)).to.equal('http://session.spp.dev/rpc/hasSession.js?autologin=1');
        });

    });

    describe('session', () => {

        it('returns the expected endpoint', () => {
            const uri = new Uri({ serverUrl: 'http://spp.dev' });
            expect(uri.session(1)).to.equal('http://spp.dev/ajax/hasSession.js?autologin=1');
        });

    });

    describe('payment', () => {

        it('returns the expected endpoint to purchase flow with default redirect uri', () => {
            const uri = new Uri({
                serverUrl: 'LOCAL',
                redirect_uri: 'http://localhost:4000',
                client_id: 'AAAxxEEE'
            });
            const result = uri.purchasePaylink(532);
            const parseResult = new URL(result);
            expect(parseResult.protocol).to.equal('http:');
            expect(parseResult.host).to.equal('spp.dev:4100');
            expect(parseResult.pathname).to.equal('/api/payment/purchase');
            checkSearchParams(parseResult.searchParams, {
                redirect_uri: 'http://localhost:4000',
                client_id: 'AAAxxEEE',
                paylink: '532'
            })
            expect(parseResult.searchParams.get('redirect_uri')).to.equal('http://localhost:4000', 'redirect_uri param');
            expect(parseResult.searchParams.get('client_id')).to.equal('AAAxxEEE', 'client_id param');
            expect(parseResult.searchParams.get('paylink')).to.equal('532', 'paylink param');
        });

        it('returns the expected endpoint to purchase flow with redirect uri', () => {
            const uri = new Uri({
                serverUrl: 'LOCAL',
                redirect_uri: 'http://localhost:4000', // this will be overriden
                client_id: 'AAAxxEEE'
            });
            const result = uri.purchasePaylink(532, 'http://localhost:5000');
            const parseResult = new URL(result);
            expect(parseResult.protocol).to.equal('http:');
            expect(parseResult.host).to.equal('spp.dev:4100');
            expect(parseResult.pathname).to.equal('/api/payment/purchase');
            checkSearchParams(parseResult.searchParams, {
                redirect_uri: 'http://localhost:5000',
                client_id: 'AAAxxEEE',
                paylink: '532'
            })
            expect(parseResult.searchParams.get('redirect_uri')).to.equal('http://localhost:5000', 'redirect_uri param');
            expect(parseResult.searchParams.get('client_id')).to.equal('AAAxxEEE', 'client_id param');
            expect(parseResult.searchParams.get('paylink')).to.equal('532', 'paylink param');
        });
    });

});
