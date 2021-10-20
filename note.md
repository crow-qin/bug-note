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

1. 下载地址 <https://github.com/coreybutler/nvm-windows/releases>

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
var arr11 = new Array(100)  .map(function(item,index){
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
mysql
acc: root
pwd: root

acc: root
pwd: 123456

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
菜鸟教程 <http://www.runoob.com/redis/redis-install.html>

## w

=d4--0527=

### tip: rgb灰度化计算

一般公式: (R *0.299 + G* 0.587 + B *0.144)
rgb是整数，小数点计算可能会精度丢失
使用位运算
(R* 38 + G *57 + B* 15) >> 7

### tip: vue3 getCurrentInstance方法只在开发环境中使用

## w

=d2--0707=

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

*0729 update*
[HMR](#a0729_1)

### tip: webpack1.x ->2.x 中的更改

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

链接：<https://zhuanlan.zhihu.com/p/39512941>

## w

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

=d5--0806=

### tip：git常用命令

添加到暂存区: git add .
提交: git commit -m "提交信息"
推送: git push origin master(git push 模块 分支名)
拉取: git pull origin master

## w

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

### tip: vue3 的 h函数

h(标签名 | 组件名, { 属性 | props}, 文本 | h函数 | 数组 | 对象)

h函数包含组件时

```vue
h( Child, {}, {
  default: () => h(...),
  slotName: () => h(...)
})
```

=d7--0829

proxy代理
'/cma': {
  target: 'https://testing.hulasmart.com',
  changeOrigin: true
  pathRewrite: {
    '^/cma': '/' // 需要rewrite重写的,
  }
},
请求 /cma/lifetouch-cma-api/api/refresh-token 报404

'/lifetouch-cma-api': {
  target: 'https://testing.hulasmart.com',
  changeOrigin: true
},
请求 /lifetouch-cma-api/api/refresh-token 成功

获取permission 结构 xxx：[]，
存入permission 数组
根据权限遍历route数组生成新的route数组
对route数组进行计数，没有子模块的模块不需要显示

## w

=d5--0903=

### tip: vue-router4.x match与resolve合并为resolve

vue-router3.x
const newRouter = createRouter();
router.matcher = newRouter.matcher;

## w

=d1-0906=

### tip: vue项目对操作进行权限控制

a:

1. 封装button组件, 根据传入的权限决定显示，提示，通过。
优点：封装后只要传入参数即可判断，
缺点：只能控制button的权限
2. 使用自定义指令
只能修改状态

### tip: git commit message的一些规范

格式示例：

fix(DAO):用户查询缺少username属性
feat(Controller):用户查询接口开发

type(scope): subject
body

type(必须)

用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）。

fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

fix：产生diff并自动修复此问题。适合于一次提交直接修复问题

to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix

docs：文档（documentation）。

style：格式（不影响代码运行的变动）。

refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

perf：优化相关，比如提升性能、体验。

test：增加测试。

chore：构建过程或辅助工具的变动。

revert：回滚到上一个版本。

merge：代码合并。

sync：同步主线或分支的Bug。

scope(可选)

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

subject(必须)

subject是commit目的的简短描述，不超过50个字符。

建议使用中文（感觉中国人用中文描述问题能更清楚一些）。

结尾不加句号或其他标点符号。

body(可选)
commit的详细描述

=d2--0907=

### rxjs@7.3.0

Observable 可观察对象

#### 创建数据流的api

单值：of，empty
多值：from
事件：fromEvent
定时：interval，timer

#### 创建出来的数据流是一种可观察的序列，可以被订阅，也可以被用来做一些转换操作，比如

改变数据形态：map, mapTo, pluck
过滤一些值：filter, skip, first, last, take
时间轴上的操作：delay, timeout, throttle, debounce, audit, bufferTime
累加：reduce, scan
异常处理：throw, catch, retry, finally
条件执行：takeUntil, delayWhen, retryWhen, subscribeOn, ObserveOn
转接：switch

#### 也可以对若干个数据流进行组合

race，预设条件为其中一个数据流完成
forkJoin，预设条件为所有数据流都完成
zip，取各来源数据流最后一个值合并为对象

例子：返回按住按钮到松开的时间段

```javascript
const btn = document.querySelector('#hold');
// 获取事件触发时的时间戳timestamp
const mouseUp$ = fromEvent(btn, 'mouseup').pipe(timestamp());
const mouseDown$ = fromEvent(btn, 'mousedown').pipe(timestamp());
const time = zip(mouseUp$, mouseDown$);
time.subscribe(data => {
  console.log(data);
  console.log(data[0].timestamp - data[1].timestamp);
});
```

=d5--0910=

### tip: ts 函数声明重载

函数声明可以多次定义, 这样函数可以根据定义的先后顺序进行匹配

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## w

=d4--0916=

### tip: vscode 设置eslint格式化代码

安装 eslint
setting.json 增加

```json
"eslint.nodeEnv": "true", //保存时候自动格式化，不建议设置。
```

=d5--0917=

### tip: vue 的 provide/inject

a: 父组件修改依赖注入的值 子组件没有获取到更新后的值

```js
data () {
  return {
    test: '123',
    test2: {
      myData:'123'
    },
  }
},
//父级
provide: function() {
  return {
    test: this.test//非响应
    test2: this.test2//响应
  };
},
//子
inject: ["test"]
```

如果还不行，直接用this.$data，或者注入的对象再嵌套一次

## w

=d3-1013=

### vue3定义全局变量

```js
import Vue from 'vue'
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}

```

使用全局变量

```js
import { getCurrentInstance } from 'vue'
let instance = getCurrentInstance()
let _this = instance.appContext.config.globalProperties
```

### base64的优缺点

base64编码: 一种将图片数据转化为文本数据的技术
**优点**
文本格式，占用内存较小，转换后大小约为原来的1/3，减少浏览器的消耗
网页使用base64资源，减少了http请求
base64适用的平台广泛
编码解码方便

**缺点**
base64文本内容较长，储存在数据库压力较大
base64文本内容较长，在页面上使用会使页面加载缓慢
base64无法缓存
8-12kb以下适用base64

### 下载pdf

#### node创建

pdfkit绘制完成后，
创建一个steam，将数据转成流，
新建文件，将流存到文件中，
再将文件转成数据流

```js
const getStream = async function (doc) {
  try {
    // const filePath = path.join(__dirname, '../', '_temp', Date.now().toString());
    const filePath = path.join(__dirname, '../', '_temp', Date.now().toString() + '.pdf');
    // 先将文档保存在临时目录下，后删除
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.end();
    await new Promise(resolve => {
        stream.on('finish', resolve);
    });
    const readStream = fs.createReadStream(filePath);
    // 读取完删除pdf
    fs.unlink(filePath, (err) => {
        console.error(err);
    });
    return readStream;
  } catch (e) {
    console.error(e);
  }
};
```

#### 前端下载

前端接收到的是arrayBuffer

```js
{
  responseType: 'arraybuffer',
}
```

如果存在window.navigator.msSaveOrOpenBlob 方法，直接下载数据流，
否则使用window.URL.createObjectURL创建一个临时uri

Internet Explorer 10 的 msSaveBlob 和 msSaveOrOpenBlob 方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因。
用法：
1.msSaveBlob：只提供一个保存按钮
2.msSaveOrOpenBlob：提供保存和打开按钮

URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

```js
const blob = new Blob([stream], {
  type: 'application/pdf;charset:UTF-8',
});
const newName = name.includes('.pdf') ? name : name + '.pdf';
if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  window.navigator.msSaveOrOpenBlob(blob, newName);
  return;
}
const data = window.URL.createObjectURL(blob);
window.open(data, '_blank');

```

可以创建a标签下载

### vnode

vue为什么不能用index 作为key
会出现错误的复用
以及错误复用后的调整渲染
即出现2次render

### Promise实现原理

**实现原理**
说到底，Promise 也还是使用回调函数，只不过是把回调封装在了内部，使用上一直通过 then 方法的链式调用，使得多层的回调嵌套看起来变成了同一层的，书写上以及理解上会更直观和简洁一些。

大致逻辑
调用 then 方法，将想要在 Promise 异步操作成功时执行的 onFulfilled 放入callbacks队列，其实也就是注册回调函数，可以向观察者模式方向思考；
创建 Promise 实例时传入的函数会被赋予一个函数类型的参数，即 resolve，它接收一个参数 value，代表异步操作返回的结果，当异步操作执行成功后，会调用resolve方法，这时候其实真正执行的操作是将 callbacks 队列中的回调一一执行；

## w

=d2--1019=

### webpack打包加速优化

1. 提高热更新速度
在.env.development环境变量中配置
VUE_CLI_BABEL_TRANSPILE_MODULES: true

原理
利用插件，在开发环境中将异步组件变为同步引入，也就是import()转化为require())
一般页面到达几十上百，热更新慢的情况下需要用到。
webpack5 即将发布，大幅提高了打包和编译速度

2. 分析打包时长
webpack-bundle-analyzer 分析打包后的模块文件大小
速度分析插件 speed-measure-webpack-plugin

```cmd
npm install --save-dev speed-measure-webpack-plugin
```

```js
//vue.config.js
//导入速度分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
//实例化插件
const smp = new SpeedMeasurePlugin();

module.exports = {
  configureWebpack: smp.wrap({
    plugins: [
      // 这里是自己项目里需要使用到的其他插件
      new yourOtherPlugin()
    ]
  })
}
```

3. 较耗时：代码的编译或压缩（转化 AST树 -> 遍历AST树 -> 转回JS代码）
编译 JS、CSS 的 Loader
压缩 JS、CSS 的 Plugin

4. 缓存：让二次构建时，不需要再去做重复的工作[没有变化的直接使用缓存，速度更快]

a. 开启Loader、压缩插件的cache配置【如babel-loader的cacheDirectory：true】，uglifyjs-webpack-plugin【如cache: true】，构建完将缓存存放在node_modules/.cache/..。

b. cache-loader：将 loader 的编译结果写入硬盘缓存，再次构建如果文件没有发生变化则会直接拉取缓存,添加在时间长的 loader 的最前面。

```js
module: {
  rules: [
    {
      test: /\.ext$/,
      use: ['cache-loader', ...loaders],
      include: path.resolve('src'),
    },
  ],
},
```

5. 多核：充分利用了硬件本身的优势

a. happypack：开启系统CPU最大线程，通过插件将loader包装，暴露id，直接module.rules引用该id。

```js
//安装：npm install happypack -D
//引入：
const Happypack = require('happypack');
exports.plugins = [
  new Happypack({
    id: 'jsx',
    threads: 4,
    loaders: [ 'babel-loader' ]
  }),

  new Happypack({
    id: 'styles',
    threads: 2,
    loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
  })
];

exports.module.rules = [
  {
    test: /\.js$/,
    use: 'Happypack/loader?id=jsx'
  },

  {
    test: /\.less$/,
    use: 'Happypack/loader?id=styles'
  },
]
```

b. thread-loader：添加在此loader后面的放入单独的 worker 池里运行，配置简单

```js
//安装：npm install thread-loader -D
module.exports = {
  module: {
    //我的项目中,babel-loader耗时比较长，所以我给它配置 thread-loader
    rules: [
      {
        test: /\.jsx?$/,
        use: ['thread-loader', 'cache-loader', 'babel-loader']
      }
    ]
  }
}
```

6. cdn

7. css 压缩: mini-css-extract-plugin

8. Tree-Shaking：将代码中永远不会走到的片段删除掉。

9. 代码分割

10. loader 使用include，excludejians
更精确的指定/排除目录，减少不必要的遍历

11. webpack-parallel-uglify-plugin 插件来压缩代码

a. 优化原理
（1）默认情况下 webpack 使用 UglifyJS 插件进行代码压缩，但由于其采用单线程压缩，速度很慢。

（2）我们可以改用 webpack-parallel-uglify-plugin 插件，它可以并行运行 UglifyJS 插件，从而更加充分、合理的使用 CPU 资源，从而大大减少构建时间。

=d3--1020=

### vue3的优势

源码体积的优化
重写了虚拟 dom

响应式系统的升级
用 Proxy 和 Reflect 来代替 vue2 中的 Object.defineproperty()方法来重写响应式
vue3 中可以监听动态新增的属性
vue3 中可以监听删除的属性
vue3 中可以监听数组的索引和 length 属性

代码编译优化
使用了 组合 API 来代替 vue2 中的 Options API
它是基于函数的 api，可以更灵活的组织组件的逻辑。
解决options api在大型项目中，options api不好拆分和重用的问题。

组件内不需要根节点了，使用 fragment(代码片段)代替了，fragment(代码片段)不会在页面显示

vue3 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容

### 一句话解析下什么是event loop

主线程运行的时候会生成堆（heap）和栈（stack）；
**js 从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；当程序调用外部的 API 时（比如 ajax、setTimeout 等），会将此类异步任务挂起，继续执行执行栈中的任务。**
等异步任务返回结果后，再按照顺序排列到事件队列中；主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务排列到事件队列中。
主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个循环往复的过程被称为"Event Loop 事件循环"

#### 宏任务/微任务

除了广义的同步任务和异步任务，我们对任务有更精细的定义：
macro-task(宏任务)：当前调用栈中执行的任务称为宏任务。包括：script全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有IE10支持，具体可见MDN）、I/O、UI Rendering。
micro-task(微任务)： 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。包括：Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver不同类型的任务会进入对应的Event Queue，
宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

### 原型链

一句话解析什么是原型链

遍历一个实列的属性时，先遍历实列对象上的属性，再遍历它的原型对象，一直遍历到Object

### TCP通信

为满足TCP协议的这些特点，TCP协议做了如下的规定：

①数据分片：在发送端对用户数据进行分片，在接收端进行重组，由TCP确定分片的大小并控制分片和重组；

②到达确认：接收端接收到分片数据时，根据分片数据序号向发送端发送一个确认；

③超时重发：发送方在发送分片时启动超时定时器，如果在定时器超时之后没有收到相应的确认，重发分片；

④滑动窗口：TCP连接每一方的接收缓冲空间大小都固定，接收端只允许另一端发送接收端缓冲区所能接纳的数据，TCP在滑动窗口的基础上提供流量控制，防止较快主机致使较慢主机的缓冲区溢出；

⑤失序处理：作为IP数据报来传输的TCP分片到达时可能会失序，TCP将对收到的数据进行重新排序，将收到的数据以正确的顺序交给应用层；

⑥重复处理：作为IP数据报来传输的TCP分片会发生重复，TCP的接收端必须丢弃重复的数据；

⑦数据校验：TCP将保持它首部和数据的检验和，这是一个端到端的检验和，目的是检测数据在传输过程中的任何变化。如果收到分片的检验和有差错，TCP将丢弃这个分片，并不确认收到此报文段导致对端超时并重发。
