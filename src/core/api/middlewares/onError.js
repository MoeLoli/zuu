/*
 * @Author: Jin
 * @Date: 2020-09-24 08:37:55
 * @LastEditors: Jin
 * @LastEditTime: 2020-09-24 19:09:39
 * @FilePath: /Server/src/api/middlewares/onError.js
 */
import logger from '@/core/utils/logger';

import format from '@/core/api/decorators/response';
import { HttpError, CustomError } from '@/core/api/decorators/customError';

export default (ctx, next) => {
    return next().catch((err) => {
        const code = 500;
        let msg = 'Unknown error';

        if (err instanceof CustomError || err instanceof HttpError) {
            const res = err.getCodeMsg();
            ctx.status = (err instanceof HttpError) ? res.code : Number(String(res.code).substring(0, 3));
            msg = res.msg;
        } else if (err.status === 401) {
            ctx.status = 401;
            msg = 'Authentication Error';
        } else {
            ctx.status = code;
            logger.error(err, 'SYSTEM');
        }
        logger.error(msg, 'SYSTEM');
        ctx.body = format('failure', msg);
    });
};
