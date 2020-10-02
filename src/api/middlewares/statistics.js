/*
 * @Author: Jin
 * @Date: 2020-09-29 09:19:34
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-29 15:27:27
 * @FilePath: /Server/src/api/middlewares/statistics.js
 */
import fs from 'fs';

const statisticsData = require('$data/statistics.json');

export default async (ctx, next) => {
    const urlArr = (ctx.url).split('/').filter(e => e != '');
    if (urlArr.length > 0 && urlArr.indexOf('System') != -1) {
        if (statisticsData[urlArr[0]]) {
            statisticsData[urlArr[0]]++;
        } else {
            statisticsData[urlArr[0]] = 1;
        }
        fs.writeFileSync(process.cwd() + '/data/statistics.json', JSON.stringify(statisticsData));
    }
    await next();
};