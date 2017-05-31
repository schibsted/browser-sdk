const { expect } = require('chai');
const identityWebSdkBrowser = require('../browser/bundle');

describe('index', () => {
    it('has the expected class for instantiating the SDK', () => {
        // eslint-disable-next-line no-unused-vars
        let instance;
        const SDK = identityWebSdkBrowser.default;
        expect(() => {
            instance = new SDK({ client_id: 'xxx' });
        }).not.to.throw();
    });
});
