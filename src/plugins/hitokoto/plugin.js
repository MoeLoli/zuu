/*
 * @Author: Jin
 * @Date: 2020-09-24 14:20:23
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 09:40:54
 * @FilePath: /zuu/src/plugins/hitokoto/plugin.js
 */
import _ from 'lodash';

const hitokotoData = require('./hitokoto.json');

class Hitokoto {
    init() {
        this.hook.register('REGISTER_ROUTE_1', [this, this.regRouter]);
    }

    regDocs () {
        return {
            type: 'md',
            content: require('fs').readFileSync(__dirname + '/docs.md', 'utf-8')
        }
    }

    regTelegramBot () {
        return {
            method: 'command',
            content: '/hitokoto',
            middleware: (ctx) => {
                let hitokoto = _.chain(hitokotoData.hitokoto);
                hitokoto = hitokoto.sampleSize(1).value();
                ctx.reply(hitokoto[0].hitokoto, { reply_to_message_id: ctx.message.message_id });
            }
        }
    }

    regRouter(fn) {
        fn({
            name: 'jjj ',
            url: '/cat',
            method: 'get',
            callback: (ctx, next) => {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    data: hitokotoData.categories
                };
            }
        })
    }
}

export default Hitokoto;