/*
 * @Author: Jin
 * @Date: 2020-09-24 08:29:59
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-29 16:00:11
 * @FilePath: /Server/src/api/routes/index.js
 */
import Router from '@koa/router';

import { getCPUUsage, parsePrefix } from '@/utils';

const statisticsData = require('$data/statistics.json');
const router = new Router({
    prefix: parsePrefix(__filename) === '/' ? undefined : parsePrefix(__filename)
});
const loadAPIList = () => {
    let routes = global.routes;

    let ret = {};
    for (const key in routes) {
        const url = (routes[key].url).split('/').filter(e => e != '');
        ret[`${(routes[key].name).toLocaleLowerCase()}_url`] = `/${url[0]}`;
    }
    
    return ret;
}

router.get('/System', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        uptime: process.uptime(),
        usage: {
            memory: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + 'MB',
            cpu: await getCPUUsage() + '%'
        },
        api: loadAPIList(),
        statistics: statisticsData
    }
});

module.exports = router;
