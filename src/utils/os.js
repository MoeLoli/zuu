/*
 * @Author: Jin
 * @Date: 2021-02-07 00:37:45
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:23:58
 * @FilePath: /api/src/utils/os.js
 */
import os from 'os';

const OSUtils = {
    cpuUsageMSDefault: 1000,
    async getCPUUsage(options = {}) {
        const that = this;
        let { cpuUsageMS, percentage } = options;
        cpuUsageMS = cpuUsageMS || this.cpuUsageMSDefault;
        const t1 = that._getCPUInfo(); // t1 时间点 CPU 信息

        await sleep(cpuUsageMS);

        const t2 = that._getCPUInfo(); // t2 时间点 CPU 信息
        const idle = t2.idle - t1.idle;
        const total = t2.total - t1.total;
        let usage = 1 - idle / total;

        if (percentage) usage = (usage * 100.0).toFixed(2) + "%";

        return usage;
    },
    _getCPUInfo() {
        const cpus = os.cpus();
        let user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0;

        for (let cpu in cpus) {
            const times = cpus[cpu].times;
            user += times.user;
            nice += times.nice;
            sys += times.sys;
            idle += times.idle;
            irq += times.irq;
        }

        total += user + nice + sys + idle + irq;

        return {
            user,
            sys,
            idle,
            total,
        }
    }
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getCPUUsage = async () => await OSUtils.getCPUUsage();

export default getCPUUsage;
