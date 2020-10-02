/*
 * @Author: Jin
 * @Date: 2020-09-26 22:36:56
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-27 19:08:18
 * @FilePath: /Server/src/loaders/telegram.js
 */
import { Telegraf } from 'telegraf';
import HttpsProxyAgent from 'https-proxy-agent';

import config from '@/config';
import emitter from './emitter';

const bot = new Telegraf(config.telegram.token, {
    telegram: {
        agent: new HttpsProxyAgent('http://127.0.0.1:1087')
    }
});

emitter.addListener("pluginLoaded", () => {
    bot.launch();
});

export default ({ method = 'command', content = 'start', middleware = ((ctx, next) => { }) }) => {
    bot[method](content, middleware);
}
