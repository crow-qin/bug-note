# 2020
## w

=d3--1202=

### 阿里云的云效，第一次拉取代码，会提示输入账号密码

账号是云效的 username ，密码是私人令牌  
第一次拉取没有私人令牌，需要忘记令牌，修改令牌，令牌格式全数字8位以上  
accentrix 云效令牌：1-9


# 2021

## w

=d1--0222=

### tip: vue3.x 弃用了 $listeners

1. vue2.x 语法  
  *在 Vue2 中，你可以使用 this.$attrs 和 this.$listeners 分别访问传递给组件的 attribute 和事件监听器。结合 inheritAttrs: false，开发者可以将这些 attribute 和监听器应用到其它元素，而不是根元素：*

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
  *在 Vue 3 的虚拟 DOM 中，事件监听器现在只是以 on 为前缀的 attribute，这样就成了 $attrs 对象的一部分，因此 $listeners 被移除了。*

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

**tip: 一定要等到下载完再关闭
Installation complete 代表nodejs安装完成**

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

### archive.js 用于文件压缩


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
**useState**  
初始化state，简化setState

```javascript
const [value, setValue] = useState(0)
setValue(value + 1)
console.log(value) // 0
// 和setState一样在生命周期不会立即更新
```

**useEffect**  
useEffect(()=> { Async Action }, ?[dependencies])  // 第二参数可选

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

**useMemo**  
类似vue的computed 依赖项发生改变，会触发useMemo重新计算
const memorizedValue = useMemo(()=> { return a + 1 }, [a])

useMemo 会在 render 前执行
useMemo 没有依赖项的，每次渲染都会执行

=d4--0729=

### <span id="a0729_1">**webpack5 的 HMR**</span>
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

### markdown 的锚点写法
[跳转](#test)  
```js
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
// 占位
```
<span id="test">目标位置</span>  
在typora编辑完需要按住ctrl再单击才会跳转

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
```js
'/cma': {
  target: 'https://testing.hulasmart.com',
  changeOrigin: true
  pathRewrite: {
    '^/cma': '/' // 需要rewrite重写的,
  }
},
```
请求 /cma/lifetouch-cma-api/api/refresh-token 报404

```js
'/lifetouch-cma-api': {
  target: 'https://testing.hulasmart.com',
  changeOrigin: true
},
```
请求 /lifetouch-cma-api/api/refresh-token 成功

获取permission 结构 xxx：[]，  
存入permission 数组  
根据权限遍历route数组生成新的route数组  
对route数组进行计数，没有子模块的模块不需要显示

## w

=d5--0903=

### tip: vue-router4.x match与resolve合并为resolve

vue-router3.x
```js
const newRouter = createRouter();
router.matcher = newRouter.matcher;
```
## w

=d1-0906=

### tip: vue项目对操作进行权限控制

a:

1. 封装button组件, 根据传入的权限决定显示，提示，通过。  
优点：封装后只要传入参数即可判断，  
缺点：只能控制button的权限  
2. 使用自定义指令  
只能修改状态  

<br/>

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

## w

=d3--1229=

### js获取设置css变量

设置css变量
```css
:root {
  --color: #333;
}
.app {
  --textFs: 13px;
  div {
    font-size: var(--textFs);
    /* 拼接变量 */
    line-height: calc(var(--textFs) * 1.5)
  }
}
```

**获取css变量**

```js
document.documentElement.style.getPropertyValue('--testColor')
```
*上面语句只能获取到内联样式的css变量值*

```js
getComputedStyle(document.documentElement).getPropertyValue('--testColor')
```

*获取任意位置的CSS变量*

```js

var divEle=document.querySelector('div');
var divSty=window.getComputedStyle(divEle);
var diveleVal=divSty.getPropertyValue('---testColor');
```
*获取某一标签上的css变量*

**setProperty()修改css变量**

```html
<template>
  <div></div>
</template>
<style>
body{
  --testColor:red;
}
div{
  --testColor:black;
}
</style>
<script>
  document.querySelector('div').style.setProperty('--testColor', yellow);
</script>
```

## w

=d3--0112=

### 实现文字竖直排列

```css
writing-mode: vertical-lr;
text-orientation: upright;
/* 解决字母数字he'xiang */
```

## w

=d2--0118=

### el + vue 手动关闭el-date-picker

有时候手动调用控件的关闭隐藏控件事件官网api中没有此事件，查看源码发现有一个handleClose

```vue
<template>
  <el-date-picker ref="pickerRef"/>
  <button @click="handleClose">
</template>
<script>
export default {
  ...
  methods: {
    handleClose() {
      this.$refs.pickerRef.handleClose()
    }
  }
}
</script>
```

## w

=d7--0424=

### 使用background模拟下划线

```html
<!-- style -->
<style>
  .box {
    position: relative;
  }
  .title {
    position: absolute;
    width: 30px;
    line-height: 22px;
    background: #fff;
  }
  textarea {
      resize: none;
      border: none;
      width: 100%;
      line-height: 20px;
      padding: 0px;
      text-indent: 35px;
      outline: none;
      background-image: linear-gradient(0deg, #000 1px, transparent 1px, transparent 18px);
      background-size: 100% 20px;
      background-repeat: repeat-y;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color-adjust: exact;
    }
</style>
<!-- html -->
<div class="box">
  <div class="title">title:</div>
  <textarea rows="2"></textarea>
</div>
```

如图：
![img](asset/img/note/20220424-112034.png)
