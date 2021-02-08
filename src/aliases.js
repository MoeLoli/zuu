/*
 * @Author: Jin
 * @Date: 2021-02-06 21:37:35
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-06 21:37:44
 * @FilePath: /api/src/aliases.js
 */
import path from 'path';
import moduleAlias from 'module-alias';

moduleAlias.addAlias('@', path.resolve(__dirname, './'));
