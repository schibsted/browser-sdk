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
    });
});
