/*
 * @Author: Jin
 * @Date: 2020-09-24 13:28:12
 * @LastEditors: Jin
 * @LastEditTime: 2020-10-03 00:17:51
 * @FilePath: /zuu/src/loaders/hook.js
 */
import { zuu } from './global';

let hook = zuu.hook ? zuu.hook : {};
zuu.hook = hook;

export const register = (hookname, param = null) => {
    let config = {};
    if (!hook[hookname]) {
        hook[hookname] = [];
    }

    if (param && typeof param !== 'object') {
        param = [param];
    }

    if (param.length != 1) {
        if (typeof param[0] === 'object' && typeof param[1] === 'function') {
            config = {
                this: param[0],
                func: param[1]
            }
        }
    } else if (param.length === 1 && typeof param[0] === 'function') {
        config = {
            func: param[0]
        }
    } else {
        return false;
    }

    hook[hookname].push(config)

    return hook[hookname];
}

export const trigger = (hookname, param = null) => {
    let param_tmp;

    if (param && typeof param !== 'object') {
        param = [param];
    }

    if (hook[hookname]) {
        hook[hookname].forEach(hook_d => {
            if (hook_d['this']) {
                param_tmp = hook_d['func'].apply(hook_d['this'], param);
            } else {
                param_tmp = hook_d['func'].apply(null, param);
            }
        });

        if (param_tmp && typeof param_tmp == 'object') {
            param = param_tmp;
        } else {
            param = [param_tmp];
        }

        if (param.length == 1) {
            param = param[0];
        }

        return param;
    }
}