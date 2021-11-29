
# 2021
## w

=d4--1125=

### nginx for mac 配置图片服务器

先暂停nginx
```shell
sudo nginx -s stop
```

如果无法暂停，查看nginx进程，再杀掉进程

```shell
ps aux | grep nginx
# 会出现类似
# user            25273   0.6  0.0 408628336   1632 s006  S+    4:51下午   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox nginx
kill -9 25273
```

在/opt/homebrew/etc/nginx/servers 文件夹下增加 img.com.conf

```conf
server {
  listen 80;
  server_name img.com
  index index.html index.htm index.jsp index.php;
  if ($query_string ~* ".*[\;'\<\>].*") {
    return 404;
  }
  location /statics {
    root /Users/xxx/www;
    add_header Access-Control-Allow-Origin *;
    autoindex on;
    # 可以查看文件夹
  }
}
```
这个的意思是可以输入img.com/statics查看到/Users/xxx/www/statics 文件夹中的内容

然后重启nginx
```shell
sudo nginx -s reload
```
可能会出现 .../logs/nginx.pid" failed (2: No such file or directory)

在nginx的文件夹下的logs文件夹创建nginx.pid

再次启动就可以了