/*
 * @Author: Jin
 * @Date: 2018-06-21 15:19:06
 * @LastEditors: Jin
 * @LastEditTime: 2020-02-18 19:45:58
 * @FilePath: /Server/src/utils/response.js
 */
const format = (status = 'success', msg) => {
    const data = status === 'success' ? {} : { error: msg };
    return {
        status,
        data
    };
};

module.exports = format;
