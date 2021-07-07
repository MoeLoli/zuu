/*
 * @Author: Jin
 * @Date: 2020-09-24 08:35:37
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 09:11:57
 * @FilePath: /Server/src/api/middlewares/index.js
 */
import fs from 'fs';
import path from 'path';

const middlewares = {};

let files = fs.readdirSync(path.join(__dirname, './'));
files = files.filter(f => (f !== 'index.js' && f.endsWith('.js')), files);

for (const name of files) {
    middlewares[name.replace(/(\.\/|\.js)/g, '')] = require(__dirname + '/' + name).default;
}

export default middlewares;
