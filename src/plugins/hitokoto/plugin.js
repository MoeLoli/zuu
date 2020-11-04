/*
 * @Author: Jin
 * @Date: 2020-09-24 14:20:23
 * @LastEditors: Jin
 * @LastEditTime: 2020-11-04 19:16:19
 * @FilePath: /zuu/src/plugins/hitokoto/plugin.js
 */
import _ from "lodash";

const hitokotoData = require("./hitokoto.json");

class Hitokoto {
    activate() {
        this.hook.register("REGISTER_ROUTE_2", [this, this.regRoute]);
        this.hook.register("REGISTER_TELEGRAM_BOT_1", [
            this,
            this.regTelegramBot,
        ]);
    }

    regTelegramBot(fn) {
        fn("command", "/hitokoto", (ctx) => {
            let hitokoto = _.chain(hitokotoData.hitokoto);
            hitokoto = hitokoto.sampleSize(1).value();
            ctx.reply(hitokoto[0].hitokoto, {
                reply_to_message_id: ctx.message.message_id,
            });
        });
    }

    regRoute(fn) {
        fn("get", "/hitokoto/cat", (ctx) => {
            ctx.status = 200;
            ctx.body = {
                status: "success",
                data: hitokotoData.categories,
            };
        });

        fn("get", "/hitokoto", (ctx) => {
            let hitokoto = _.chain(hitokotoData.hitokoto);
            hitokoto = hitokoto.sampleSize(1).value();

            ctx.status = 200;
            ctx.body = {
                status: "success",
                data: hitokoto,
            };
        });
    }
}

export default Hitokoto;
