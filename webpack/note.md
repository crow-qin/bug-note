# 2023

## w

=d4-0309=

### cdn 加速

**简述**  
cdn 内容分发网络  
引用一个库，不想让 webpack 打包，又希望可以全局使用该第三方库，可以使用 externals  
可以减少打包内容，通过资源服务器就近选择 cdn 的包

**方法**

1. **配置 externals**  
   在 webpack 配置文件中添加 externals，再在 index.html 中用 script 引入对应的远端包  
   externals 的 key 为库名，value 为全局导出的名字

```js
// webpack.base.config.js
...
externals: {
  vue: Vue
}
...
```

```html
...
<head>
  <script src="https://lib.baomitu.com/vue/2.6.12/vue.min.js"></script>
</head>
...
```

2. **使用 html-webpack-externals-plugin**  
   下载该插件

   > npm i html-webpack-externals-plugin -D

   在配置文件中配置插件

   ```js
    // webpack.config.js
    ...
    plugins: [
      new HtmlWebpackExternalsPlugin({
        externals: [{
          module: 'vue',
          entry: 'https://lib.baomitu.com/vue/2.6.12/vue.min.js',
          global: 'Vue'
        }]
      })
    ]
   ```

打包后的项目会自动在 html 文件上用 script 引入 entry

webpack 版本 4.46.0

=d2-0321=

### 配置 mode 环境

ps: 当前 webpack 版本 5.76.0

**方法：**

1. 使用命令行配置  
   _运行_

   > webpack server --mode development

   _打包_

   > webpack --mode production

2. 通过不同的配置文件来设置

   ```js
   // /webpack.dev.config.js
   module.exports = merge(common, {
    mode: 'development',
    ...
   })
   ```

   _运行_
   
   > webpack server --config ./webpack.dev.config.js

**问题；**  
获取 process.env.NODE_ENV 会有区别, webpack 配置文件上获取到值，在其他文件中可以获取到

process.env.NODE_ENV 是通过 webpack 配置挂载上去的，因此在配置文件中获取不到

可以提前设置 NODE_ENV 再执行 webpack 命令，这样配置文件中也能获取到

但是在不同平台上设置的命令不同，可以下载 **cross-env** 来统一命令差异

**下载：**

> npm install cross-env -D

**执行以下命令：**  


> cross-env NODE_ENV=development webpack server
