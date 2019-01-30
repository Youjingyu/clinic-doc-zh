# 首次分析

现在我们可以开始分析应用了。

我们先分析 clone 下来的项目中的第一段服务器代码 `1-server-with-slow-function.js`。

该代码使用 express 启动了一个 HTTP 服务器，服务器具有一个根路由 `/`，在渲染页面前执行一定操作。

该服务器可以直接通过执行 `node 1-server-with-slow-function.js` 启动，然后用浏览器打开 http://localhost:3000/。如果你看到页面中显示 "Hello World" 说明没有问题。

我们试着用 Flame 分析这个服务器，看看我们是否能找到代码中的瓶颈。

在开始之前，我们还需要一个 http 压测工具。

建议使用 `autocannon`，它支持 Windows、Mac 以及 Linux，并且开箱即用。

通过 npm 安装 autocannon：

```bash
npm install -g autocannon
```

为了运行分析，我们使用 Flame 运行服务器，当服务器准备就绪时，即开始侦听端口时，再用 autocannon 向它发送大量请求。

这些操作都可以使用单个命令执行，可以按原样复制和粘贴：

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node 1-server-with-slow-function.js
```

我们拆分一下这个命令：
  - `clinic flame` 调用 `flame` 命令行工具。
  - `--on-port` 参数指定在服务开始监听端口后马上执行的脚本，即 `autocannon localhost:$PORT`。
  - 脚本中的 `$PORT` 变量为服务器开始侦听的第一个端口。
  - `--` 后面的命令用于启动我们要分析的服务，比如这里的 `node 1-server-with-slow-function.js`。

这行命令会运行三个可执行文件：父可执行文件 `clinic flame`, `--on-port` 中的可执行文件 `autocannon`，以及可执行文件 `Node`。

运行该命令后，将对该进程进行 10 秒的负载测试（10 秒是 autocannon 的默认测试持续时间），然后将结果输出为HTML文件，并在浏览器中自动打开的。

生成的 HTML 会被渲染为下面的这样：

![](https://clinicjs.org/static/60ec54d4c38a25cb8c567ccf71a6c187/65be2/03.png)

这就是所谓的火焰图