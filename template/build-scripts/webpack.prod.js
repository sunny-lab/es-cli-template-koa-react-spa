var path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WriteFilePlugin = require('write-file-webpack-plugin'),
    StatsPlugin = require('stats-webpack-plugin');

var util = require('./util'),
    config = require('../config'),
    baseWebpackConfig = require('./webpack.base');


var env = config.build.env;

var webpackConfig = merge(baseWebpackConfig, {
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: util.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: util.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: util.assetsPath('css/[name].[contenthash].css')
        }),
        
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../assets'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
    ]
});

// handle backend html
if (Array.isArray(config.build.pageMap)) {
    config.build.pageMap.forEach(function (page) {
        webpackConfig.plugins.push(new HtmlWebpackPlugin(page));
    });
}
// handle copy assets
if (Array.isArray(config.build.copyAssets)) {
    webpackConfig.plugins.push(new CopyWebpackPlugin(config.build.copyAssets));
}

// handle analyze
if (config.build.analyze) {
    webpackConfig.plugins.push(
        new StatsPlugin('stats.json', {
            chunkModules: true
        })
    )
}


module.exports = webpackConfig;

