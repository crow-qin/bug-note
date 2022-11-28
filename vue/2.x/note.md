# 2021

## w

=d3--1222=

### 使用jsx片段
<br>
安装  
babel-helper-vue-jsx-merge-props  
babel-plugin-transform-vue-jsx

<br>

.babelrc文件  
```
{
  "plugins": [
    "transform-vue-jsx",
  ]
}
```

父组件
```vue
<template>
...
<Child :render="render" :data="data">
...
<script>
export const Child = {
  props: {
    data: {
      type: [Object]
    },
    render: {
      type: [String, Function]
    }
  },
  render() {
    return this.render(this.data)
  }
}
...
data() {
  data: {
    name: 'open',
  },
  render: (data) => {
    return <button>{data.name}</button>
  }
},
components: {
  Child
}
...
</script>

</template>
```

=d7--1024=

### vue scoped的原理

在vue文件中的style标签上，有一个特殊的属性：scoped。当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件，也就是说，该样式只能适用于当前组件元素。通过该属性，可以使得组件之间的样式不互相污染。如果一个项目中的所有style标签全部加上了scoped，相当于实现了样式的模块化。

**scoped的实现原理**

vue中的scoped属性的效果主要通过PostCSS转译实现，如下是转译前的vue代码：

```vue
<style scoped>
.example {
 color: red;
}
</style>
<template>
 <div class="example">hi</div>
</template>
```

转义后：

```vue
<style>
.example[data-v-5558831a] {
 color: red;
}
</style>
<template>
 <div class="example" data-v-5558831a>hi</div>
</template>
```

即：PostCSS给一个组件中的所有dom添加了一个独一无二的**动态属性**，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。
