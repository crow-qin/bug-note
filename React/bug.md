# 2021

## w

### tip: React 执行 setState 后无法获取最新 state 数据

**方法：**  
setState 方法的第二个参数，增加回调函数，回调函数可以拿到更新后的参数

```javascript
setState({}, () => {
  // 获取最新数据
});
```

_0727-update_  
React 的 setState 函数并不是异步，只是在某些操作中没有立即更新  
合成事件: React 为解决跨平台，兼容性问题， 将原生事件重新封装进行代理，如 onClick  
总结: setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

链接：<https://zhuanlan.zhihu.com/p/39512941>

# 2022

## w

=d6--0108=

### antD 的 select 动态设置 defaultValue 只有第一次生效

**方法：**  
给 select 添加上 key  
如果想实现非受控组件（用 defaultValue），两个办法，第一个服务端没有返回数据的时候，不 render Select，render 一个占位的 placeholder。另一个办法，给 Select 加一个 key，值为 defaultValue。

=d2-0228=

### ant-table 的 columns 用 useState 声明，并有方法 a 可操作，且有第二个 useState 为 data，调用方法 a 获取 data，只能拿到默认值

**方法：**
不要把含有方法的数据存入 useState 中，如果方法还使用了另一个 useState 可能会拿不到更新的值

错误例子

```jsx
...
  const defColumns = [
    {
      title: '操作',
      align: 'center',
      render: (text: string, row: Obj) => {
        return (
          <span onClick={() => { onWatch(row.id) }}>查看</span>
        )
      }
    }
  ]
  const [columns, setColumns] = useState(defColumns)
  const [query, setQuery] = useState({ a: 1 })
  const onWatch = () => {
    console.log(query)
    // 这里只能拿到 { a: 1 }
  }
  useEffect(() => {
    setQuery({ a: 2 })
  }, [])

```

