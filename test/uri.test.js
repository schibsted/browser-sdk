'use strict';

import { expect } from 'chai';
import { Builder } from '../lib/uri';

describe('uri', () => {
    describe('Builder', ()=> {
        let builder;

        beforeEach(() => {
            builder = new Builder('http://spp.dev');
        });

        describe('login', () => {
            it('returns the expected endpoint', () => {
                expect(builder.login()).to.equal('http://spp.dev/flow/login?response_type=code');
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
                builder = new Builder('http://bff.spp.dev', {
                    redirect_uri: 'http://localhost:4000',
                    client_id: 'AAAxxEEE'
                });
            });
            describe('returns the expected endpoint', () => {
                it('to purchase flow with default redirect uri', () => {
                    expect(builder.paymentPurchase(532)).to.equal('http://bff.spp.dev/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A4000&client_id=AAAxxEEE&paylink_id=532');
                });
                it('to purchase flow with redirect uri', () => {
                    expect(builder.paymentPurchase(532, 'http://localhost:5000')).to.equal('http://bff.spp.dev/payment/purchase?redirect_uri=http%3A%2F%2Flocalhost%3A5000&client_id=AAAxxEEE&paylink_id=532');
                });
            });
        });
    });
});
