/*
 * @Author: Jin
 * @Date: 2020-09-24 09:48:47
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-30 16:09:44
 * @FilePath: /Server/src/loaders/logger.js
 */
/*
 * @Author: Jin
 * @Date: 2020-09-24 09:48:47
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 13:37:09
 * @FilePath: /Server/src/loaders/logger.js
 */
import 'colors';
import fs from 'fs';
import util from 'util';

const writeFile = async (text, path, sync) => {
    try {
        if (sync) {
            fs.appendFileSync(path, text + '\n');
        } else {
            fs.appendFile(path, text + '\n', (e) => {
                if (e) {
                    console.log(e.stack);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export default {
    success: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format("[%s:%s:%s]\tSUCCESS\t[%s] %s", t.getHours() < 10 ? "0" + t.getHours() : t.getHours(), t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(), prefix, text);
        writeFile(text, process.cwd() + '/logs/' + t.getFullYear().toString() + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString()) + (t.getDate() + 1 < 10 ? "0" + (t.getDate() + 1).toString() : (t.getDate()).toString()) + '.log', true);
        console.log(text.green);
    },
    info: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format("[%s:%s:%s]\tINFO\t[%s] %s", t.getHours() < 10 ? "0" + t.getHours() : t.getHours(), t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(), prefix, text);
        writeFile(text, process.cwd() + '/logs/' + t.getFullYear().toString() + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString()) + (t.getDate() + 1 < 10 ? "0" + (t.getDate() + 1).toString() : (t.getDate()).toString()) + '.log', true);
        console.info(text.cyan);
    },
    warning: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format("[%s:%s:%s]\tWARN\t[%s] %s", t.getHours() < 10 ? "0" + t.getHours() : t.getHours(), t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(), prefix, text);
        console.warn(text.yellow);
        writeFile(text, process.cwd() + '/logs/' + t.getFullYear().toString() + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString()) + (t.getDate() + 1 < 10 ? "0" + (t.getDate() + 1).toString() : (t.getDate()).toString()) + '.log', true);
    },
    error: (text, prefix = 'Unknown') => {
        const t = new Date();
        text = util.format("[%s:%s:%s]\tERROR\t[%s] %s", t.getHours() < 10 ? "0" + t.getHours() : t.getHours(), t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(), t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(), prefix, text);
        console.error(text.red);
        writeFile(text, process.cwd() + '/logs/' + t.getFullYear().toString() + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString()) + (t.getDate() + 1 < 10 ? "0" + (t.getDate() + 1).toString() : (t.getDate() ).toString()) + '.log', true);
    }
};
