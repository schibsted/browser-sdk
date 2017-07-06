'use strict';

import { expect } from 'chai';
import { Builder, normalizeHostname } from '../lib/uriSpid';
import { Builder as BuilderBff, normalizeHostname as normalizeBffsHostname } from '../lib/uriBff';

describe('uri', () => {
    describe('Builder using domain', ()=> {
        let builder;

        beforeEach(() => {
            builder = new Builder('http://spp.dev');
        });

        describe('login', () => {
            it('returns the expected endpoint', () => {
                expect(builder.login('opt-email')).to.equal('http://spp.dev/bff-oauth/authorize?response_type=code&scope=openid&acr_values=opt-email');
            });
        });

        describe('sessionCluster', () => {
            it('returns the expected endpoint', () => {
                expect(builder.sessionCluster(1)).to.equal('http://session.spp.dev/rpc/hasSession.js?autologin=1');
            });
        });

        describe('session', () => {
            it('returns the expected endpoint', () => {
                expect(builder.session(1)).to.equal('http://spp.dev/ajax/hasSession.js?autologin=1');
            });
        });

        describe('payment', () => {
            beforeEach(() => {
                builder = new BuilderBff('http://bff.spp.dev', {
                    redirect_uri: 'http://localhost:4000',
                    client_id: 'AAAxxEEE'
                });
            });
            describe('returns the expected endpoint', () => {
                it('to purchase flow with default redirect uri', () => {
                    expect(builder.purchasePaylink(532)).to.equal('http://bff.spp.dev/api/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A4000&client_id=AAAxxEEE&paylink=532');
                });
                it('to purchase flow with redirect uri', () => {
                    expect(builder.purchasePaylink(532, 'http://localhost:5000')).to.equal('http://bff.spp.dev/api/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A5000&client_id=AAAxxEEE&paylink=532');
                });
            });
        });
    });
    describe('Builder using env name', ()=> {
        let builder;

        beforeEach(() => {
            builder = new Builder(normalizeHostname('LOCAL'));
        });

        describe('login', () => {
            it('returns the expected endpoint', () => {
                expect(builder.login('opt-email')).to.equal('http://spp.dev/bff-oauth/authorize?response_type=code&scope=openid&acr_values=opt-email');
            });
        });

        describe('sessionCluster', () => {
            it('returns the expected endpoint', () => {
                expect(builder.sessionCluster(1)).to.equal('http://session.spp.dev/rpc/hasSession.js?autologin=1');
            });
        });

        describe('session', () => {
            it('returns the expected endpoint', () => {
                expect(builder.session(1)).to.equal('http://spp.dev/ajax/hasSession.js?autologin=1');
            });
        });

        describe('payment', () => {
            beforeEach(() => {
                builder = new BuilderBff(normalizeBffsHostname('LOCAL'), {
                    redirect_uri: 'http://localhost:4000',
                    client_id: 'AAAxxEEE'
                });
            });
            describe('returns the expected endpoint', () => {
                it('to purchase flow with default redirect uri', () => {
                    expect(builder.purchasePaylink(532)).to.equal('http://spp.dev:4100/api/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A4000&client_id=AAAxxEEE&paylink=532');
                });
                it('to purchase flow with redirect uri', () => {
                    expect(builder.purchasePaylink(532, 'http://localhost:5000')).to.equal('http://spp.dev:4100/api/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A5000&client_id=AAAxxEEE&paylink=532');
                });
            });
        });
    });
    describe('Normailize envs', () => {
        it('returns the expected domain', () => {
            expect(normalizeHostname('LOCAL')).to.equal('http://spp.dev');
            expect(normalizeHostname('DEV')).to.equal('https://identity-dev.schibsted.com');
            expect(normalizeHostname('PRE')).to.equal('https://identity-pre.schibsted.com');
            expect(normalizeHostname('PRO')).to.equal('https://login.schibsted.com');
            expect(normalizeHostname('PRO.NO')).to.equal('https://payment.schibsted.no');
            expect(normalizeHostname('PRO.COM')).to.equal('https://login.schibsted.com');
            expect(normalizeHostname('unknow_env')).to.equal(undefined);

            expect(normalizeBffsHostname('LOCAL')).to.equal('http://spp.dev:4100');
            expect(normalizeBffsHostname('DEV')).to.equal('https://front.identity-dev.schibsted.com');
            expect(normalizeBffsHostname('unknow_env')).to.equal(undefined);
        });
    });
});
