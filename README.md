# redis-snowflake-id-generator

> 基于 [redis-snowflake-id](https://github.com/hpyer/redis-snowflake-id)，使用 `koa2` 搭建的发号器服务

### 运行

```shell
node app.js
```

### 接口

#### 生成id

* 接口地址：`/next`
* 请求方式：GET
* 请求参数：
  * `machineId` integer 机器id（业务id），可选值：0~255，默认：0
* 返回值：
  ```js
  {
    // 是否成功
    "success": true,
    // 错误代码
    "code": "",
    // 错误描述
    "message": "",
    // 返回数据
    "data": "1094780791168204808"
  }
  ```

#### 解析id

* 接口地址：`/parse`
* 请求方式：GET
* 请求参数：
  * `id` string 通过生成接口获取的id
* 返回值：
  ```js
  {
    // 是否成功
    "success": true,
    // 错误代码
    "code": "",
    // 错误描述
    "message": "",
    // 返回数据
    "data": {
      // id生成时的时间戳
      "timestamp": 1561003966329,
      // 机器id
      "machineId": 0,
      // 计数
      "count": 68}
  }
  ```
