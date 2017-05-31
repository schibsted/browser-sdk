'use strict';

module.exports = {
    entry: './index.js',
    output: {
        filename: 'dist/bundle.js',
        library: 'SPiD',
        libraryTarget: 'umd'
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
        maxAssetSize: 10000
    },
    node: {
        url: true
    }
};
