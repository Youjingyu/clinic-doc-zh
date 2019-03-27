# 解决事件循环问题

在[查看结果](./reading_a_profile.html)中，我们学会了如何理解 Doctor 给我们的信息，以及为什么会提供这些信息。现在我们来看看解决问题的方法。

> In Reading A Profile, we saw how to understand the information Doctor is giving us, and why it recommends what it does. Now we'll look at fixing the problems.

# 咨询 Doctor

我们已经查看了在[首次分析](./first_analysis.html)中得到的分析结果，即通过 `node-clinic-doctor-examples` 仓库中的示例 `slow-event-loop` 得到的结果。我们已经知道是同步代码阻塞了事件循环，Doctor 建议我们使用 `clinic flame` 进一步分析问题。

> We've already read the profile we created in First Analysis, from the slow-event-loop example server in node-clinic-doctor-examples. We were told that our problem was slow synchronous code blocking the event loop, and Doctor recommended using clinic flame to identify the problem.

![](https://clinicjs.org/static/474986b77bde7a332535c5a4a68cb27d/091f6/04-N.png)

# 遵照处方

我们可以使用与 Doctor 相同的命令创建 Flame 的分析结果，只是将 `doctor` 替换为 `flame`：

> We can create a Flame profile with a command that is the same as for Doctor, but swapping flame in for doctor:

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node slow-io
```

输出可能像这样：

> Our output looks something like this:

![](https://clinicjs.org/static/2382acf296f9b09248fd36271de55118/e936c/05-A.png)

Clinic Flame 默认选中阻塞事件循环时间最长的函数调用，并且已经确定阻塞事件循环最久的函数是 `sleep`，在 `slow-event-loop/index.js` 的第 12 行。

> Clinic Flame by default selects the function call that spends most time blocking the event loop, and has identified that the function spending the most time blocking the event loop is sleep, on line 12 of slow-event-loop/index.js.

`node-clinic-doctor-examples` 使用非常简单的示例服务器：在这个例子中，我们不需要深入研究在 [Clinic Flame 文档](./flame/preface.html)中详述的图表或高级功能。

> node-clinic-doctor-examples uses very simple example servers: for this example, we don't need to dig deeper into the diagram or advanced features detailed in the Clinic Flame documentation walkthrough.

我们可以直接打开 `index.js` 寻找 Flame 指出的可修复瓶颈所在的行。

> We can immediately open up index.js and look for fixable bottlenecks in the line Flame has picked out:

```javascript
server.get("/", function(req, res, next) {
    sleep(30);
    res.send({});
    next();
});
```

`sleep(30)` 的调用就是 flame 指出的点。我们看看 `sleep` 函数做了什么：

> That sleep(30) call is the one flame picked out. Let's see what this sleep function does:

```javascript
function sleep(ms) {
    const future = Date.now() + ms;
    while (Date.now() < future);
}
```

可以很明显地看出为什么这段代码导致了事件循环的延迟。

> It's clear why this is causing an event loop delay.

事件循环是单线程的：一次只处理一个操作。到达该服务器的每个请求都会在事件循环队列中添加一个函数，其中包含一个 `while` 循环，该循环将重复迭代 30 毫秒。这些同步函数都阻塞了事件循环：单线程忙于处理 `while` 循环，无法处理任何其他操作。

> The event loop is single-threaded: only one operation is processed at a time. Each request to this server queues a synchronous function on the event loop containing a while loop which will repeatedly iterate for 30 milliseconds. Each of these blocks the event loop: the single thread is busy iterating the while loop, unable to process any other operations.

如果阻塞的代码来自异步延时操作，例如来自 `setTimeout`，则不会阻止事件循环。包含 `setTimeout` 的同步代码会继续执行并完成，然后传递给 `setTimeout` 的回调函数将在一个未来的单独事件循环周期中调用。

> If the pause was from an asynchronous timeout, like from setTimeout, the event loop would not be blocked. The synchronous code containing setTimeout would continue and complete, and then the callback function passed to setTimeout would be called in a separate, future tick of the event loop.

然而，`sleep` 完全是同步的。事件循环会被阻塞，直到它执行完成为止。

> This sleep function, however, is entirely synchronous. The event loop is blocked until it completes.

# 治愈疾病

我们减小循环的时间，将传给 `sleep` 的参数修改为 `1` ：

> Let's reduce the duration of the loops, changing the arg passed to sleep to 1:

```javascript
server.get('/', function (req, res, next) {
  sleep(1)
```

保存，然后重新生成分析结果：

> ...save, and recreate the profile:

```bash
clinic doctor --on-port 'autocannon localhost:$PORT' -- node slow-event-loop
```

现在分析结果中没有检测任何问题。所有东西都是蓝色的，图表看起来很健康，并且 Doctor 的建议面板中也显示 "Everything looks good!"。

> The profile now detects no issues. Everything is blue, the graphs look healthy and Doctor's Recommendations Panel is cheerfully telling us that "Everything looks good!".

![](https://clinicjs.org/static/df6c29521ac94bc3fb55bf7b083af5e2/091f6/05-B.png)

这是一个非常简单的示例服务器。在更复杂的应用程序中，我们通常需要进一步使用 Clinic Flame，以确定瓶颈的原因。[Clinic Flame 文档](../flame/preface.html)中提供了有关如何执行此操作的详细示例。

> This is a very simple example server. In a more complex application, we would normally need to explore the Clinic Flame profile further to hone in on the cause or causes of the bottleneck. Detailed examples of how to do this are available in the Clinic Flame documentation.
