# 2021

## w

=d4--0826=

### tip: vue3 的一些小改变

vue2 的 emit('input') 需要改成 emit('update:value')
input 自定义事件

```vue
// vue2
<child @input="handleInput" />
// vue3
<child @update:value="value" />
```
