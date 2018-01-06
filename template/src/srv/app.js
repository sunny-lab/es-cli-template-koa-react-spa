import 'babel-polyfill';
import Koa from 'koa';
import convert from 'koa-convert';
import path from 'path';
import koaStatic from 'koa-static-cache';
import views from 'koa-views';

import getConfig from './util/getConfig';

const bundles = [
    'hello'
];

const app = new Koa();
const appRoot = __dirname;
const staticFiles = {};
const bootstrapConfig = getConfig();

app.use(convert(koaStatic(bootstrapConfig.staticPath, {
    prefix: '/static',
    buffer: true,
    gzip: true
}), staticFiles));
app.use(views(path.join(bootstrapConfig.tmplRoot, './views'), {
    map: {
        html: 'swig',
        swig: 'swig'
    }
}));
app.context.appRoot = appRoot;

// get can init app modules
bundles.forEach(bundleName => {
    let bundle = require('./' + path.join('bundle', bundleName, 'app'));
    bundle.start(app);
});

app.listen(bootstrapConfig.port, () => {
    console.log('App started at port ' + bootstrapConfig.port);
});
