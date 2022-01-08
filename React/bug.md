# 2022

## w

=d6--0108=

### antD 的 select 动态设置defaultValue 只有第一次生效
an: 给select添加上key
如果想实现非受控组件（用defaultValue），两个办法，第一个服务端没有返回数据的时候，不render Select，render一个占位的placeholder。另一个办法，给Select加一个key，值为defaultValue。

