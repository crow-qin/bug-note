# 2022
## w

=d2-0830=

### http-proxy-middleware安装报错：proxy is not a function

0.x.x版本引用方式
```javascript
var proxy = require('http-proxy-middleware')
```
1.x.x引用方式
```javascript
var { createProxyMiddleware } = require('http-proxy-middleware')
```

### 升级到 webpack4.46.0

#### 图片不显示 src显示 "[object Module]"

在 url-loader的options上添加esModule: true
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
#### new webpack.optimize.CommonsChunkPlugin 替换为 optimization的splitChunks

#### new webpack.optimize.UglifyJsPlugin 替换为 optimization 的 minimizer

#### 简化控制台信息
增加stats对象
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

