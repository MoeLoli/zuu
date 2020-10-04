/*
 * @Author: Jin
 * @Date: 2020-09-26 22:36:56
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 21:39:46
 * @FilePath: /zuu/src/loaders/telegram.js
 */
import { Telegraf } from 'telegraf';

import config from '@/config';
import { trigger } from './hook';

/*emitter.addListener("pluginLoaded", () => {
    bot.launch();
});*/

export default () => {
    if (!config?.telegram?.token) return ;
    const bot = new Telegraf(config.telegram.token);

    const genBotConfig = (obj) => {
        if (obj?.method || obj?.content || obj?.middleware) return;

        bot[obj.method](obj.content, obj.middleware);
    }

    trigger('REGISTER_ROUTE_1', [ genBotConfig ]);
    
    bot.launch();
}
