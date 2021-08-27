## w
=d3-1202=
### 阿里云的云效，第一次拉取代码，会提示输入账号密码
账号是云效的 username ，密码是私人令牌 
第一次拉取没有私人令牌，需要忘记令牌，修改令牌，令牌格式全数字8位以上
accentrix 云效令牌：1-9
# =2021=
## w
=d1-0222=
### tip: vue3.x 弃用了 $listeners
1. vue2.x 语法

  在 Vue2 中，你可以使用 this.$attrs 和 this.$listeners 分别访问传递给组件的 attribute 和事件监听器。结合 inheritAttrs: false，开发者可以将这些 attribute 和监听器应用到其它元素，而不是根元素：
```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" v-on="$listeners" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

2. vue3.x语法

  在 Vue 3 的虚拟 DOM 中，事件监听器现在只是以 on 为前缀的 attribute，这样就成了 $attrs 对象的一部分，因此 $listeners 被移除了。
```vue
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
    inheritAttrs: false
}
</script>
```

=d3-0224=
### tip: nvm 下载
1. 下载地址 https://github.com/coreybutler/nvm-windows/releases

  下载第三个 nvm-setup.zip
  按要求安装

2. 测试 命令行输入 nvm 输出 nvm 相关命令即是成功
  
3. 配置淘宝镜像

  nvm 下载 node 版本使用的是外国的服务器 可能会比较慢
  配置方法：
  打开 nvm 的安装目录
  打开 setting.txt
  加入以下内容
```txt
arch: 64 
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
4. 安装 node

  nvm install 版本号
```cmd
nvm install v14.16.0 | nvm install 14.16.0
```
tip: 一定要等到下载完再关闭
Installation complete 代表nodejs安装完成

5. 切换 node

  nvm use 版本号
  nvm 部分命令
  查看已下载 node 版本
```cmd
nvm ls
```
查看当前版本
```cmd
nvm list
```

## w
=d2--0302=
### tip: vue 的 render 函数
```javascript
Vue.component('renderComponent', {
  props: {

  },
  render: () => {
    return h('div', {}, '12');
  }
})
```
1. h 在 vue 中通常作为 createElement 的别称

  **h 函数**
  第一个参数 (String | Object | Function)  
  第二个参数 (Object) 元素的属性
  第三个参数 (String | Array) 文本内容, 或者是子元素 render 函数组成的数组

如果觉得太麻烦可以使用插件 通过 jsx 语法来书写

2. 下载插件
```cmd
yarn add -D @vue/babel-plugin-jsx
```
在 babel.config.js 配置
```javascript
module.exports = {
  // 这是原来的预设，cli 搭建项目就有的
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 需要配置的插件
  plugins: ['@vue/babel-plugin-jsx']
}
```

3. 编写代码
```javascript
Vue.component('render-component', {
  render() {
    return (
      <div>h1</div>
    )
  }
})
// 或者
components: {
  renderComponent : {
    render() {
      return (
        <div>h1</div>
      )
    }
  }
}
```

构建一个 jsx 文件
```jsx
import { defineComponent, ref } from 'vue'

const Demo = defineComponent({
  name: 'demo',
  setup (props) {
    const input = ref(null)

    const click = (e) => {
    console.log(e)
    console.log(input.value)
    }
    return {
      click,
      input
    }
  },
  render () {
    return (
    <>
      <div>test</div>
      <button onClick={this.click}>点击</button>
      <input v-model={this.input} placeholder="啊这"/>
    </>
    )
  }
})

export default Demo
```
使用 defineComponent()，可以获得代码提示

=d4--0304=
### tip: vue-cli4 使用 imports-loader@1.2.0
直接下载的最新版 2.0.0 适用于 webpack5, 使用会报错
可以将 imports-loader 降级

## w
=d2--0309=
### tip: pdfKit 不写 x, y, 文本默认接在上个节点下面
```javascript
doc.text('123', {})
doc.text('345', {})
```

## w
=d5--0319=
### tip: 快速生成数组
```javascript
//实现方法一：循环赋值
var arr1 = new Array(100);
for(var i=0;i<arr1.length;i++){
arr1[i] = i;
}
console.log(arr1);

//实现方法五：
var arr5 = Object.keys(Array.apply(null, {length:100})).map(function(item){
  return +item;
});
console.log(arr5);

//实现方法六：
var arr6 = Array.from({length:100}, (v,k) => k);
console.log(arr6);

//实现方法七：
var arr7 = Array.from(Array(100), (v,k) =>k);
console.log(arr7);

//实现方法八：
var arr8 = new Array(100).keys();
console.log(Array.from(arr8));

//实现方法十：
var arr = [];
var i = 0;
function MakeArray(num){
  if(i<num){
    arr[i] = i++;
    MakeArray(num);
  }
  return arr;
}
console.log(MakeArray(100));

//实现方法十一：
var arr11 = new Array(100).toString().split(',').map(function(item,index){
return index;
});
console.log(arr11);
```

## w
=d2--0323=
### tip: vue使用jsx
安装@vue/perset-jsx
可以使用冒号
下划线连接修饰符
ex: vOn:click_once

## w
=d4-0408=
### bug: win7下载node-sass失败
安装python2.7

*0524 update*
[新的失败](#a0524_1)

### tip: file对象重命名
file是只读文件，重命名需要创建新的对象
```javascript
// file 原文件； newFileName 新文件名
const renameReportFile = new File([ file ], newFileName, {
  type: file.type
});
```

## w
=d2--0413=
cross-env 是一个跨平台设置和使用环境变量的脚本

npm-script

## w
=d2--0420=
### tip：git暂存文件
git add -A  提交所有变化
git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

## w
=d2--0511=

### bug: vue-cli3 打包常见问题

q: vue-cli3打包后报错
a: 在vue.config.js 添加publicPath: './'

q: vue-cli3打包后空白
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
history模式需要服务器将'404'(无法匹配路径)配置为你的index页面，所以自己做的话还是不要用history模式。

=d3--0512=
### tip: Nginx 代理本地打包项目
打开 Nginx 安装路径下的 conf/nginx.conf
```conf
server {
  listen       8100;
  server_name  localhost;
  location / {
      root   /test/v3/vue3_demo/dist;
      index  index.html index.htm;
      proxy_pass 127.0.0.1:3000;
  }
}
```

按需求在 server 增加对应的端口 域名
location root 在/路径时需要显示的项目路径
index 需要显示的 html
proxy_pass 代理转发 所有以 localhost 及 8100 端口发送的请求 都会转到 127.0.0.1:3000 出来
即后台项目的地址

修改后重启 Nginx 配置
```cmd
nginx -s reload
```

如果nginx服务没有启动 先启动再重启配置
```cmd
start nginx
```

在hosts文件添加上对应的IP和域名
```hosts
127.0.0.1 localhost
127.0.0.1 www.testing.com
```
archive.js 用于文件压缩

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
*mysql 常用账号密码*
mysql root root

### bug: navicat5.7版本连接mysql8.0以上会报1251错误
q: navicat5.7版本连接mysql8.0以上会报1251错误
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

mysql命令
```cmd
net stop mysql
net start mysql
```

=d5--0514=
### tip: koa2 热更新
1. 下载nodemon
```cmd
npm i nodemon -S
```

2. 修改package.json
```json
"script": {
  "dev": "nodemon bin/www"
}
```

下载redis
菜鸟教程 http://www.runoob.com/redis/redis-install.html

## w
=d5--0521=
### bug: typeScript @types/webpack/index.d.ts报错
a: tsconfig.json 设置
```json
"compilerOptions": {
"skipLibCheck":true
}
// 忽略所有的声明文件（ *.d.ts）的类型检查
```

## w
=d1--0524=
### <div name="a0524_1">bug: node-sass下载失败</div>
a: 这次是由于 node 版本与 node-sass 版本不兼容，本机 node13.9， 需要安装 node-sass4.13+
具体版本兼容可以查看 github 上的 node-sass

=d4--0527=
### tip: rgb灰度化计算
一般公式: (R * 0.299 + G * 0.587 + B * 0.144)
rgb是整数，小数点计算可能会精度丢失
使用位运算
(R * 38 + G * 57 + B * 15) >> 7

### tip: vue3 getCurrentInstance方法只在开发环境中使用

## w
=d1--0705=
### bug: 小程序的 textarea 设置 auto-height，再设置min-height，ios上的高度与设置的值不一致.
a: textarea 设置 :disableDefaultPadding="true"，去掉 iOS 下的默认内边距，2.10.0版本支持了

=d2--0707=
### bug: ios小程序在scroll-view 上会出现抖动
a: 因为scroll-view 添加了scroll 事件，且直接将滚动条的位置赋值给了scrollTop的变量 目前去掉scroll事件就不会出现

### tip: 1000桶水，一桶有毒，猪喝水15分钟后有结果，一小时检查完需要多少头猪
00000 - 12444
5
00 10 20 30 40
01 11 21 31 41
02 12 22 32 03
04 13 23 14 24

00 0----
41 0---1
22 0-2-1

## w

=d3--0714=

### bug: vite + webworker + spark-md5 实现文件切片上传出现的一些问题
1. webworker在引入时需要从根路径开始写
不然就写在根路径上

2. worker文件引入第三方库无法使用import 导入
直接导入会报错 找不到模块
使用 self.importScripts()

=d3--0715=

### tip：react 组件
无状态组件: 没有生命周期，没有状态，多用于展示数据，开销很小

*0729 update*
函数组件：返回一个函数作为组件
类组件：返回一个类作为组件，可以存在生命周期，也可以作为无状态组件
HOC（高阶组件）：组件返回一个组件

=d5--0716=
protobufjs 是一种数据转换，序列化的工具

## w
=d1--0719=
### bug: webpack 搭建项目时报错
q: in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance
a: 入口文件大于244kb 影响项目性能
webpack.config.js 增加
```javascript
performance: { hints: false }
```

=d2--0720=
### tip: react 的 slot
在组件插入标签 组件内部通过this.props.children 来展示
只有一个时 children为对象 当有多个时children为数组

单个插槽
```javascript
// Child
function Child(props) {
  return
  <div>{props.children}</div>
}
// parents
function Parent() {
  return
  <>
    <Child>
      <div>first<div>
    </Child>
  </>
}
```
多个插槽
```javascript
// Child
function Child(props) {
  return
  <div>
     {props.children[0]}
     {props.children[1]}
  </div>
}
// parents
function Parent() {
  return
  <>
    <Child>
      <div>first<div>
      <div>second</div>
    </Child>
  </>
}
```

=d5--0723=

### bug: webpack5.x 使用 webpack-dev-server 无法使用 webpack-dev-server 命令启动服务
webpack5 后不再以 webpack-dev-server 启动服务器
新的启动命令
```text
webpack server
```
*0729 update*
[HMR](#a0729_1)

### tip: webpack1.x ->2.x 中的更改：
module.loaders 改成了 module.rules
旧的 loader 配置被更强大的 rules 系统取代，后者允许配置 loader 以及其他更多项。
为了兼容旧版，module.loaders 语法被保留，旧的属性名依然可以被解析。
新的命名约定更易于理解并且是升级配置使用 module.rules 的好理由。

### tip: 了解 webpack 的 module
mudule 是对于不同的模块的处理规则。
module 的 rules 属性代表不同的处理规则。rules 是一个对象。
对象的属性有 test、use、exclude、include。
use 属性是对象数组。数组的话，是从后往前解析。

对象的参数为 loader/options。

1是2的简写形式。3是4的简写形式。

1. 
```javascript
module:{
  rules:[
  {
    test:/\.css$/,
    use:[
    "style-loader",
    "css-loader"
    ]
  }]
},
```

2. 
```javascript
module:{
  rules:[
    {
      test:/\.css$/,
      use:[{loader:"style-loader"},{loader:"css-loader"}]
    }
  ]
}
```

3. 
```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude:/node_modules/
},
```

4. 
```javascript
{
  test: /\.js$/,
  use[{loader: 'babel-loader'}],
  exclude:/node_modules/
},
```

总结：
  Rule.loader是Rule.use[ {loader} ]简写
  Rule.options是Rule.use[ {options} ]缩写

完整写法
```javascript
module: {
  rules:[
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {

        }
      }
    }
  ]
}
```

### tip: React 执行 setState后无法获取最新 state 数据，增加回调函数
```javascript
setState({}, () => {
  // 获取最新数据
})
```
*0727-update*
React 的 setState 函数并不是异步，只是在某些操作中没有立即更新
合成事件: React 为解决跨平台，兼容性问题， 将原生事件重新封装进行代理，如 onClick
总结: setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

链接：https://zhuanlan.zhihu.com/p/39512941


## w
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
loader: ['cache-loader', 'bobel-loader'],
```

*0729 update*
[HMR](#a0729_1)

### tip: export default 的弊端
esm: 指 es module, es6 的模块导入导出方法

**esm推荐的两种导入和三种导出方法**

```javascript
// 导出方式
export default 'hello world'; // default export
export const name = 'yj'; // named export
// 导入方式
import lib from './lib'; // default import
import * as lib from './lib'; // 
import { method1, method2 } from './lib';
```

**tip** webpack 或 babel 会将 esm 转换为 cjs
**tip** 不建议 export default 一个对象 除非是以配置文件进行导出
```javascript
// 错误用法
// lib.js
export default {
  a: 11,
  b: 2
}

import { a, b } from 'lib.js'
console.log(a)
```

对于字面量，单class，function，变量 可以使用 export default 进行导出，对于复合对象字面量包括数组，对象禁止使用

=d3-0728=

### tip: React Hook

适用于函数式组件
**useState**: 初始化state，简化setState
```javascript
const [value, setValue] = useState(0)
setValue(value + 1)
console.log(value) // 0
// 和setState一样在生命周期不会立即更新
```
**useEffect**: useEffect(()=> { Async Action }, ?[dependencies])  // 第二参数可选
1. 多个 useEffect 的回调 按先后顺序执行

2. useEffect 不带第二参数， 会在每次 render 后执行

3. useEffect 第二参数为空数组，只会在第一次 render 后执行
```javascript
useEffect(()=> {
  console.log('mount')
}, [])
```

4. useEffect 的第二个参数有依赖项，函数会在在依赖项发生变化时触发
```javascript
const [value, setValue] = useState(0)
useEffect(()=> {
  console.log(value)
}, [value])
useEffect(()=> {
  setValue(2)
}, [])
```

5. useEffect 第一个参数返回一个匿名函数， 相当于 componentUnMount 在组件卸载时触发
```javascript
useEffect(() => {
  return () => {
    consle.log('组件卸载')
  }
}, [])
```
**useContext**
跨组件共享数据的钩子函数
const myContext = useContext(context)
*content是React.createContext() 返回的对象*
```javascript
const MyContext = React.createContext()
// 父
function Parents() {
  return (
    <MyContext.Provider value={{name: '哈哈'}}>
      <Child/>
    </MyContext.Provider>
  )
}

function Child() {
  const { name } = useContext(MyContext)
  reurn <div>{name}</div>
}
```

**useReducer**
const [state, dispatch] = useReducer(reducer, initState)

```javascript
function reducer(state, action) {
  if (action.flag) {
    return { count: state.count + 1 }
  }
  return { count: state.count - 1 }
}
function DEMO() {
  const initState = { count: 1 }
const [state, dispatch] = useReducer(reducer, initState)
return (
  <div>
    <div>Count: {state.count}</div>
    <button onClick={dispatch(state, {flag: true})}>+</button>
  </div>
)}
```
*0729 update*

useMemo:
类似vue的computed 依赖项发生改变，会触发useMemo重新计算
const memorizedValue = useMemo(()=> { return a + 1 }, [a])

useMemo 会在 render 前执行
useMemo 没有依赖项的，每次渲染都会执行

=d4--0729=

<span name="a0729_1">**webpack5 的 HMR**</span>
下载 webpack-dev-server
在webpack.config.js 增加

```javascript
module.exports = {
  ...
  devServer: {
    host: 'localhost',
    post: 9090,
    host: true,
    // 开启hmr
  },
  cache: {
    // memory 是默认项
    type: 'filesystem', // 'filesystem | memory'
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  }
}
```
那个模块需要热重载就在那个模块写
一般在入口文件中写，不用考虑太多
index.js
```javascript
if(module.hot) {
  module.hot.accept()
}
```

markdown 的锚点写法
[跳转](#test)
<span name="test">目标位置</span>
在typora编辑完需要按住ctrl再单击才会跳转

### [关于三次握手和四次挥手](https://www.zhihu.com/question/271701044/answer/1935194322)

希望大家能带着如下问题进行阅读，收获会更大。

1. 请画出三次握手和四次挥手的示意图
2. 为什么连接的时候是三次握手？
3. 什么是半连接队列？
4. ISN(Initial Sequence Number)是固定的吗？
5. 三次握手过程中可以携带数据吗？
6. 如果第三次握手丢失了，客户端服务端会如何处理？
7. SYN攻击是什么？
8. 挥手为什么需要四次？
9. 四次挥手释放连接时，等待2MSL的意义?

#### 1. 三次握手

三次握手（Three-way Handshake）其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备。实质上其实就是连接服务器指定端口，建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。

刚开始客户端处于 Closed 的状态，服务端处于 Listen 状态。

进行三次握手：

第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN©。此时客户端处于 SYN_SEND 状态。

首部的同步位SYN=1，初始序号seq=x，SYN=1的报文段不能携带数据，但要消耗掉一个序号。

第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)。同时会把客户端的 ISN + 1 作为ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 SYN_REVD 的状态。

在确认报文段中SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y。

第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 ESTABLISHED 状态。服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接。

确认报文段ACK=1，确认号ack=y+1，序号seq=x+1（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号。

发送第一个SYN的一端将执行主动打开（active open），接收这个SYN并发回下一个SYN的另一端执行被动打开（passive open）。

在socket编程中，客户端执行connect()时，将触发三次握手。

![img](https://pic3.zhimg.com/50/v2-2a54823bd63e16674874aa46a67c6c72_720w.jpg?source=1940ef5c)

**1.1 为什么需要三次握手，两次不行吗？**

弄清这个问题，我们需要先弄明白三次握手的目的是什么，能不能只用两次握手来达到同样的目的。

第一次握手：客户端发送网络包，服务端收到了。

这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。

第二次握手：服务端发包，客户端收到了。

这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。

第三次握手：客户端发包，服务端收到了。

这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

因此，需要三次握手才能确认双方的接收与发送能力是否正常。

试想如果是用两次握手，则会出现下面这种情况：

> 如客户端发出连接请求，但因连接请求报文丢失而未收到确认，于是客户端再重传一次连接请求。后来收到了确认，建立了连接。数据传输完毕后，就释放了连接，客户端共发出了两个连接请求报文段，其中第一个丢失，第二个到达了服务端，但是第一个丢失的报文段只是在某些网络结点长时间滞留了，延误到连接释放以后的某个时间才到达服务端，此时服务端误认为客户端又发出一次新的连接请求，于是就向客户端发出确认报文段，同意建立连接，不采用三次握手，只要服务端发出确认，就建立新的连接了，此时客户端忽略服务端发来的确认，也不发送数据，则服务端一致等待客户端发送数据，浪费资源。

**1.2 什么是半连接队列？**

服务器第一次收到客户端的 SYN 之后，就会处于 SYN_RCVD 状态，此时双方还没有完全建立其连接，服务器会把此种状态下请求连接放在一个队列里，我们把这种队列称之为半连接队列。

当然还有一个全连接队列，就是已经完成三次握手，建立起连接的就会放在全连接队列中。如果队列满了就有可能会出现丢包现象。

这里在补充一点关于SYN-ACK 重传次数的问题：

服务器发送完SYN-ACK包，如果未收到客户确认包，服务器进行首次重传，等待一段时间仍未收到客户确认包，进行第二次重传。如果重传次数超过系统规定的最大重传次数，系统将该连接信息从半连接队列中删除。

注意，每次重传等待的时间不一定相同，一般会是指数增长，例如间隔时间为 1s，2s，4s，8s…

**1.3 ISN(Initial Sequence Number)是固定的吗？**

当一端为建立连接而发送它的SYN时，它为连接选择一个初始序号。ISN随时间而变化，因此每个连接都将具有不同的ISN。ISN可以看作是一个32比特的计数器，每4ms加1 。这样选择序号的目的在于防止在网络中被延迟的分组在以后又被传送，而导致某个连接的一方对它做错误的解释。

三次握手的其中一个重要功能是客户端和服务端交换 ISN(Initial Sequence Number)，以便让对方知道接下来接收数据的时候如何按序列号组装数据。如果 ISN 是固定的，攻击者很容易猜出后续的确认号，因此 ISN 是动态生成的。

**1.4 三次握手过程中可以携带数据吗？**

其实第三次握手的时候，是可以携带数据的。但是，第一次、第二次握手不可以携带数据

为什么这样呢?大家可以想一个问题，假如第一次握手可以携带数据的话，如果有人要恶意攻击服务器，那他每次都在第一次握手中的 SYN 报文中放入大量的数据。因为攻击者根本就不理服务器的接收、发送能力是否正常，然后疯狂着重复发 SYN 报文的话，这会让服务器花费很多时间、内存空间来接收这些报文。

也就是说，第一次握手不可以放数据，其中一个简单的原因就是会让服务器更加容易受到攻击了。而对于第三次的话，此时客户端已经处于 ESTABLISHED 状态。对于客户端来说，他已经建立起连接了，并且也已经知道服务器的接收、发送能力是正常的了，所以能携带数据也没啥毛病。

**1.5 SYN攻击是什么？**

服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击。

检测 SYN 攻击非常的方便，当你在服务器上看到大量的半连接状态时，特别是源IP地址是随机的，基本上可以断定这是一次SYN攻击。在 Linux/Unix 上可以使用系统自带的 netstats 命令来检测 SYN 攻击。

```text
netstat -n -p TCP | grep SYN_RECV
```

常见的防御 SYN 攻击的方法有如下几种：

- 缩短超时（SYN Timeout）时间
- 增加最大半连接数
- 过滤网关防护
- SYN cookies技术

#### 2. 四次挥手

建立一个连接需要三次握手，而终止一个连接要经过四次挥手（也有将四次挥手叫做四次握手的）。这由TCP的半关闭（half-close）造成的。所谓的半关闭，其实就是TCP提供了连接的一端在结束它的发送后还能接收来自另一端数据的能力。

TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，客户端或服务器均可主动发起挥手动作。

刚开始双方都处于 ESTABLISHED 状态，假如是客户端先发起关闭请求。四次挥手的过程如下：

第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态。

即发出连接释放报文段（FIN=1，序号seq=u），并停止再发送数据，主动关闭TCP连接，进入FIN_WAIT1（终止等待1）状态，等待服务端的确认。

第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态。

即服务端收到连接释放报文段后即发出确认报文段（ACK=1，确认号ack=u+1，序号seq=v），服务端进入CLOSE_WAIT（关闭等待）状态，此时的TCP处于半关闭状态，客户端到服务端的连接释放。客户端收到服务端的确认后，进入FIN_WAIT2（终止等待2）状态，等待服务端发出的连接释放报文段。

第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。

即服务端没有要向客户端发出的数据，服务端发出连接释放报文段（FIN=1，ACK=1，序号seq=w，确认号ack=u+1），服务端进入LAST_ACK（最后确认）状态，等待客户端的确认。

第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。

即客户端收到服务端的连接释放报文段后，对此发出确认报文段（ACK=1，seq=u+1，ack=w+1），客户端进入TIME_WAIT（时间等待）状态。此时TCP未释放掉，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态。

收到一个FIN只意味着在这一方向上没有数据流动。客户端执行主动关闭并进入TIME_WAIT是正常的，服务端通常执行被动关闭，不会进入TIME_WAIT状态。

在socket编程中，任何一方执行close()操作即可产生挥手操作。

![img](https://pica.zhimg.com/50/v2-c7d4b5aca66560365593f57385ce9fa9_720w.jpg?source=1940ef5c)

**2.1 挥手为什么需要四次？**

因为当服务端收到客户端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，当服务端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉客户端，“你发的FIN报文我收到了”。只有等到我服务端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。故需要四次挥手。

**2.2 2MSL等待状态**

TIME_WAIT状态也成为2MSL等待状态。每个具体TCP实现必须选择一个报文段最大生存时间MSL（Maximum Segment Lifetime），它是任何报文段被丢弃前在网络内的最长时间。这个时间是有限的，因为TCP报文段以IP数据报在网络内传输，而IP数据报则有限制其生存时间的TTL字段。

对一个具体实现所给定的MSL值，处理的原则是：当TCP执行一个主动关闭，并发回最后一个ACK，该连接必须在TIME_WAIT状态停留的时间为2倍的MSL。这样可让TCP再次发送最后的ACK以防这个ACK丢失（另一端超时并重发最后的FIN）。

这种2MSL等待的另一个结果是这个TCP连接在2MSL等待期间，定义这个连接的插口（客户的IP地址和端口号，服务器的IP地址和端口号）不能再被使用。这个连接只能在2MSL结束后才能再被使用。

**2.3 四次挥手释放连接时，等待2MSL的意义?**

MSL是Maximum Segment Lifetime的英文缩写，可译为“最长报文段寿命”，它是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。

为了保证客户端发送的最后一个ACK报文段能够到达服务器。因为这个ACK有可能丢失，从而导致处在LAST-ACK状态的服务器收不到对FIN-ACK的确认报文。服务器会超时重传这个FIN-ACK，接着客户端再重传一次确认，重新启动时间等待计时器。最后客户端和服务器都能正常的关闭。假设客户端不等待2MSL，而是在发送完ACK之后直接释放关闭，一但这个ACK丢失的话，服务器就无法正常的进入关闭连接状态。

两个理由：

- 保证客户端发送的最后一个ACK报文段能够到达服务端。

这个ACK报文段有可能丢失，使得处于LAST-ACK状态的B收不到对已发送的FIN+ACK报文段的确认，服务端超时重传FIN+ACK报文段，而客户端能在2MSL时间内收到这个重传的FIN+ACK报文段，接着客户端重传一次确认，重新启动2MSL计时器，最后客户端和服务端都进入到CLOSED状态，若客户端在TIME-WAIT状态不等待一段时间，而是发送完ACK报文段后立即释放连接，则无法收到服务端重传的FIN+ACK报文段，所以不会再发送一次确认报文段，则服务端无法正常进入到CLOSED状态。

- 防止“已失效的连接请求报文段”出现在本连接中。

客户端在发送完最后一个ACK报文段后，再经过2MSL，就可以使本连接持续的时间内所产生的所有报文段都从网络中消失，使下一个新的连接中不会出现这种旧的连接请求报文段。

**2.4 为什么TIME_WAIT状态需要经过2MSL才能返回到CLOSE状态？**

理论上，四个报文都发送完毕，就可以直接进入CLOSE状态了，但是可能网络是不可靠的，有可能最后一个ACK丢失。所以TIME_WAIT状态就是用来重发可能丢失的ACK报文。

#### 3. 总结

《TCP/IP详解 卷1:协议》有一张TCP状态变迁图，很具有代表性，有助于大家理解三次握手和四次挥手的状态变化。如下图所示，粗的实线箭头表示正常的客户端状态变迁，粗的虚线箭头表示正常的服务器状态变迁。

![img](https://pic1.zhimg.com/50/v2-7c402fde8210519feb8f65d41410c205_720w.jpg?source=1940ef5c)

参考：《TCP/IP详解 卷1:协议》

=d5--0730=

### tip: react hook
**useCallback**
把回调函数和依赖数组作为参数传入useCallback
会返回该函数的memorized值，该函数仅在依赖数组发生变化才会改变

```javascript
const usecallback = useCallback(()=> {
  //
}, [])
```

## w
=d1--0802=
### tip: 创建多个git sshkey
创建key
```cmd
ssh-keygen -t rsa -C email.com
```
回车
输入别名
回车
输入密码
回车
再次输入密码

在~/.ssh 文件夹下创建config文件

```txt
Host github.com // 域名地址的别名
    HostName github.com // 真实的域名地址
    IdentityFile C:\Users\qin.huang\.ssh\\my_github // id_rsa的地址
    PreferredAuthentications publickey
    User crow // 配置使用用户名
```

测试
```cmd
ssh -T git@github.com
// git@ 加别名
```
如果成功会提示 Hi xxx! You've successfully authenticated,

使用
原来的真实地址改为别名

=d2--0803=
### bug: uniapp uni-popup 弹窗内无法滑动
a: uni-popup组件中的滑动事件被禁止冒泡了，去掉@touchmove.prevent="clear" 即可
update: 0804 一定要去掉， 在clear方法进行判断也不行

### bug: element 的 el-tree 使用@check-change事件多次触发
a: 当点击选择框选中状态改变的时候，如果有多级子节点，那就会触发多次（因为子节点的选中状态也被改变）
解决
把 check-change 事件改为 check 事件，只有当点击复选框的时候才会触发

=d3--0804=

### bug: 小程序在ios上的回弹问题
a: 对于不需要滑动的页面
在page.json中对应页面增加 disScroll: true
```json
"style": {
  "disScroll": true
}
```
对于需要滑动的页面 滑动部分用scroll-view 等进行模拟，将这个页面固定高度
在page.json中对应页面增加 disScroll: true

=d4--0805=

### bug: uni小程序 在ios上 textarea的placeholder文字顶部有部分被遮挡
a: 可能是 disableDefaultPadding="true" auto-height="true" 设置了最小高度
把 disableDefaultPadding, auto-height min-height 去掉大概可以

=d5--0806=
### tip：git常用命令
添加到暂存区: git add .
提交: git commit -m "提交信息"
推送: git push origin master(git push 模块 分支名)
拉取: git pull origin master

## w

=d2--0810=

### bug: vue-cli@4.5.13 创建的vue3 + ts + element 在设置自定义主题时报错
错误提示 Invalid CSS after "$--colors: map": expected expression (e.g. 1px, bold), was ".deep-merge("
a: 已经下载node-sass sass-loader，需要下载sass
```cmd
npm i sass -D
```
=d4--0812=

### tip: svg-sprite-loader 实现icon组件
1. 下载插件
2. 写vue.config.js
```javascript
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: path.resolve(__dirname, './src/assets/icons') // 只带自己人玩
}
```
3. 写icon组件
```vue
<template>
  <svg :class="svgClass">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
 name: 'icon',
 props: {
   name: {
     type: String,
     required: true,
   },
 },
}
</script>
```
4. 引入组件

## w

=d1--0816=

### bug: sass 报错 math.div(100, 2) undefined function
a: math.div 在 sass@1.33.0 才有
下载大于等于1.33.0版本的sass就可以了

=d2--0817=

### bug: vue3 + ts 报错 cannot convert object to primitive value
a: 变量名和 组件的ref 命名重复了

=d3--0818=
### bug: ts 使用js文件报错 Vue typeScript： Could not find a declaration file for module '***'. '***' implicitly has an 'any'...

tsconfig.json文件中在compilerOptions 中添加 "noImplicitAny": false
```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    ...
    ...
  }
}
```

### bug: 在vue中使用_this = this,报错Unexpected aliasing of 'this' to local variable @typescript-eslint/no-this-alias

a: 原因是 eslint 为了防止this变量和局部变量混淆（大概吧）

解决方法：在.eslintrc.js中的rules添加 "@typescript-eslint/no-this-alias": ["off"]

=d4--0819=

### bug: vue3 + ts 组件通信报警告 Vue warn]: Extraneous non-emits event listeners (comfirm) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.

a: 声明下自定义事件名称即可
emits: ['comfirm']

=d5--0820=

### bug: vue3+element-plus 设置中文无效

在main.ts设置 无效
```ts
// ! element-plus vue3.0
import element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn' //中文
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文

createApp(App).use(router).use(element, { locale }).mount('#app')

```

在App.vue设置生效
```vue
<template>
  <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider>
</template>
<script>
//引入vue方法
import { ElConfigProvider } from 'element-plus'
//中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
//引入自定义方法
//引入自定义组件
export default {
  name: 'ZhProvider',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    let locale = zhCn
    return {
      locale
    }
  }
}
</script>
```

element-plus的版本在1.0.2-beta.59前的可以用第一种方式设置，之后的需要用第二种
本文使用的版本为1.0.2-beta.70

## w

=d4--0826=

### tip: vue3 的一些小改变

vue2的 emit('input') 需要改成 emit('update:value')
input 自定义事件
```vue
// vue2
<child
  @input="handleInput"/>
// vue3
<child
  @update:value="value"/>
```

=d5--0827=

### tip: 小程序的体验版和正式版共用一套本地存储