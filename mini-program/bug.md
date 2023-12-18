# 2023

# GT

## w

=d1-1120=

### iconfont 引入小程序后, 图标不显示

**简述**  
在 iconfont 官网选择图标并保存到项目中, 然后选择下载到本地,  
选择 iconfont.css, iconfont.ttf, iconfont.woff, iconfont.woff2 四个文件复制到项目中,  
将 css 文件的后缀改为 .wxss, 在 app.wxss 中引入

**错误**  
图标显示占位图标, 并没有正确显示图标

**方法**  
在下载前在'<font color=#c66>项目设置</font>'中把 '<font color=#c66>字体格式</font>'勾选上 ' <font color=#c66>Base64</font>'  
重新下载并导入问题解决
