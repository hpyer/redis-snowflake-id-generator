'use strict';

const Koa = require('koa');
const RedisSnowflakeId = require('redis-snowflake-id');

const PORT = 8888;

let app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.url == '/favicon.ico') {
    next();
    return false;
  }

  let options = {
    // redis 配置，详见 https://www.npmjs.com/package/redis
    redis: {
      host: '127.0.0.1',
    },
    // 世纪，用于减少生成的id数字大小，单位：毫秒，如：1300000000000
    epoch: 1300000000000,
    // redis 的hash键名
    hash_key: 'REDIS_SNOWFLAKE_ID',
  };
  let idgen = new RedisSnowflakeId(options);

  ctx.type = 'text/javascript';
  if (ctx.request.url.substr(0, 5) == '/next') {
    let machineId = parseInt(ctx.request.query.machineId || 0);
    if (machineId <= 0) machineId = 0;

    let id = await idgen.next(machineId);
    ctx.body = `{"success":true,"code":"","message":"","data":"${id}"}`;
  }
  else if (ctx.request.url.substr(0, 6) == '/parse') {
    let id = ctx.request.query.id || '';
    if (!(id + '').match(/^\d+$/i)) {
      ctx.body = `{"success":false,"code":"invalid_id","message":"无效id","data":""}`;
      return false;
    }

    let data = await idgen.parse(id);
    ctx.body = `{"success":true,"code" "","message":"","data":${JSON.stringify(data)}}`;
  }
  else {
    ctx.body = `{"success":false,"code":"invalid_action","message":"未知任务","data":""}`;
  }
});

app.listen(PORT, () => {
  console.log('IdGen server running at http://localhost:' + PORT);
});
