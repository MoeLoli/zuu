/*
 * @Author: Jin
 * @Date: 2021-02-07 00:37:23
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:33:16
 * @FilePath: /api/src/utils/index.js
 */
import fs from 'fs';
import path from 'path';

import { zuu } from '@/global';

const utils = {}
let files = fs.readdirSync(path.join(__dirname, './'));
files = files.filter(f => (f != 'index.js' && f.endsWith('.js')), files);
for (let name of files) {
    utils[name.replace(/(\.\/|\.js)/g, '')] = require(__dirname + '/' + name).default;
}

export default utils;
