var path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WriteFilePlugin = require('write-file-webpack-plugin');

var util = require('./util'),
    config = require('../config'),
    baseWebpackConfig = require('./webpack.base');


var env = config.dev.env;
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-dev-server/client/index.js?http://localhost:' + config.dev.port + '/'].concat(baseWebpackConfig.entry[name])
});

var webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        filename: util.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: util.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: util.assetsPath('css/[name].[contenthash].css'),
            allChunks: true
        }),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../assets'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),

        new WriteFilePlugin({
            test: /\.(swig|html|png|jpe?g)$/
        }),
    ]
});

if (Array.isArray(config.build.pageMap)) {
    config.build.pageMap.forEach(function (page) {
        webpackConfig.plugins.push(new HtmlWebpackPlugin(page));
    });
}
if (Array.isArray(config.build.copyAssets)) {
    webpackConfig.plugins.push(new CopyWebpackPlugin(config.build.copyAssets));
}


module.exports = webpackConfig;


