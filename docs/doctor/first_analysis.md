# 首次分析

万事俱备，我们来看看第一个实例——slow-event-loop。首先我们在实例项目目录下的命令行运行`node slow-event-loop`来让它跑起来。进程开始后，我们便可通过浏览器访问`http://localhost:3000`进行查看了。
> We're now ready to profile one of the example applications. For the first example, we will use slow-event-loop. First, let's confirm that it is ready and working by running node slow-event-loop from inside the examples directory. Once the process seems to be running we can visit http://localhost:3000/ in a browser to check.

浏览器中仅仅显示了一个空的JSON `{}`。我们在命令行中按 Ctrl+C 关闭`slow-event-loop`服务器。
> We should see some basic output in the browser, like {}. Ctrl-C in the command line to close the slow-event-loop server.

既然我们要对这个服务器进行负载测试，那么显然对只处理一个请求的服务器进行分析并没有什么卵用，更不用说处理多个请求的情况了。因此我们建议使用基准测试工具`autocannon`
> This is a server, so we need to apply load. Profiling a server handling just one request doesn't give us much data or indication of how it performs when handling many requests. We recommend the benchmarking tool Autocannon.

我们在使用 clinic 时也会在实例文件目录中执行`autocannon`, 二者密不可分，因此我们先在全局进行安装：
> We will execute autocannon in the example application directories when we call the clinic executable, so let's install it globally, with the following command:

```bash
npm install -g autocannon
```

要对服务器进行负载测试，我们需要使用 Doctor 运行它，并在它开始侦听端口时立即调用 `autocannon`。只要服务器准备好处理请求并且 Doctor 也准备好收集数据，就会使用大量请求轰炸服务器。
> To load-test the server, we want to run it with Doctor, and point autocannon at it as soon as it starts listening on a port. This will bombard the server with requests, as soon as it is ready to handle them and Doctor is ready to collect data.

我们用下面这个命令完成所有操作，它会自动分配正确的端口：
> Let's do all that with this single command, which automatically assigns the correct ports:

```bash
clinic doctor --on-port 'autocannon localhost:$PORT' -- node slow-event-loop
```

我们拆分一下这个命令：
> Let's break this command down:

- `clinic doctor` 调用 Doctor 命令行工具。
> The clinic doctor portion invokes the Doctor command tool.
- --on-port 参数指定在服务开始监听端口后马上执行的脚本，即 `autocannon localhost:$PORT。`
> The --on-port flag will execute the supplied script as soon as the server starts listening on a port.
- 脚本中的 `$PORT` 变量是服务器开始侦听的第一个端口。
> The $PORT variable in that script is set to the first port that the server began listening on.
- `--` 后面的命令用于启动我们要分析的服务，比如这里的 `node slow-event-loop`。
> Everything after the double-dash (--) is the command which starts the server that we want to profile, in this case node slow-event-loop.

这行命令会运行三个可执行文件：父可执行文件 `clinic doctor`, `--on-port` 中的可执行文件 `autocannon`，以及可执行文件 `node`。
> This one command runs three executables: the clinic doctor parent executable, the autocannon executable in --on-port and the node executable.

运行该命令后，`slow-event-loop` 服务器将被 10 个并发连接的请求命中 10 秒（autocannon 的默认值）。然后将结果编译成单个 HTML 文件，该文件会在浏览器中自动打开。
> Upon running the command, the slow-event-loop server will be hit by requests from 10 concurrent connections for 10 seconds (as per autocannon defaults). then the results be compiled into a single HTML file that should automatically open in the browser.

生成的 HTML 类似于下面这样：
> The resulting HTML should look similar to the following:

![](https://clinicjs.org/static/d699a3eb16a8065de8aecbeb14f527d5/ace55/03.png)
