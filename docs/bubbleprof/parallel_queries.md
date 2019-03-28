# 并行查询

第三个示例，`3-server-with-index-in-parallel.js` 与第二个示例类似，但是并行执行查询。我们再次分析一下。

> The third example, 3-server-with-index-in-parallel.js is similar to second example, but executes the queries in parallel. Let's profile it again.

```bash
clinic bubbleprof --on-port 'autocannon -c 5 -a 500 localhost:$PORT' -- node 3-server-with-index-in-parallel.js
```

![](https://clinicjs.org/static/f5b4d268888c3f34df7471756935735d/71c55/08-A.png)

现在我们没有一个单独的 mongodb 查询气泡，而是有两个小的，每个都在顶部的 fastify 气泡的侧面。这要好得多，因为这意味着我们并行执行了更多的异步操作。

> Now instead of having a simple mongodb query bubble we have two tiny ones each flanking our fastify bubble on the top. This is much better as it means we are doing more async operations in parallel.

从气泡和时间轴上，可以看到总时间下降了三分之一。

> Once again we can see a drop in the total times by further one third. This is reflected both in the bubbles and the timeline.

就目前而言，这种气泡布局接近最佳。我们几乎没有用户空间代码占用任何时间，这意味着大部分时间花在第三方模块上 - 我们假设我们对它们的使用也是最优的。

> As it stands, this bubble layout is close to optimal. We have almost no userland code taking up any time anymore, which means most time is spent in 3rd party modules - which we assume to be pretty optimal for their usecase as well.

那么更进一步的改进就是摆脱 mongodb 气泡或 fastify 气泡了。摆脱 fastify 会很难，因为我们的应用程序是一个 http 服务器，而 fastify 已经非常擅长做 http 相关的东西了。为了摆脱 mongodb 气泡，我们将不得不用数据库做更少的事情。

> The main way to improve this now, would be to get rid of the mongodb bubble or fastify bubble entirely. Getting rid of fastify would be hard as our application is a http server and fastify is already really good at doing http stuff. To get rid of the mongodb bubble we would have to do fewer things with the database.
