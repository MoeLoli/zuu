/*
 * @Author: Jin
 * @Date: 2020-09-24 14:13:23
 * @LastEditors: Jin
 * @LastEditTime: 2020-11-04 19:18:20
 * @FilePath: /zuu/src/loaders/plugin.js
 */
import fs from "fs";
import util from "util";
import path from "path";

import logger from "./logger";
import * as hook from "./hook";

export default async ({ app }) => {
    let plugins = fs.readdirSync(path.join(__dirname, "../plugins"));
    plugins = plugins.filter((value) => value != ".gitkeep");
    plugins = plugins.map((value) => {
        return {
            pcn: value.toLocaleUpperCase(),
            path: path.join(__dirname, "../plugins/") + value + "/plugin.js",
        };
    });
    plugins = plugins.filter((value) => fs.existsSync(value.path));

    plugins.forEach((value, index, array) => {
        array[index].object = new (require(value.path).default)();
    }, this);

    let pluginNum = plugins.length;

    plugins.forEach((value, index, array) => {
        const pluginEnv = { hook, logger };
        Object.assign(value.object, pluginEnv);


        if (typeof value.object.install !== "undefined") {
            value.object.install.apply(value.object, []);
        }

        if (typeof value.object.uninstall !== "undefined") {
            value.object.uninstall.apply(value.object, []);
        }

        if (typeof value.object.activate !== "undefined") {
            value.object.activate.apply(value.object, []);
        }

        if (typeof value.object.deactivate !== "undefined") {
            value.object.deactivate.apply(value.object, []);
        }

        logger.success(`Plugin [${value.pcn}] has been loaded`, "PLUGIN");
    }, this);

    logger.info(
        util.format(
            `%d ${pluginNum == 1 ? "plugin" : "plugins"} have been loaded`,
            pluginNum
        ),
        "SYSTEM"
    );
};
