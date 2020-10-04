/*
 * @Author: Jin
 * @Date: 2020-09-24 09:19:01
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 21:38:08
 * @FilePath: /zuu/src/loaders/index.js
 */
import koa2Loader from './koa2';
import pluginLoader from './plugin';
import telegramLoader from './telegram';

export default async ({ koa2App }) => {
    await pluginLoader({ app: koa2App });

    await telegramLoader({ app: koa2App })

    await koa2Loader({ app: koa2App });
};