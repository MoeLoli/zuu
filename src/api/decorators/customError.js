/*
 * @Author: Jin
 * @Date: 2018-06-21 15:19:06
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 13:10:34
 * @FilePath: /Server/src/decorators/customError.js
 */
const util = require('util');
const ERROR_MSG = require('./errorMsg');
const constants = require('./constants');

const HTTP_CODE = constants.HTTP_CODE;

function CustomError (code, msg) {
    Error.call(this, '');

    this.code = code;
    this.msg = msg || ERROR_MSG[code] || 'Unknown error';

    this.getCodeMsg = function () {
        return {
            code: this.code,
            msg: this.msg
        };
    };
}
util.inherits(CustomError, Error);

function HttpError (code, msg) {
    if (Object.values(HTTP_CODE).indexOf(code) < 0) {
        throw Error('Not an invalid http code');
    }
    CustomError.call(this, code, msg);
}
util.inherits(HttpError, CustomError);

module.exports = {
    HttpError,
    CustomError
};
