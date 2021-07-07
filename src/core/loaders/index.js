/*
 * @Author: Jin
 * @Date: 2020-09-24 09:19:01
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:31:43
 * @FilePath: /api/src/loaders/index.js
 */
import koa2Loader from './koa2';
import pluginLoader from './plugin';
import serviceLoader from './service';

export default async ({ koa2App }) => {
    await pluginLoader({ app: koa2App });

    await serviceLoader({ app: koa2App });

    await koa2Loader({ app: koa2App });
};
