var path = require('path');
    // ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('../config');

exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'development'
        ? config.dev.assetsSubDirectory
        : config.build.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};
