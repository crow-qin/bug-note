# 2022

## w

=d2-0830=

### http-proxy-middleware 安装报错：proxy is not a function

0.x.x 版本引用方式

```javascript
var proxy = require("http-proxy-middleware");
```

1.x.x 引用方式

```javascript
var { createProxyMiddleware } = require("http-proxy-middleware");
```

### 升级到 webpack4.46.0

#### 图片不显示 src 显示 "[object Module]"

在 url-loader 的 options 上添加 esModule: false

```javascript
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: "url-loader",
  options: {
    // 新增
    esModule: false,
    limit: 2097152,
    name: utils.assetsPath("img/[name].[hash:7].[ext]")
  }
},
```

#### new webpack.optimize.CommonsChunkPlugin 替换为 optimization 的 splitChunks

分包替换功能

#### new webpack.optimize.UglifyJsPlugin 替换为 optimization 的 minimizer

压缩替换功能

#### 简化控制台信息

增加 stats 对象

```javascript
stats: {
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false,
  assets: false,
  moduleAssets: false
},
```

# 2023

## w

=d2-0307=

### sass-loader 识别不了/deep/

**简述**  
启动项目后，控制台报错，显示以下提示：  
<font color=red>SassError: expected selector. /deep/ ...</font>  
**方法**  
检查是否下载了”sass“依赖, 如果存在依赖

1. 可以指定 sass-loader 的语法为 <font color=red>node-sass</font>

```js
// 配置文件
module.exports = {
  module: {
    rules: [
      {
        test: /.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("node-sass"),
            },
          },
        ],
      },
    ],
  },
};
```

2. 将 <font color=red>/deep/</font> 改成 <font color=red>::v-deep</font>

**原因**  
sass 只能识别 <font color=red>::v-deep</font>  
node-sass 可以识别 <font color=red>/deep/</font> 和 <font color=red>::v-deep</font>

查看源码 sass-loader 的入口文件调用了 **getSassImplementation** 方法

```js
// /index.js
async function loader(content) {
  const options = (0, _loaderUtils.getOptions)(this);
  (0, _schemaUtils.validate)(_options.default, options, {
    name: "Sass Loader",
    baseDataPath: "options"
  });
  const callback = this.async();
  const implementation = (0, _utils.getSassImplementation)(this, options.implementation);
...
}
```

**getSassImplementation**在 options 中没有 implementation 时会调用**getDefaultImplementation**

```js
// /utils.js
function getSassImplementation(loaderContext, implementation) {
  let resolvedImplementation = implementation;

  if (!resolvedImplementation) {
    try {
      resolvedImplementation = getDefaultSassImplementation();
    } catch (error) {
      loaderContext.emitError(error);
      return;
    }
  }
  ...
}
```

getDefaultImplementation 默认先使用 sass，查找不到后才使用 node-sass

```js
function getDefaultSassImplementation() {
  let sassImplPkg = "sass";

  try {
    require.resolve("sass");
  } catch (error) {
    try {
      require.resolve("node-sass");

      sassImplPkg = "node-sass";
    } catch (ignoreError) {
      sassImplPkg = "sass";
    }
  } // eslint-disable-next-line import/no-dynamic-require, global-require


  return require(sassImplPkg);
}
sass版本 1.32.6 有效
如果是版本 1.58.3 会提示 >>> 深度选择器警告
```

=d4-0309=

### source-map 用 onerror 定位错误时，直接打开打包后的 index.html 报错信息显示不完整

**简述**  
source-map 用 onerror 定位错误时，直接打开打包后的 index.html 报错信息显示不完整，msg 显示 Script error  
_打开路径_

> file:///Users/xx/codeSpace/sourcemap-front/dist/index.html

当前显示的错误信息

```js
{
  "msg": "Script error.",
  "url": "",
  "row": 0,
  "col": 0
}
```

**方法**  
把打包后的文件放到 nginx 上，用 nginx 配置地址去请求  
正确地址

> http://localhost:8082/

显示的错误信息

```js
{
    "msg": "Uncaught ReferenceError: a is not defined",
    "url": "http://localhost:8082/index.js",
    "row": 1,
    "col": 229,
}
```

**原理**  
onerror
如果 A 网站使用 B（CDN） 域名下的 js 资源，但是 JS 执行报错了，浏览器只会给出 Script error 错误提示，不会有具体报错信息，原因是：浏览器的同源策略限制。
解决方案：

1. script 增加 crossorigin,
2. 服务端配置：Access-Control-Allow-Origin: b.com
3. 代码劫持后重写
