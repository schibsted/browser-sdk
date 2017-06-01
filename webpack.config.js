/* eslint-env node */
'use strict';

const { name, version } = require('./package.json');

module.exports = {
    entry: './index.js',
    output: {
        filename: `${name}.js`,
        library: 'SPiD',
        libraryTarget: 'umd',
        path: `${__dirname}/dist/${version}`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    performance: {
        maxAssetSize: 50000
    },
    node: {
        url: true
    }
};
