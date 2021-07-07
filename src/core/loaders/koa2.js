/* eslint-disable prefer-spread */
/*
 * @Author: Jin
 * @Date: 2020-09-24 09:16:43
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:27:12
 * @FilePath: /api/src/loaders/koa2.js
 */
import fs from 'fs';
import util from 'util';
import path from 'path';
import json from 'koa-json';
import koaBody from 'koa-body';
import KoaRouter from '@koa/router';

import { zuu } from '@/core/global';
import logger from '../utils/logger';
import { trigger } from '../utils/hook';

import constants from '@/core/api/decorators/constants';
import { HttpError } from '@/core/api/decorators/customError';

import middlewares from '@/core/api/middlewares';

const getRoutes = async (filePath) => {
    const fileList = [];

    function fileDisplay(filePath) {
        const files = fs.readdirSync(filePath);
        for (let i = 0; i < files.length; i++) {
            const filedir = path.join(filePath, files[i]);
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

    fileDisplay(filePath);

    return fileList;
};

const routeList = zuu.routes = zuu.routes ? zuu.routes : [];

export default async ({ app }) => {
    const loadMiddleware = (...args) => {
        app.use.apply(app, args);
    };

    trigger('REGISTER_MIDDLEWARE_1', [ loadMiddleware ]);

    app.use(middlewares.onError);
    app.use(middlewares.header);
    app.use(middlewares.accessControl);

    trigger('REGISTER_MIDDLEWARE_2', [ loadMiddleware ]);

    app.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;

        logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`, 'SYSTEM');
    });

    app.use(koaBody());
    app.use(json());

    trigger('REGISTER_MIDDLEWARE_3', [ loadMiddleware ]);

    // router
    let routeNum = 0;
    const regRouter = (method, ...args) => {
        if (!method || args.length === 0) {return;}
        routeNum++;
        const router = new KoaRouter();
        router[method].apply(router, args);
        app.use(router.routes()).use(router.allowedMethods());
        routeList.push({
            name: ((args[0].split('/').filter(e => e !== ''))[0]).toLocaleLowerCase(),
            args
        });
    };

    trigger('REGISTER_ROUTE_1', [ regRouter ]);
    trigger('REGISTER_MIDDLEWARE_4', [ loadMiddleware ]);

    let routes = await getRoutes(path.join(__dirname, '../api/routes'));
    routes = routes.map(value => {
        routeNum++;
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
    routes.forEach((value, index, array) => {
        array[index].object = require(value.path);
        app.use((array[index].object).routes(), (array[index].object).allowedMethods());
        logger.success(`Router [${value.group === '' ? value.name : value.group + ' - ' + value.name}] has been loaded`, 'ROUTER');
    }, this);

    trigger('REGISTER_ROUTE_2', [ regRouter ]);

    trigger('REGISTER_MIDDLEWARE_5', [ loadMiddleware ]);

    logger.info(util.format(`%d ${routeNum.length === 1 ? 'route' : 'routes'} have been loaded`, routeNum), 'SYSTEM');

    app.use(async () => {
        throw new HttpError(constants.HTTP_CODE.NOT_FOUND);
    });

    trigger('REGISTER_MIDDLEWARE_6', [ loadMiddleware ]);
};
