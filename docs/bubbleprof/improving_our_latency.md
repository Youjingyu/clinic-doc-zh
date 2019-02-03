# 改善延迟

在我们的示例中，我们已经根据数据中的 modified（datetime）属性添加了递增的索引。第二个示例 `2-server-with-index.js` 使用了包含索引的集合。我们再针对这个服务器运行我们的基准测试，看看是否可以进一步改进。
> In our example, we have already added an ascending index based on the modified (datetime) attribute in our data. This indexed collection is used by the second example - 2-server-with-index.js. Let's run our benchmark against this server and see if we can improve further.

```bash
clinic bubbleprof --on-port 'autocannon -c 5 -a 500 localhost:$PORT' -- node 2-server-with-index.js
```

![](https://clinicjs.org/static/19688d3ad91aec599a91e6fee75a2ba8/71c55/07-A.png)

好多了。我们可以看到 mongo 和 fastify 气泡的时间减少了大约三分之一。查看时间轴，还可以注意到，为这 500 个请求提供服务的总时间从15秒减少到9秒。时间线本身也变得更加密集，这意味着我们在响应请求之间等待的时间更少。换句话说 - 完成相同数量的工作花费的时间更少。
> Much better. We can immediately see that the time in mongo and fastify bubbles has dropped by about one third. Looking at the timeline we can also notice that the total time to serve those 500 requests went down from 15 seconds to 9 seconds. Also the timeline itself became denser, meaning we spend less time waiting between serving the requests. In other words - it took less time to do the same amount of work.

怎样才能做进一步的改善？我们先来探讨一下这些气泡。左边的 mongodb 泡泡基于 mongodb npm 模块，我们可能不能做什么来提升第三方依赖。这也同样适用于顶部的 fastify 泡沫。
> How can we improve this even further? Let's explore the bubbles a bit. The mongodb bubble on the left is based on the mongodb npm module and there is probably not much we can do to improve this 3rd party dependency. Same goes for the fastify bubble on the top.

让我们深入到底部的查询气泡：
> Let's dive in to our query bubble at the bottom:

![](https://clinicjs.org/static/f4df82ba4c418ea34e1e7cb96bacfc67/71c55/07-B.png)

这个气泡清楚地表明我们的查询是按照一个接一个的顺序执行的。但是，如果我们稍微考虑一下，实际上没有必要这样做。这两个查询都是独立的，因此我们可以轻松地并行执行它们。这样做会使这个气泡变得更小，并有望提高性能。
> This bubble clearly shows that our queries are executed in series as one follows the other. However if we think about this a little bit, there is actually no need for that. Both of the queries are independent so we can easily execute them in parallel. Doing that would make this bubble much smaller and hopefully increase performance.