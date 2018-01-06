var path = require('path');

const pageMap = [
    {
        chunks: ['app'],
        inject: 'body',
        template: './src/srv/views/index.html',
        filename: './srv/views/index.html'
    }
];
const copyAssets = [
    {
        from: './srv/views/lib/*.html',
        to: './',
        context: path.join(__dirname, '../src')
    },
    {
        from: './srv/**/*.json',
        to: './',
        context: path.join(__dirname, '../src')
    },
];
const entry = {
    app: ['./src/static/app.js']
};

module.exports = {
    build: {
        entry: entry,
        env: {
            NODE_ENV: '"production"'
        },
        assetsRoot: path.resolve(__dirname, '../build'),
        assetsSubDirectory: 'static/assets',
        // TODO: add oss domain name
        assetsPublicPath: '/',
        pageMap: pageMap,
        copyAssets: copyAssets,
        analyze: false
    },
    dev: {
        entry: entry,
        env: {
            NODE_ENV: '"development"'
        },
        port: 8081,
        assetsSubDirectory: 'static/assets',
        assetsPublicPath: 'http://localhost:8081/',
        pageMap: pageMap,
        copyAssets: copyAssets
    }
};
