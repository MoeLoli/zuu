/*
 * @Author: Jin
 * @Date: 2021-02-07 00:39:10
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 00:40:34
 * @FilePath: /api/src/utils/parsePrefix.js
 */
import path from 'path';

export default (filename = __filename) => {
    const pathParse = path.parse(filename);
    const filePath = (pathParse.dir).substr((pathParse.dir).indexOf('/routes') + 7, (pathParse.dir).length) || '/';
    const fileName = pathParse.name;
    let ret;

    if (fileName.toLocaleLowerCase() === 'index') {
        ret = filePath;
    } else {
        ret = `${filePath}/${fileName}`;
    }

    return ret;
};
