/*
 * @Author: Jin
 * @Date: 2020-09-24 14:20:23
 * @LastEditors: Jin
 * @LastEditTime: 2020-11-04 19:16:11
 * @FilePath: /zuu/src/plugins/statistics/plugin.js
 */
import fs from 'fs';
import path from 'path';

const statisticsData = require("./statistics.json");

class Statistics {
    activate() {
        this.hook.register("REGISTER_MIDDLEWARE_2", [this, this.regMiddleware]);
    }

    async regMiddleware(fn) {
        fn(async (ctx, next) => {
            const urlArr = ctx.url.split("/").filter((e) => e != "");
            if (urlArr.length > 0 && urlArr.indexOf("System") == -1) {
                if (statisticsData[urlArr[0]]) {
                    statisticsData[urlArr[0]]++;
                } else {
                    statisticsData[urlArr[0]] = 1;
                }
                fs.writeFileSync(
                    path.join(__dirname, "./statistics.json"),
                    JSON.stringify(statisticsData)
                );
            }
            await next();
        });
    }
}

export default Statistics;
