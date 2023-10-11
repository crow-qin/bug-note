# 2023

## w

=d6-0225=

### 依赖预构建

**原理：**  
vite 会找到对应的依赖，然后调用 ES build（对 js 语法进行处理的一个库，将其他规范的代码转换成 ESbuild 规范，然后放到当前目录下的 node-modules/.vite/deps，同时对 ESbuild 规范的各个模块进行统一集成

**优点：**
解决了 3 个问题

1. 不同的第三方包会有不同的导出方式（这是第三方包作者决定的）
2. 对路径的处理上可以直接使用 .vite/deps，方便路径重写
3. 网络多包传输的性能问题（也是原生 ESbuild 规范不敢支持 node_modules 的原因之一）。有了依赖预构建以后无论有多少个额外的 export 和 import，vite 都会尽可能得到将他们集成最后生成成一个或多个模块

### 环境变量

#### node 使用 commonjs 规范运行， vite.config.js 使用 ESmodule 在 node 端运行却可以执行

vite 在读取 vite.config.js 时会先用 node 解析文件语法，若文件是 使用 ESmodule 规范会直接将其替换为 commonjs 规范

**读取配置的几种方法**  
通过 vite.config.js 的一些配置实现  
**envDir**：配置当前环境变量的文件地址

提供调用 **loadEnv** 手动确定 env 文件

```js
const env = loadEnv(mode, process.cwd(), "ENV_");
```

ps： process.cwd 方法：返回当前 node 进程的工作目录, 相当于 \_\_dirname  
.env: 所有环境都会用到的环境变量  
.env.development: 开发环境(默认名称)  
.env.production: 正式环境(默认名称)  
...其他环境变量

当调用 loadEnv 时

1. 直接找到 .env 文件解析其中的环境变量并放进一个对象里
2. 将传进来的 mode 变量的值进行拼接: `.env.development`，并根据我们提供的目录去取对应的配置文件并进行解析，并放进一个对象
3. 我们可以理解为

```js
const baseEnvConfig = 读取.env的配置
const modeEnvConfig = 读取相关env配置
const lastEnvConfig= { ...baseEnvConfig，...modeEnvConfig }
```

vite 内置 dotenv 的第三方库  
dotenv 会自动读取 .env 文件并解析文件中的对应环境变量，并将其注入到 process 对象中(但 vite 考虑到和其他配置的冲突问题，并不会直接注入到 process 对象)

> --mode [名称]

em: 执行开发环境项目

```cmd
yarn dev --mode development
```

该命令会将 mode 设置为 development 传递过来

如果是客户端，vite 会将对应的环境变量注入到 **import.meta.env** 里去

vite 做了一个拦截，他为了防止我们将隐私性的变量直接送进 import.meta.env 中，所以他做了一层拦截，如果你的环境变量不是以 VITE 开头的，他就不会帮你注入到客户端中去

可以在 config 中配置 envPrefix 自定义前缀

```js
...
envPrefix: 'ENV_'
...
```

环境变量以 ENV\_ 开头才可以注入

=d1-0227=

### css 模块化

在协同开发是可能会出现命名重复，导致 css 被覆盖，css module 就是解决这种问题的

原理:  
全部都是基于 node  
遇到对应后缀名的文件，通过不同的转换方式，转换成 js 文件，并插入 html

1. module.css (module 是一种约定，表示需要开启 css 模块化)
2. 他会将你的所有类名进行一定规则的替换(将 footer 替换成\_footer_i22st_1)
3. 同时创建一个映射对象{ footer: "\_footer_i22st_1"}
4. 将替换过后的内容塞进 style 标签里然后放入到 head 标签中(能够读到 index.html 的文件内容)5．将 componentA.module.css 内容进行全部抹除,替换成 JS 脚本
5. 将创建的映射对象在脚本中进行默认导出

=d2-0228=

### vite + ts

1. 环境变量的语法提示

vite 的环境变量通过 import.meta.env.\* 来获取  
增加提示可以在 .d.ts 文件中添加以下代码

```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  // 加入对应对的环境变量
  readonly VITE_API: string;
}
```

=d6-0304=

### 动态导入

**简述**
import() 是 es6 的一个新特性  
类似按需加载

import 返回一个 promise 函数

> import([文件路径])

webpack 动态加载的原理  
返回一个 promise，没有进入路由时不 resolve 保持在 pending 状态

**举一个例子**

```jsx
// Home.jsx
console.log('test')
// 1000行
export default function {
  return <div>

  </div>
}
```

```jsx
// 这种方式导出，在这里就会读取整个代码，但不读取 执行方法
import Login from "./Login";
const routes = [
  {
    path: "/home",
    // 这种方式没有触发的话，只会返回一个promise
    component: import("./Home"),
  },
  {
    path: "/login",
    component: Login,
  },
];
```

### cdn 加速

cdn 全称为 content delivery network，中文为内容分发网络  
cdn 加速第三方插件： vite-plugin-cdn-import
