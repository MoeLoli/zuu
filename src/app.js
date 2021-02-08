/*
 * @Author: Jin
 * @Date: 2020-09-24 07:20:34
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:42:42
 * @FilePath: /api/src/app.js
 */
import Koa from 'koa';

import './aliases';
import config from './config';

import logger from './utils/logger';

(async () => {
    const app = new Koa();
    await require('./loaders').default({ koa2App: app });

    app.listen(config.port);

    logger.success('API start! ٩(˃̶͈̀௰˂̶͈́)و!', 'SYSTEM');
})();
