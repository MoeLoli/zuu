/*
 * @Author: Jin
 * @Date: 2020-10-02 10:52:16
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 18:56:12
 * @FilePath: /api/src/loaders/logger.js
 */
import 'colors';
import util from 'util';

export default {
    success: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format('[%s:%s:%s]\tSUCCESS\t[%s] %s', t.getHours() < 10 ? '0' + t.getHours() : t.getHours(), t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds(), prefix, text);
        console.log(text.green);
    },
    info: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format('[%s:%s:%s]\tINFO\t[%s] %s', t.getHours() < 10 ? '0' + t.getHours() : t.getHours(), t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds(), prefix, text);
        console.info(text.cyan);
    },
    warning: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format('[%s:%s:%s]\tWARN\t[%s] %s', t.getHours() < 10 ? '0' + t.getHours() : t.getHours(), t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds(), prefix, text);
        console.warn(text.yellow);
    },
    error: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format('[%s:%s:%s]\tERROR\t[%s] %s', t.getHours() < 10 ? '0' + t.getHours() : t.getHours(), t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds(), prefix, text);
        console.error(text.red);
    }
};
