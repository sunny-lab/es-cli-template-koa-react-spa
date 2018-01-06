var path = require('path'),
    shelljs = require('shelljs'),
    webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server");

var config = require('../config'),
    first = true;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var webpackConfig = require('./webpack.dev'),
    logger = require('./logger'),
    packageJson = require('../package.json');

var compiler = webpack(webpackConfig),
    server = new WebpackDevServer(compiler, {
        contentBase: path.join(config.build.assetsRoot, config.dev.assetsSubDirectory),
        port: config.dev.port,
        clientLogLevel: "warning",
        stats: {colors: true},
        publicPath: webpackConfig.output.publicPath,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
compiler.plugin('done', function () {
    logger.info('compile done');
    if (first) {
        shelljs.exec(packageJson.scripts['dev-node'], {async: true});
        first = false;
    }
});
server.listen(config.dev.port, 'localhost', function () {
    logger.info("Starting static server on http://localhost:" + config.dev.port);
});




