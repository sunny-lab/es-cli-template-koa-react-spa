import Router from 'koa-router';

import HelloController from './controller/HelloController';

let router = new Router(),
    helloController = new HelloController();

router
    .get('/', helloController.renderIndex);

export const start = app => {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
