# 首次分析

现在我们准备进行分析了。我们先使用 repo 中的第一段服务器代码 `1-server-with-no-index.js`。它包含一个小型服务器，可以查询 mongodb 中的 5 个最新 node 模块和 5 个最旧的 node 模块。
> Now we're ready to run an analysis. Let's try with the first server in the repo, 1-server-with-no-index.js. It contains a small server that queries mongodb for the 5 newest and 5 oldest node modules.

你可以通过简单地执行 `node 1-server-with-no-index.js` 来运行它，然后在浏览器中访问 `localhost:3000` 进行查询。如果它返回一个 JSON，说明一切正常！
> You can run it by simply doing node 1-server-with-no-index.js and query it by going to localhost:3000 in your browser afterwards. If it returns a JSON response things are working!

我们先尝试使用 Bubbleprof 分析我们的服务器，看看是否能找到瓶颈。为此，我们需要一个可以快速向服务器发送大量 http 请求的工具。如果你没有，`autocannon` 简单易用。你可以从npm安装它。
> Let's try and profile the server with Bubbleprof to see if we can find any bottlenecks. To do that we need a tool that can send a ton of http requests against the server fast. If you don't have one, autocannon is easy to use. You can install it from npm.

```bash
npm install -g autocannon
```

为了运行分析，我们需要用 Bubbleprof 运行服务器，当服务器准备就绪时 - 即开始监听端口时 - 再使用 autocannon 向它发送大量请求。这些操作都可以在一个命令中完成：
> To run the analysis we want to run the server with Bubbleprof and when the server is ready - i.e. starts listening on a port - we want to send a ton of requests to it using autocannon. We can do all that in this one single command:

```bash
clinic bubbleprof --on-port 'autocannon -c 5 -a 500 localhost:$PORT' -- node 1-server-with-no-index.js
```

在运行它之前，我们先解释一下这段命令的意思。最后的 `--` 是开始运行服务器的命令。`--on-port` 标志是一旦服务器开始监听端口就执行的脚本。该脚本中的 `$PORT` 变量是服务器开始监听的端口。当 `--on-port` 指定的脚本运行结束时，Bubbleprof 将会分析从服务器收集的数据，并在 html 页面中打开分析结果。
> Before running it, let's explain what's happening in there. The part after -- is simply the command to start running your server. The --on-port flag is a script that is executed as soon as your server starts listening on a port. The $PORT variable in that script is set to the port your server started listening on. When the --on-port scripts ends, the Bubbleprof analysis will run on the data collected from the server and open the results in a html page.

你可能还注意到 `-c 5 -a 500` 这个参数。这两个参数使 autocannon 发送固定数量的请求（通过 5 个连接总共发出 500 个请求）。默认情况下，autocannon 会尝试压测 10 秒钟，然后立即停止。虽然这对于测试负载非常有用，但这使得很难观察到单个组件的性能改进，因为大多数异步操作在 95％ 的分析时间内都是活跃的。
> You may have also noticed -c 5 -a 500 flags. This tells autocannon to send a fixed amount of requests (5 connections making a total of 500 requests). By default autocannon tries to apply pressure for full 10 seconds, then suddenly stops. While very useful for testing load tolerance, this would make it difficult to observe performance improvements in single components, as most async operations would be active for 95% of the profiling time.

现在运行这个命令。
> Now try and run it

运行完成大约需要15秒。之后会打开一个类似于下面的 html 页面：
> It'll take about 15 seconds to run. Afterwards a html page similar to this should open:

![](https://clinicjs.org/static/0d21aa67f80041328f996853361c0e89/71c55/03-A.png)

看到这张图，你首先想到的可能类似于“好多气泡啊！”。
> First thought is probably something similar to "That's a lot of bubbles!".