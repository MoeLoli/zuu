/*
 * @Author: Jin
 * @Date: 2021-02-07 22:15:10
 * @LastEditors: Jin
 * @LastEditTime: 2021-02-07 22:25:20
 * @FilePath: /api/src/loaders/service.js
 */
export default ({ app }) => {
    require('@/services').default({ koa2App: app });
}
