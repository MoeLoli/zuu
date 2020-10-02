/*
 * @Author: Jin
 * @Date: 2020-09-24 23:34:00
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-29 15:57:34
 * @FilePath: /Server/src/loaders/router.js
 */
import KoaRouter from '@koa/router';

export const routes = global.routes = [];

export const RequestMethod = [
    'get',
    'post',
    'pust',
    'delete',
    'option',
    'patch'
];

export default ({ name = '', url = '', method = 'get', callback = ((ctx, next) => { }), middleware = null }, app) => {
    if (RequestMethod.indexOf(method) == -1) return;
    const router = new KoaRouter();

    if (middleware) {
        router[method](url, middleware, callback);
    } else {
        router[method](url, callback);
    }
    // documentation
    const item = {
        name: name,
        url: url,
        method: method,
        middleware: middleware,
        callback: callback
    };
    routes.push(item);
    
    app.use(router.routes()).use(router.allowedMethods());
}

