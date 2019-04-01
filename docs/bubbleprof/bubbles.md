# Bubbles（气泡）

让我们深入了解这些气泡意义以及如何解释它们。
> Let's dive into what these mean and how to interpret them.

- 一个气泡代表一组异步操作。
> A bubble represents a group of async operations.
- 在一组异步操作中花费的时间越多，气泡越大。
> The more time spent within a group of async operations, the bigger the bubble is.
- 气泡之间的线越长，说明它们之间存在越大的延迟。
> The longer the lines between bubbles, the more latency exists between them.

气泡基于一些启发式方法将异步时间分组。
> The way bubbles group together async time is based on a couple of heuristics.

已分析的代码分为3个区域 - 用户区（正在分析的应用程序），依赖项（第三方模块）和 Node 核心代码。
> Profiled code is grouped into 3 areas - userland (the application being profiled), dependencies (3rd party modules), and node core.

每当异步操作从一个空间跨越到另一个空间时，它就会定义一个气泡的边界。
> Whenever an async operation crosses from one space into another it defines the boundry of a bubble.

点击其中的气泡，可以显示它由哪些气泡组成。
> Clicking on a bubble steps inside it to show the bubbles it's composed of.

例如，单击底部名为 mongojs 的黄色气泡。从 UI 界面中可以看到它包含用户区代码并且是浅蓝色的。
> For example, try clicking on the yellow bubble at the bottom called mongojs. The UI tells us it contains userland code as well as it has a lightblue color.

![](https://clinicjs.org/static/0f556ce11f2e75b01aa17f083ce1bf5e/71c55/04-A.png)

在这里，我们看到有两个较小的气泡。如果我们点击第一个，因为它没有子气泡，所以会显示创建它的操作的堆栈跟踪。
> In here we see that there are two smaller bubbles. If we click on the first one it'll show the stack trace for the operation that created this as it has no sub bubbles.

这里的堆栈跟踪实际上是多个异步操作的组合堆栈。用户区代码会突出显示，以帮助你定位触发此气泡的代码。在这个例子里，它告诉我们它来自 `1-server-with-no-index.js` 中的第10行。
> This stack trace is actually a combined stack trace by multiple async operations. The userland code is highlighted to help you navigate to your code that triggered this bubble. In this case it tells us that it was from line 10 in 1-server-with-no-index.js.

如果我们查看源文件，会看到第10行看起来像这样：
> If we look into the source file we'll see that line 10 looks like this:

```javascript
col.find().sort({modified: -1}).limit(5, function (err, newest) {
```

这是有道理的，因为这是一个 mongodb 查询。实际上，如果我们查看页面上的其他黄色气泡，我们会看到它在其回调内包含了对下一个查询的引用。这些链接表明这些气泡是串行执行的。
> Which makes sense, as this is a mongodb query. In fact if we look at the other yellow bubble on the page, we'll see that it contains a reference to the next query inside its callback. This link indicates that these bubbles are executed in series.