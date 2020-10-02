/*
 * @Author: Jin
 * @Date: 2020-09-24 09:19:01
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-02 18:11:35
 * @FilePath: /zuu/src/loaders/index.js
 */
import koa2Loader from './koa2';

export default async ({ koa2App }) => {
    await koa2Loader({ app: koa2App });
};