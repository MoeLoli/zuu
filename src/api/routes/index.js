/*
 * @Author: Jin
 * @Date: 2020-09-24 08:29:59
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:35:15
 * @FilePath: /api/src/api/routes/index.js
 */
import Router from "@koa/router";

import getCPUUsage from "@/utils/os";
import { trigger } from "@/utils/hook";
import parsePrefix from '@/utils/parsePrefix';

const router = new Router({
    prefix: parsePrefix(__filename) === "/" ? undefined : parsePrefix(__filename),
});

router.get("/System", async (ctx, next) => {
    let temp;

    let retStatus = 200;
    let retBody = {
        uptime: process.uptime(),
        usage: {
            memory: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB",
            cpu: (await getCPUUsage()) + "%",
        },
    };

    temp = trigger("ROUTER_SYSTEM_1", [retStatus, retBody]);
    if (typeof temp === "object" && Object.keys(temp).length > 0) {
        if (temp.retStatus) {
            retStatus = temp.retStatus;
        }

        if (temp.retBody) {
            retBody = temp.retBody;
        }
    }

    ctx.status = retStatus;
    ctx.body = retBody;
});

module.exports = router;
