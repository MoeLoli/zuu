/*
 * @Author: Jin
 * @Date: 2020-09-26 22:36:56
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-21 14:46:11
 * @FilePath: /zuu/src/loaders/telegram.js
 */
import { Telegraf } from "telegraf";
import HttpsProxyAgent from "https-proxy-agent";

import config from "@/config";
import { trigger } from "./hook";
import logger from "./logger";

export default () => {
    if (!config?.telegram?.token) return;

    const botConfig = {};
    if (config.http_proxy) {
        botConfig.telegram = {
            agent: new HttpsProxyAgent(config.http_proxy),
        };
    }
    const bot = new Telegraf(config.telegram.token, botConfig);
    bot.catch((err, ctx) => {
        logger.error(
            `Ooops, encountered an error for ${ctx.updateType} ${err}`,
            "TELEGRAF"
        );
    });
    const regTelegramBot = (method, ...args) => {
        if (!method || args.length < 2) return;

        bot[method].apply(bot, args);
    };
    trigger("REGISTER_TELEGRAM_BOT_1", [regTelegramBot]);

    bot.launch();
};
