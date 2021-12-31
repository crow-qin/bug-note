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