var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack'),
    util = require('./util'),
    config = require('../config'),
    path = require('path'),
    HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const dllPath = path.join(__dirname, '../src/static/dll/dist/manifest.json'),
    dllFileName = require(dllPath).name + '.js';

module.exports = {
    entry: config.build.entry,
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name]_[hash].js",
        publicPath: process.env.NODE_ENV === 'development'
            ? config.dev.assetsPublicPath
            : config.build.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules(\/|\\)(attr-accept|disposables|normalizr|react-echarts|util-toolkit|yr-gmenu))/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: util.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                }),
            },
            {
                test: /\.(html|swig)$/,
                loader: 'html-loader'
            }
        ]
    }
};
