# 2021

## w

=d3--0715=

### tip：react 组件

无状态组件: 没有生命周期，没有状态，多用于展示数据，开销很小。

_0729 update_  
函数组件：返回一个函数作为组件；  
类组件：返回一个类作为组件，可以存在生命周期，也可以作为无状态组件；  
HOC（高阶组件）：组件返回一个组件。

## w

=d2--0720=

### tip: react 插槽的实现方式

在组件插入标签 组件内部通过 this.props.children 来展示  
只有一个时 children 为对象 当有多个时 children 为数组

- 单个插槽

  ```jsx
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

- 多个插槽

  ```jsx
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

## w

=d3-0728=

### tip: React Hook

hook 方法只适用于函数式组件

**useState**  
初始化 state，简化 setState

```javascript
const [value, setValue] = useState(0);
setValue(value + 1);
console.log(value); // 0
// 和setState一样在生命周期不会立即更新
```

**useEffect**

> useEffect(()=> { Async Action }, ?[dependencies]) // 第二参数可选

1. 多个 useEffect 的回调 按先后顺序执行

2. useEffect 不带第二参数， 会在每次 render 后执行

3. useEffect 第二参数为空数组，只会在第一次 render 后执行

   ```javascript
   useEffect(() => {
     console.log("mount");
   }, []);
   ```

4. useEffect 的第二个参数有依赖项，函数会在依赖项发生变化时触发

   ```javascript
   const [value, setValue] = useState(0);
   useEffect(() => {
     console.log(value);
   }, [value]);
   useEffect(() => {
     setValue(2);
   }, []);
   ```

5. useEffect 第一个参数返回一个匿名函数， 相当于 componentUnMount 在组件卸载时触发

   ```javascript
   useEffect(() => {
     return () => {
       console.log("组件卸载");
     };
   }, []);
   ```

**useContext**  
跨组件共享数据的钩子函数

> const myContext = useContext(context)

_content 是 React.createContext() 返回的对象_

```jsx
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

> const [state, dispatch] = useReducer(reducer, initState)

```javascript
function reducer(state, action) {
  if (action.flag) {
    return { count: state.count + 1 };
  }
  return { count: state.count - 1 };
}
function DEMO() {
  const initState = { count: 1 };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <div>Count: {state.count}</div>
      <button onClick={dispatch(state, { flag: true })}>+</button>
    </div>
  );
}
```

_0729 update_

**useMemo**  
类似 vue 的 computed 依赖项发生改变，会触发 useMemo 重新计算

> const memorizedValue = useMemo(()=> { return a + 1 }, [a])

useMemo 会在 render 前执行
useMemo 没有依赖项的，每次渲染都会执行

_0730 update_

**useCallback**  
把回调函数和依赖数组作为参数传入  
useCallback 会返回该函数的 memorized 值，该函数仅在依赖数组发生变化才会改变

```javascript
const useCB = useCallback(() => {
  //
}, []);
```

# 2023

## w

=d5--1112=

### echarts-for-react 设置图表并实时更新

```tsx
import ReactEcharts from "echart-for-react"
import React from 'react'
import { observer } from 'mobx-react'

export default observer(function Chart() {

  const getOption = () => {
    return {
      ...
      // 图表配置
    }
  }
  // 图表事件
  let chartRef: any = React.createRef()

  const updateAxisPointer = (e: any) => {
    // 设置配置刷新数据
    // 当前实例的配置
    // chartRef.props.option
    // 配置可以是全部也可以是部分
    let option = {}
    chartRef.getEchartsInstance().setionOption(option)
  }
  // 绑定事件
  const onEvents = {
    // 事件名: 回调函数
    'updateAxisPointer': updateAxisPointer
  }

  return (
    <div className="echarts-body">
      <ReactEcharts
        option={getOption()}
        onEvents={onEvents}
        ref={(node: EChartsReact) => chartComp = node} />
    </div>
  )
})

```
