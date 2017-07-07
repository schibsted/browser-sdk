#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { promisify } = require('util');
const ssri = require('ssri');
const shell = require('shelljs');
const { main, name, version, license, author } = require('./package.json');
const minimist = require('minimist');
const bytes = require('bytes');
const chalk = require('chalk');
const cliOptions = minimist(process.argv.slice(2), {
    boolean: true,
    default: {
        // To build for production, pass --pro
        pro: false,
        // Watch the files (suitable for development mode but it's opt-in)
        watch: false
    }
});

console.log(`Building for production: ${cliOptions.pro}`);

const buildConfig = {
    maxOutputBytes: 50 * 1024,
    distPath: './dist',
    copyrightHeader: `${name} v${version}. Copyright (C) ${new Date().getFullYear()} ${author} [${license}].`
};

const webpackOptionsBase = {
    entry: path.resolve(__dirname, main),
    output: {
        filename: `${name}.js`,
        library: 'SPiD',
        libraryTarget: 'umd',
        path: path.join(__dirname, buildConfig.distPath, version)
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
const webpackOptionsDev = {
    devtool: 'inline-source-map'
};

// Build-Pro:
// --optimize-minimize
// --displayModules
// --display-reasons
// --sort-modules-by size",
const webpackOptionsPro = {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(buildConfig.copyrightHeader)
    ]
};

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

function createSSRI(inputFileName, outputFileName) {
    const fsWriteFile = promisify(fs.writeFile);
    return ssri.fromStream(fs.createReadStream(inputFileName), {
        algorithms: ['sha1', 'sha512']
    })
    .then(integrity => fsWriteFile(outputFileName, integrity.toString()));
}

function cleanDist() {
    shell.rm('-rf', buildConfig.distPath);
}

function compile(compiler) {
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
        createSSRI(
            path.join(__dirname, buildConfig.distPath, version, statsJson.assets[0].name),
            path.join(__dirname, buildConfig.distPath, version, statsJson.assets[0].name + '.txt')
        )
        .then(
            () => console.log(chalk.green('Wrote integrity check')),
            () => console.error(chalk.red('Failed to write integrity check'))
        );
    });
}

function watch(compiler) {
    compiler.watch((err, stats) => {
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
    });
}

cleanDist();
if (cliOptions.pro) {
    const compiler = webpack(webpackMerge(webpackOptionsBase, webpackOptionsPro));
    compile(compiler);
} else {
    const compiler = webpack(webpackMerge(webpackOptionsBase, webpackOptionsDev));
    if (cliOptions.watch) {
        console.log('Watching...');
        watch(compiler);
    } else {
        compile(compiler);
    }
}
