/*
 * @Author: Jin
 * @Date: 2020-09-24 08:45:28
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 10:03:05
 * @FilePath: /Server/src/api/middlewares/accessControl.js
 */
const blacklist = (process.env.BLACKLIST && process.env.BLACKLIST.split(',')) || [];
const whitelist = process.env.WHITELIST && process.env.WHITELIST.split(',');

export default async (ctx, next) => {
    const ip = ctx.ips[0] || ctx.ip;
    const referer = ctx.request.headers.referer;

    const refererAllowed = (whitelist && whitelist.indexOf(referer) !== -1) || blacklist.indexOf(referer) === -1;
    const ipAllowed = (whitelist && whitelist.indexOf(ip) !== -1) || blacklist.indexOf(ip) === -1;

    if (refererAllowed && ipAllowed) {
        await next();
    } else {
        ctx.status = 401;
        msg = 'Authentication Error';
    }
};