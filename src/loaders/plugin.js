/*
 * @Author: Jin
 * @Date: 2020-09-24 14:13:23
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 21:31:48
 * @FilePath: /zuu/src/loaders/plugin.js
 */
import fs from 'fs';
import util from 'util';
import path from 'path';

import logger from './logger';
import router from './router';
import * as hook from './hook';

const getRouteName = (url) => {
    let ret = '';
    ret = url.slice(1);
    ret = ret.split('/').join(' - ');    
    return ret.toLocaleUpperCase();
}

const genRouteConfig = (pcn, route, prefix = '') => {
    return {
        name: pcn,
        url: prefix + (route.url == '/' ? '' : route.url),
        method: route.method,
        callback: route.callback,
        middleware: route.middleware
    }
}

export default async ({ app }) => {
    let plugins = fs.readdirSync(path.join(__dirname, '../plugins'));
    plugins = plugins.filter(value => value != '.gitkeep');
    plugins = plugins.map(value => {
        return {
            pcn: value.toLocaleUpperCase(),
            path: path.join(__dirname, '../plugins/') + value + '/plugin.js'
        };
    });
    plugins = plugins.filter(value => fs.existsSync(value.path));

    plugins.forEach((value, index, array) => {
        array[index].object = new (require(value.path).default)();
    }, this);

    let pluginNum = plugins.length;

    plugins.forEach((value, index, array) => {
        if (typeof value.object.init === 'undefined') {
            logger.error(`Plugin [${value.pcn}] could not be loaded`, 'PLUGIN');
            pluginNum--;
            return;
        }
        
        // Load Plugin Init
        const pluginEnv = { hook, logger };
        Object.assign(value.object, pluginEnv);
        value.object.init.apply(value.object, []);

        logger.success(`Plugin [${value.pcn}] has been loaded`, 'PLUGIN');
    }, this);

    logger.info(util.format(`%d ${pluginNum == 1 ? 'plugin' : 'plugins'} have been loaded`, pluginNum), 'SYSTEM');
}