/*
 * @Author: Jin
 * @Date: 2020-09-24 07:23:56
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 00:47:46
 * @FilePath: /api/src/config/index.js
 */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const loadEnv = (mode) => {
    const basePath = path.resolve(
        process.cwd(),
        `.env${mode ? `.${mode}` : ""}`
    );
    const localPath = `${basePath}.local`;
    const load = (path) => {
        if (!fs.existsSync(path)) return;
        const env = dotenv.config({ path, debug: process.env.DEBUG });
        dotenvExpand(env);
    };
    load(localPath);
    load(basePath);

    if (mode) {
        const shouldForceDefaultEnv = true;
        const defaultNodeEnv =
            mode === "production" || mode === "test" ? mode : "development";
        if (shouldForceDefaultEnv || process.env.NODE_ENV == null) {
            process.env.NODE_ENV = defaultNodeEnv;
        }
    }
};

const mode = process.env.NODE_ENV || "development";
if (mode) {
    loadEnv(mode);
}
loadEnv();

export default {
    port: parseInt(process.env.PORT, 10) || 3000,
    telegram: {
        enabled: process.env.TELEGRAM_BOT_ENABLED === 'true' || false,
        token: process.env.TELEGRAM_BOT_TOKEN,
        master: process.env.TELEGRAM_MASTER
    },
    http_proxy: process.env.HTTP_PROXY,
};
