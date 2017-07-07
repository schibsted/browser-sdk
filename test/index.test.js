import { expect } from 'chai';
import SDK from '../index';

describe('index', () => {
    it('has the expected class for instantiating the SDK', () => {
        expect(() => {
            // eslint-disable-next-line no-unused-vars
            let instance = new SDK({
                client_id: 'xxx',
                redirect_uri: 'http://localhost',
                serverUrl: 'http://localhost',
                paymentServerUrl: 'http://localhost:4100'
            });
        }).not.to.throw();
    });
    it('has the expected class for instantiating the SDK with env option set', () => {
        expect(() => {
            // eslint-disable-next-line no-unused-vars
            let instance = new SDK({
                client_id: 'xxx',
                redirect_uri: 'http://localhost',
                env: 'DEV',
            });
        }).not.to.throw();
    });
});
