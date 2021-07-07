/*
 * @Author: Jin
 * @Date: 2020-09-24 14:13:23
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 23:02:42
 * @FilePath: /api/src/loaders/plugin.js
 */
import fs from 'fs';
import util from 'util';
import path from 'path';
import spawn from 'cross-spawn';

import axios from '../utils/axios';
import logger from '../utils/logger';
import * as hook from '../utils/hook';

export const execCommand = async (cmd, modules, where, proxy, env) => {
    const registry = '';
    return await new Promise((resolve) => {
        let args = [cmd].concat(modules).concat('--save');
        if (registry) {
            args = args.concat(`--registry=${registry}`);
        }
        if (proxy) {
            args = args.concat(`--proxy=${proxy}`);
        }
        try {
            const npm = spawn('npm', args, { cwd: where, env: Object.assign({}, process.env, env) });

            let output = '';
            npm.stdout.on('data', (data) => {
                output += data;
            }).pipe(process.stdout);

            npm.stderr.on('data', (data) => {
                output += data;
            }).pipe(process.stderr);

            npm.on('close', (code) => {
                if (!code) {
                    resolve({ code: 0, data: output });
                } else {
                    resolve({ code, data: output });
                }
            });
            // for users who haven't installed node.js
            npm.on('error', (err) => {
                console.error(err);
                console.error('NPM is not installed');
            });
        } catch (e) {
            console.error(e);
        }
    });
};

export const pluginLoader = async () => {
    let plugins = fs.readdirSync(path.join(__dirname, '../../plugins'));
    plugins = plugins.filter(
        (value) => value !== '.gitkeep' && value !== '.DS_Store'
    );
    plugins = plugins.map((value) => {
        return {
            pcn: value.toLocaleUpperCase(),
            enabled: true,
            config: fs.existsSync(path.join(__dirname, '../../plugins/') + value + '/plugin.json')
                ? require(path.join(__dirname, '../../plugins/') +
                    value +
                    '/plugin.json')
                : {},
            path: path.join(__dirname, '../../plugins/') + value + '/plugin.js'
        };
    });
    plugins = plugins.filter((value) => fs.existsSync(value.path));
    plugins = plugins.sort((a, b) => a.config.priority - b.config.priority);
    plugins.forEach((value, index, array) => {
        // eslint-disable-next-line new-cap
        array[index].object = new (require(value.path).default)();
    }, this);

    let pluginNum = plugins.length;
    plugins.filter((value) => value.enabled === true).forEach((value) => {
        const pluginEnv = { hook, logger, axios };
        Object.assign(value.object, pluginEnv);

        if (typeof value.object.initialize === 'function') {
            value.object.initialize.apply(value.object, []);
        }

        if (typeof value.object.activate !== 'function') {
            logger.error(`Plugin [${value.pcn}] could not be loaded`, 'PLUGIN');
            pluginNum--;
            return;
        }
        value.object.activate.apply(value.object, []);

        logger.success(`Plugin [${value.pcn}] has been loaded`, 'PLUGIN');
    }, this);

    logger.info(
        util.format(
            `%d ${pluginNum === 1 ? 'plugin' : 'plugins'} have been loaded`,
            pluginNum
        ),
        'SYSTEM'
    );
};


export default pluginLoader;
