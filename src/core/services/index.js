/*
 * @Author: Jin
 * @Date: 2021-02-07 22:13:55
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:29:35
 * @FilePath: /api/src/services/index.js
 */
import scheduleService from './schedule';
import telegramService from './telegram';

export default async () => {
    await telegramService();
    await scheduleService();
};
