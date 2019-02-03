# 减小火焰图大小

尽管火焰图主要是通过可视化堆栈顶部的指标来突出显示瓶颈，但它们也可用于了解应用程序的复杂性。
> While Flamegraph's highlight bottlenecks primarily through visualizing the top-of-stack metric, they can also be used to understand application complexity.

如果火焰图有很多高涨堆栈，这也可以被认为是分布式瓶颈。如果我们可以找到减少堆栈大小的方法，比如通过删除不必要的层，这也可以提高应用程序性能。
> If a flamegraph has a lot of high rising stacks, this can also be thought of as a distributed bottleneck. If we can find ways to reduce the graph size, perhaps by removing unnecessary layers, this can also improve application performance.

一个简单的优化方式就是替换我们使用的库，这些替代库在主逻辑中（the hottest paths）创建和调用更少的函数。
> One potentially low hanging fruit can be replacing libraries with simpler or smarter alternatives that create and call less functions in the hottest paths. 

再看看我们通过 `2-server-with-optimized-function.js` 生成的火焰图。
> Let's take a look at the flamegraph we already generated for 2-server-with-optimized-function.js:

![](https://clinicjs.org/static/de4a5813f3c6b55a8713462e117d7a7c/65be2/06-A.png)

在 `3-server-with-reduced-call-graph.js` 中，我们把 Express 切换为 [Fastify](https://www.fastify.io/)。
> In 3-server-with-reduced-call-graph.js we change the web framework from Express to Fastify.

我们再生成 `3-server-with-reduced-call-graph.js` 的火焰图：
> Let's generate a flamegraph for 3-server-with-reduced-call-graph.js:

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node 3-server-with-reduced-call-graph.js
```

我们来看结果：
> Let's take a look at the resulting flamegraph:

![](https://clinicjs.org/static/d81062495d5e738b07588125894b8263/65be2/07-A.png)

这显然更简单，并且更少的蓝色意味着更少执行 `node_modules` 中的代码。右侧有一个高大的蓝色柱子，但它非常细，说明虽然它存在复杂性，但速度很快。但是，在 `handleRequest` 仍存在一些热函数，所以我们还可以做更多的优化。
> This is clearly simpler, and there's much less blue meaning less activity in dependencies. There's a tall blue column on the right, but it's very thin: therefore there is complexity there, but it is fast. There are, however, some hot frames under handleRequest, so there may still be more we can do.

首先，我们必须确定性能确实已经有所改善。减少函数调用和复杂性并不总能使应用变快。我们可以使用 `autocannon` 对比 `2-server-with-optimized-function.js` 和 `3-server-with-reduced-call-graph.js` 的区别：
> First, however, we must confirm that performance really has improved. Reducing function calls and complexity doesn't always result in a faster application. We can measure the difference between 2-server-with-optimized-function.js and 3-server-with-reduced-call-graph.js using autocannon:

![](https://clinicjs.org/static/ebc8088576d457c97993adb80c628050/6b9e0/07-B.png)

可以看到性能有巨大的提升。通过替换到专注于降低函数火焰图复杂性的框架，性能得到了显着改善。事实上，我们现在可以处理接近两倍的请求。
> That's a huge improvement. By swapping to a framework that focuses on reducing the function graph complexity, performance has significantly improved. In fact, we can now serve close to double the amount of requests.