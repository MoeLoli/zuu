/*
 * @Author: Jin
 * @Date: 2020-09-24 07:20:34
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-30 16:02:53
 * @FilePath: /Server/src/app.js
 */
import 'module-alias/register';

import Koa from 'koa';

import '@/global';
import config from '@/config';
import logger from '@/loaders/logger';

(async () => {
    const app = new Koa();
    await require('./loaders').default({ koa2App: app });

    app.listen(config.port);

    logger.success('API start! ٩(˃̶͈̀௰˂̶͈́)و!', 'SYSTEM');
})();