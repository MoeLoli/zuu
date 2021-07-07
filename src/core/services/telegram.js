/*
 * @Author: Jin
 * @Date: 2020-09-26 22:36:56
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:30:45
 * @FilePath: /api/src/services/telegram.js
 */
import { Telegraf } from 'telegraf';
import HttpsProxyAgent from 'https-proxy-agent';

import config from '@/core/config';
import logger from '../utils/logger';
import { trigger } from '../utils/hook';

export default () => {
    if (!config?.telegram?.enabled || !config?.telegram?.token) {return;}

    const botConfig = {};
    if (config.http_proxy) {
        botConfig.telegram = {
            agent: new HttpsProxyAgent(config.http_proxy)
        };
    }
    const bot = new Telegraf(config.telegram.token, botConfig);
    bot.catch((err, ctx) => {
        logger.error(
            `Ooops, encountered an error for ${ctx.updateType} ${err}`,
            'TELEGRAF'
        );
    });
    const regTelegramBot = (method, ...args) => {
        if (!method || args.length < 2) {return;}

        // eslint-disable-next-line prefer-spread
        bot[method].apply(bot, args);
    };
    trigger('REGISTER_TELEGRAM_BOT_1', [regTelegramBot]);

    bot.launch();
};
