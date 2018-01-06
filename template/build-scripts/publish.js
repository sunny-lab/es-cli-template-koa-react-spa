var path = require('path'),
    exec = require('shelljs').exec,
    webpack = require('webpack'),
    ora = require('ora'),
    del = require('del'),
    Promise = require('bluebird');

var config = require('../config'),
    logger = require('./logger');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV)
}

var webpackConfig = require('./webpack.prod'),
    spinner = ora('building for production...');
spinner.start();

del(config.build.assetsRoot)
    .then(function () {
        return new Promise(function (resolve, reject) {
            webpack(webpackConfig, function (err, stats) {
                spinner.stop();
                if (err) {
                    return reject(err);
                }
                console.log(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }));
                resolve(stats);
            });
        });
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            var child = exec('npm run build-node', {async: true});
            child.stdout.on('data', function (data) {
                logger.info(data);
            });
            child.stderr.on('data', function (data) {
                logger.error(data);
            });
        });
    })
    .catch(function (err) {
        logger.error(err);
    });
