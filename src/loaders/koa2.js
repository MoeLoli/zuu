/*
 * @Author: Jin
 * @Date: 2020-09-24 09:16:43
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 21:29:54
 * @FilePath: /zuu/src/loaders/koa2.js
 */
import fs from 'fs';
import util from 'util';
import path from 'path';
import json from 'koa-json';
import koaBody from 'koa-body';
import KoaRouter from '@koa/router';

import logger from './logger';
import { zuu } from '@/global';
import { trigger } from './hook';

import constants from '@/decorators/constants';
import { HttpError } from '@/decorators/customError';

import middlewares from '@/api/middlewares';

const getRoutes = async (filePath) => {
    let fileList = [];
    fileDisplay(filePath);

    function fileDisplay(filePath) {
        let files = fs.readdirSync(filePath);
        for (let file in files) {
            let filedir = path.join(filePath, files[file]);
            const stats = fs.statSync(filedir);
            if (stats.isFile()) {
                if (filedir.indexOf('.DS_Store') === -1) {
                    fileList.push(filedir);
                }
            }
            if (stats.isDirectory()) {
                fileDisplay(filedir);
            }
        }
    }
    return fileList;
}

const routes = zuu.routes = zuu.routes ? zuu.routes : [];

const trObj2Router = ({ name = '', url = '', method = 'get', callback = ((ctx, next) => { }), middleware = null }, app) => {
    if (!name || !url || !method || !callback) return;

    const RequestMethod = [
        'get',
        'post',
        'pust',
        'delete',
        'option',
        'patch'
    ];
    if (RequestMethod.indexOf(method) == -1) return;
    const router = new KoaRouter();
    if (middleware) {
        router[method](url, middleware, callback);
    } else {
        router[method](url, callback);
    }
    const item = {
        name: ((url.split('/').filter(e => e != ''))[0]).toLocaleLowerCase(),
        url: url,
        method: method,
        middleware: middleware,
        callback: callback
    };
    routes.push(item);
    app.use(router.routes()).use(router.allowedMethods());
}

export default async ({ app }) => {
    app.use(middlewares.onError);
    app.use(middlewares.header);
    app.use(middlewares.accessControl);
    app.use(middlewares.statistics);

    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;

        logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`, 'SYSTEM');
    });

    app.use(koaBody());
    app.use(json());

    // router
    let routes = await getRoutes(path.join(__dirname, '../api/routes'));
    routes = routes.map(value => {
        const name = value.substr(0, value.indexOf('.')).substr(value.lastIndexOf('/') + 1, value.length);
        const groupPathArr = (value.substr(value.indexOf('api/routes') + 'api/routes'.length + 1, value.length)).split('/');
        groupPathArr.pop();
        const group = groupPathArr.join(' - ');
        
        return {
            name: name.toLocaleUpperCase(),
            group: group.toLocaleUpperCase(),
            path: value
        };
    });
    routes = routes.filter(value => fs.existsSync(value.path));

    let routeNum = routes.length;

    routes.forEach((value, index, array) => {
        array[index].object = require(value.path);
        app.use((array[index].object).routes(), (array[index].object).allowedMethods());
        logger.success(`Router [${value.group === '' ? value.name : value.group + ' - ' + value.name}] has been loaded`, 'ROUTER');
    }, this);

    trigger('REGISTER_ROUTE_1', [ ((obj) => {
        routeNum++;
        trObj2Router(obj, app)
    }) ]);

    logger.info(util.format(`%d ${routeNum.length == 1 ? 'route' : 'routes'} have been loaded`, routeNum), 'SYSTEM');

    app.use(async () => {
        throw new HttpError(constants.HTTP_CODE.NOT_FOUND);
    });
};