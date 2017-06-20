#!/usr/bin/env node

/* eslint-env node */
'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { name, version } = require('./package.json');
const minimist = require('minimist');
const bytes = require('bytes');
const chalk = require('chalk');
const cliOptions = minimist(process.argv.slice(2), {
    boolean: true,
    // To build for production, pass --prod
    default: {
        prod: false
    }
});

console.log(`Building for production: ${cliOptions.prod}`);

const buildConfig = {
    maxOutputBytes: 50 * 1024
};

const webpackOptionsBase = {
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
        maxAssetSize: buildConfig.maxOutputBytes
    },
    node: {
        url: true
    }
};

// Build:
// --displayModules
// --display-reasons (reasons: true)
// --sort-modules-by size (modulesSort: 'size')
const webpackOptionsDev = webpackMerge(webpackOptionsBase, {
    devtool: 'inline-source-map'
});

// Build-Prod:
// --optimize-minimize
// --displayModules
// --display-reasons
// --sort-modules-by size",
const webpackOptionsPro = webpackMerge(webpackOptionsBase, {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin('banner')
    ]
});

const compiler = webpack(cliOptions.prod ? webpackOptionsPro : webpackOptionsDev);

function statsToStr(stats) {
    // return Array.isArray(stats.assets)
    // return Object.keys(stats)
    return stats.modules
        .map(function (m) {
            const deps = m.reasons.map(r => chalk.yellow('|--> ') + r.moduleName).join('\n');
            return `${chalk.bgWhite(m.name)} (${bytes(m.size)})${deps ? '\n' + deps : ''}`
        })
        .join('\n');
}

compiler.run((err, stats) => {
    if (err) {
        console.error(chalk.bgRed(`Webpack error: ${err.stack || err}`));
        if (err.details) {
            console.error(chalk.bgRed(`Error details: ${err.details}`));
        }
        process.exit(1);
    }
    if (stats.hasErrors()) {
        console.error(chalk.bgRed(`Compilation errors: ${stats.toJson().errors}`));
        process.exit(2);
    }
    const statsJson = stats.toJson({modulesSort: 'size'});
    console.log(chalk.yellow(`Compilation finished in in ${stats.endTime - stats.startTime}ms. The result is ${bytes(statsJson.assets[0].size)}`));
    if (stats.hasWarnings()) {
        console.warn(chalk.bgYellow(`Webpack build finished with some warnings: ${stats.toJson().warnings}`));
        console.warn(statsToStr(statsJson));
    } else {
        console.log(chalk.bgGreen('Webpack build finished successfully'));
        console.log(statsToStr(statsJson));
    }
});
