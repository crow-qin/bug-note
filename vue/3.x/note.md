# 2021

## w

=d3--1013=

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