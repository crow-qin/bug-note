# 2021

## w

=d3--0512=

### tip: Nginx 代理本地打包项目

打开 Nginx 安装路径下的 conf/nginx.conf

```conf
server {
  listen       8100;
  server_name  localhost;
  location / {
      root   /test/v3/vue3_demo/dist;
      index  index.html index.htm;
      proxy_pass 127.0.0.1:3000;
  }
}
```

按需求在 server 中增加对应的端口，域名  
location 配置参数

- root 在/路径时需要显示的项目路径
- index 需要显示的 html
- proxy_pass 代理转发 所有以 localhost 及 8100 端口发送的请求 都会转到 127.0.0.1:3000 出来,即后台项目的地址

修改后重启 Nginx 配置

```cmd
nginx -s reload
```

如果 nginx 服务没有启动 先启动再重启配置

```cmd
start nginx
```

在 hosts 文件添加上对应的 IP 和域名

```hosts
127.0.0.1 localhost
127.0.0.1 www.testing.com
```

## w

=d4--1125=

### nginx for mac 配置图片服务器

先暂停 nginx

```shell
sudo nginx -s stop
```

如果无法暂停，查看 nginx 进程，再杀掉进程

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

这里指可以输入 img.com/statics 查看 /Users/xxx/www/statics 文件夹中的内容

然后重启 nginx

```shell
sudo nginx -s reload
```

可能会出现报错 .../logs/nginx.pid" failed (2: No such file or directory)

在 nginx 的文件夹下的 logs 文件夹创建 nginx.pid

再次启动就可以了
