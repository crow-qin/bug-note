# 2022

## w

=d6--0108=

### antD 的 select 动态设置 defaultValue 只有第一次生效

an: 给 select 添加上 key  
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

[]
