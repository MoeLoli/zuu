/*
 * @Author: Jin
 * @Date: 2020-09-24 08:37:55
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 09:10:46
 * @FilePath: /Server/src/api/middlewares/header.js
 */
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X-Auth-Token, yourHeaderFeild',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-cache',
};

export default async (ctx, next) => {
    ctx.set(headers);

    if (ctx.method == 'OPTIONS') {
        ctx.body = '';
        ctx.status = 204;
    } else {
        await next();
    }
}