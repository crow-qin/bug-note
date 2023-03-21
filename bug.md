## w

=d4-0408=

### bug: win7 下载 node-sass 失败

安装 python2.7

_0524 update_
[新的失败](#a0524_1)

### tip: file 对象重命名

file 是只读文件，重命名需要创建新的对象

```javascript
// file 原文件； newFileName 新文件名
const renameReportFile = new File([file], newFileName, {
  type: file.type,
});
```

## w

=d2--0511=

### bug: vue-cli3 打包常见问题

q: vue-cli3 打包后报错
a: 在 vue.config.js 添加 publicPath: './'

q: vue-cli3 打包后空白
a: 在 route/index.js 修改
将 history 模式改成 hash 模式

route/index.js

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
.....
const router = createRouter({
history: createWebHashHistory(process.env.BASE_URL),
routes
})
export default router
```

history 模式需要服务器将'404'(无法匹配路径)配置为你的 index 页面，所以自己做的话还是不要用 history 模式。

## w

=d3--0512=

### bug: navicat5.7 版本连接 mysql8.0 以上会报 1251 错误

q: navicat5.7 版本连接 mysql8.0 以上会报 1251 错误
a: 链接加密方式已经改变 需要修改

1. 进入账号

```javascript
mysql -u root -p
```

2. 输入密码
3. 修改加密方式

```cmd
mysql> alter user 'root'@'localhost' identified by 'password' password expire never;
```

4. 修改密码

```cmd
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '新密码';
```

5. 刷新

```cmd
mysql> flush  privileges;
```

mysql 命令

```cmd
net stop mysql
net start mysql
```

## w

=d5--0521=

### bug: typeScript @types/webpack/index.d.ts 报错

a: tsconfig.json 设置

```json
"compilerOptions": {
"skipLibCheck":true
}
// 忽略所有的声明文件（ *.d.ts）的类型检查
```

## w

=d1--0524=

### <div name="a0524_1">bug: node-sass 下载失败</div>

a: 这次是由于 node 版本与 node-sass 版本不兼容，本机 node13.9， 需要安装 node-sass4.13+
具体版本兼容可以查看 github 上的 node-sass

## w

=d1--0705=

### bug: 小程序的 textarea 设置 auto-height，再设置 min-height，ios 上的高度与设置的值不一致

a: textarea 设置 :disableDefaultPadding="true"，去掉 iOS 下的默认内边距，2.10.0 版本支持了

=d2--0707=

### bug: ios 小程序在 scroll-view 上会出现抖动

a: 因为 scroll-view 添加了 scroll 事件，且直接将滚动条的位置赋值给了 scrollTop 的变量 目前去掉 scroll 事件就不会出现

## w

=d3--0714=

### bug: vite + webworker + spark-md5 实现文件切片上传出现的一些问题

1. webworker 在引入时需要从根路径开始写
   不然就写在根路径上

2. worker 文件引入第三方库无法使用 import 导入
   直接导入会报错 找不到模块
   使用 self.importScripts()

## w

=d1--0719=

### bug: webpack 搭建项目时报错

q: in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance  
a: 入口文件大于 244kb 影响项目性能
webpack.config.js 增加

```javascript
performance: {
  hints: false;
}
```

=d5--0723=

### bug: webpack5.x 使用 webpack-dev-server 无法使用 webpack-dev-server 命令启动服务

webpack5 后不再以 webpack-dev-server 启动服务器
新的启动命令

```text
webpack server
```

=d2--0727=

### bug: hard-source-webpack-plugin 在 webpack5 中无法使用

a: webpack5 已经内置了模块缓存，不需要再使用此插件
可以使用 webpack 的 cache

可以给一些 loader 开 cacheDirectory
cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 Webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程。设置空值或者 true 的话，使用默认缓存目录

```javascript
...
use: [
  {
    loader: 'bobel-loader',
    options: {
      cacheDirectory: true
    }
  }
]
```

或者使用 cache-loader
把它放在需要缓存的 loader 前面就行

```javascript
loader: ['cache-loader', 'babel-loader'],
```

## w

=d2--0803=

### bug: uni-app uni-popup 弹窗内无法滑动

a: uni-popup 组件中的滑动事件被禁止冒泡了，去掉@touchmove.prevent="clear" 即可  
update: 0804 一定要去掉， 在 clear 方法进行判断也不行

### bug: element 的 el-tree 使用@check-change 事件多次触发

a: 当点击选择框选中状态改变的时候，如果有多级子节点，那就会触发多次（因为子节点的选中状态也被改变）  
**解决方法**  
把 check-change 事件改为 check 事件，只有当点击复选框的时候才会触发

=d3--0804=

### bug: 小程序在 ios 上的回弹问题

a: 对于不需要滑动的页面在 page.json 中对应页面添加 disScroll: true

```json
"style": {
  "disScroll": true
}
```

对于需要滑动的页面 滑动部分用 scroll-view 等进行模拟，将这个页面固定高度
在 page.json 中对应页面增加 disScroll: true

=d4--0805=

### bug: uni 小程序 在 ios 上 textarea 的 placeholder 文字顶部有部分被遮挡

a: 可能是 disableDefaultPadding="true" auto-height="true" 设置了最小高度
把 disableDefaultPadding, auto-height min-height 去掉大概可以

## w

=d2--0810=

### bug: vue-cli@4.5.13 创建的 vue3 + ts + element 在设置自定义主题时报错

错误提示  
Invalid CSS after "$--colors: map": expected expression (e.g. 1px, bold), was ".deep-merge("
a: 已经下载 node-sass sass-loader，需要下载 sass

```cmd
npm i sass -D
```

## w

=d1--0816=

### bug: sass 报错 math.div(100, 2) undefined function

a: math.div 在 sass@1.33.0 才有
下载大于等于 1.33.0 版本的 sass 就可以了

=d2--0817=

### bug: vue3 + ts 报错 cannot convert object to primitive value

a: 变量名和组件的 ref 命名重复了

=d3--0818=

### bug: ts 使用 js 文件报错 Vue typeScript： Could not find a declaration file for module '**_'. '_**' implicitly has an 'any'

tsconfig.json 文件中在 compilerOptions 中添加 "noImplicitAny": false

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    ...
    ...
  }
}
```

### bug: 在 vue 中使用\_this = this,报错 Unexpected aliasing of 'this' to local variable @typescript-eslint/no-this-alias

a: 原因是 eslint 为了防止 this 变量和局部变量混淆（大概吧）

解决方法：在.eslintrc.js 中的 rules 添加 "@typescript-eslint/no-this-alias": ["off"]

=d4--0819=

### bug: vue3 + ts 组件通信报警告 [Vue warn]: Extraneous non-emits event listeners (confirm) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option

a: 声明下自定义事件名称即可
emits: ['confirm']

=d5--0820=

### bug: vue3+element-plus 设置中文无效
**简述：**
在 main.ts 设置无效

```ts
// ! element-plus vue3.0
import element from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn"; //中文
import locale from "element-plus/lib/locale/lang/zh-cn"; //中文

createApp(App).use(router).use(element, { locale }).mount("#app");
```

在 App.vue 设置生效

```vue
<template>
  <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider>
</template>
<script>
//引入vue方法
import { ElConfigProvider } from "element-plus";
//中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
//引入自定义方法
//引入自定义组件
export default {
  name: "ZhProvider",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    let locale = zhCn;
    return {
      locale,
    };
  },
};
</script>
```

element-plus 的版本在 1.0.2-beta.59 前的可以用第一种方式设置，之后的需要用第二种
本文使用的版本为 1.0.2-beta.70

## bcy

## w

=d2--1207=

### 报错 ERROR in static/js/17.3fae6d307c54ea28dc4d.js from UglifyJs Unexpected token: name (OpenElementStack) [./~/parse5/lib/parser/open-element-stack.js:122,0][static/js/17.3fae6d307c54ea28dc4d.js:3235,6]

报错的原因大概是报错的第三方库中有用到 es6 以上的语法 
在 build 文件夹中的 webpack.base.conf.js 中

```js
{
  test: /\.js$/,
  loader: "babel-loader",
  include: [
    resolve("node_modules/parse5"),
  ]
}
```

### 父元素设置 pointer-events: none; 子元素 textarea 文字内容超过高度 无法滑动查看

在 textarea 加上 pointer-events:auto; 样式 再加上 disabled="true"
把 disabled 的样式修改一下

## w

=d5--1231=

### window.pint() 问题

1. 打印溢出  
   设置 css 样式  
   横向打印 @page { size: landscape; }

   纵向打印 @page { size: portrait; }

   A3 规格打印 @page { size: A3; }

   ```stylus
   @media print {
     @page {
       size: A4 landscape;
       margin: 0mm;
     }
     >>>.page {
       transform: scale(0.95, 0.95);
     }
   }
   ```

   还可以用 scale 缩小

2. disabled 的元素出现边框  
   用 point-event: none; cursor: not-allowed; 代替

=d3--0316=

### 谷歌火狐打印背景色丢失

css添加一下样式

```css
/* webkit 为Google Chrome、Safari等浏览器内核 */
-webkit-print-color-adjust: exact;
print-color-adjust: exact;
color-adjust: exact;
```

### at-rule or selector expected css(css-rule or selector expected)

在样式穿透>>>前面加上通配符*即可

> *>>>

## w

=d2--0927=

### printing 打印 ant-table 会出现间隔过大的问题

a:
ant-table 在打印时 .ant-spin-nested-loading 的高度默认 100%  
设置 ant-spin-nested-loading 的 height 可以解决该问题

**关键代码**

```tsx
printing(ref, {
  injectGlobalCss: true,
  scanStyles: false,
  css: `
    .ant-spin-nested-loading {
      height: auto !important;
    }
  `
}
```

# 2023

## w

=d5-0217=

### table td 在低版本设置宽度无效
**简述：**  
td 在低版本的浏览器里设置了宽度，但是没有起作用  
**方法：**  
在 table 中设置 <colgroup>
```html
<table>
  <colgroup>
    <col width="10%" />
    <col width="20%" />
  </col>
  <tbody>
    <tr>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
```

=d3-0222=

### table 内容超过最大宽度导致出现横向滚动

**简述：**  
table 的内容过长，超出了可视窗口的宽度，table 被撑开导致出现了横向滚动

**方法：**  
在 table 中增加以下样式
```css
table {
  width: 100%;
  word-break: break-all;
  table-layout: fixed;
}
```

## w

=d3-0315=

### el-input 自动聚焦问题

**简述**
在弹框显示时自动聚焦到el-input上，使用focus方法，但是一直报错  
<font color=red>this.$refs.ipt.focus is not a Function</font>  
原代码如下