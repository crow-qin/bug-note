# 2023

# GT

## w

=1109-d4=

### 小程序使用van-field， van-popup组件开发正常显示，预览扫码后却无法显示
![Alt text](image.png)

**版本**  
小程序版本：3.1.5
"@vant/weapp": "^1.11.1"

**方法**
在app.json 中  
删除 "lazyCodeLoading": "requiredComponents",  
加入 "renderer": "webview",  
![Alt text](image-1.png)

最主要是删除lazyCodeLoading  
这个是按需注入  

# 2024

## w25

=0621-d5=

### 在uni app开发时，从组件中修改uni-nav-bar组件中的title大小，始终不生效  

**原因**
小程序默认只能页面穿透到组件，不能组件穿透到组件

=1217-d2=

### Camera标签在IOS的问题

**原因**

1. 不要使用自适应高度，一定要固定高度
2. 不要使用wx.createSelectorQuery()获取高度，IOS获取有点问题

### onShareAppMessage需要在page声明，不能在组件声明
