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
