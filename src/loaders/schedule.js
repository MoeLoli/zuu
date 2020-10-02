/*
 * @Author: Jin
 * @Date: 2020-10-02 18:00:33
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 00:19:59
 * @FilePath: /zuu/src/loaders/schedule.js
 */
import schedule from 'node-schedule';

import { zuu } from '@/global';

const schedules = zuu.schedules = zuu.schedules ? zuu.schedules: {};

export default (name, date, handle) => {
    schedules[name] = schedule.scheduleJob(date, handle)
};