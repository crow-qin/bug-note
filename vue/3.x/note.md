# 2021

## w

=d7--0207=

### 提供，注入

provide, inject  
适用深度嵌套的组件  
父组件使用 provider 提供数据  
子组件使用 inject 使用数据

_provide inject 需要写在 setup 中_

提供非组件内的数据(一般是静态字符串或数字)  
父组件

```js
import { provide } from "vue";
export default {
  setup() {
    provide("number", 1);
  },
};
```

子组件

```js
import { inject } from "vue";
export default {
  setup() {
    const number = inject("number");
    return {
      number,
    };
  },
};
```

提供组件内响应式的数据  
父组件

```js
import { provide, ref } from "vue";
export default {
  setup() {
    const number = ref(1);
    provide("number", number);
    return {
      number,
    };
  },
};
```

子组件

```js
import { inject } from "vue";
export default {
  setup() {
    const number = inject("number");
    return {
      number,
    };
  },
};
```

_provide 还可以提供方法 子组件通过 inject 使用该方法_

单元测试库 Jest Mocha  
端到端测试 Cypress.io

## w

=d3--1013=

### vue3 定义全局变量

```js
import Vue from "vue";
const app = Vue.createApp({});
app.config.globalProperties.$http = () => {};
```

使用全局变量

```js
import { getCurrentInstance } from "vue";
let instance = getCurrentInstance();
let _this = instance.appContext.config.globalProperties;
```
