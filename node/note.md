# 2021

## w

=d1--0512=

### tip: node.js的 fs 常用函数

1. 查询文件是否存在

```javascript
fs.access(${文件路径}, fs.constants.F_OK, (err) => {
  if (err) return
  // 文件存在
})
```

2. 删除文件

```javascript
fs.unlink(${文件路径}, callback)
```

## w

=d1--1213=

### node获取命令行参数

**process.argv**

package.json的脚本
```json
"script": {
  "dev": "node build/dev-server.js",
  "start": "npm run dev",
}
```
运行脚本 npm run dev

打印 process.argv

输出字符串数组

第一个是nodejs的绝对路径

第二个是dev对应文件的绝对路径

[
  '/Users/qinan/.nvm/versions/node/v12.13.0/bin/node',
  '/Users/qinan/workspace/niswhite/build/dev-server.js'
]

**process.env**

*npm_config_可以直接获取参数*

npm run dev --directive

```js
console.log(process.env.npm_config_directive)
```
输出true

npm run dev --directive=123
```js
console.log(process.env.npm_config_directive)
```

输出123

**process.env.npm_config_argv获取多个参数**

npm run dev --directive=123
```js
console.log(JSON.parse(process,env,npm_config_argv))
```
输出
```js
{
  remain: [],
  cooked: [ 'run', 'dev', '--directive', '123' ],
  original: [ 'run', 'dev', '--directive', '123' ]
}
```
