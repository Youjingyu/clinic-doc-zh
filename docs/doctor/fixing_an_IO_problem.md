# 解决 I/O 问题

在[查看分析结果](./reading_a_profile.html)中，我们看到 CPU Usage 图可以反应分配给其他进程的 Node.js I/O（输入/输出）操作问题，例如慢速数据库查询或 [libuv](https://libuv.org/) 分发的文件写入。我们通过一个例子更详细地看一下。
> In Reading A Profile, we saw that the CPU Usage graph can indicate problems with Node.js I/O (Input/Output) operations delegated to other processes, such as slow database queries or file writes delegated by libuv). Let's look at that in more detail with an example.

# 咨询 Doctor 

在 `node-clinic-doctor-examples` 中有一个用于此问题的示例服务器，名为 `slow-io`。假设我们已经按照 [准备](./getting_ready.html) 和 [首次分析](./first_analysis.html) 中的描述配置好了所有内容，然后从该服务器生成一个Clinic Doctor 分析结果：
> There is an example server for this problem in node-clinic-doctor-examples, called slow-io. Assuming we have everything set up as described in Getting Ready and First Analysis, let's create a Clinic Doctor profile from that server:

```bash
clinic doctor --on-port 'autocannon localhost:$PORT' -- node slow-io
```

输出应该是这个样子：
> The output should look something like this:

![](https://clinicjs.org/static/62113e7db45b2c219f16984d858856ab/ace55/06-A.png)

CPU Usage 图被红色突出显示。它显示了几个峰值，但大多数都很低。CPU 活动少于我们对繁忙服务器的期望。建议面板解释说，这很可能是由于异步操作缓慢造成的：我们的应用正在等待外部 I/O 来 resolve promise 或触发回调。
> The CPU Usage graph is highlighted in red. It shows several spikes, but is mostly low. There is less CPU activity than we'd expect from a busy server. The Recommendations Panel explains that this is likely caused by slow asynchronous operations: our application is waiting for external I/O to resolve promises or trigger callbacks.

这与我们在[解决事件循环问题](./fixing_an_event_loop_problem.html)时看到的问题非常不同。建议面板建议我们使用另一个 Clinic 工具，`clinic bubbleprof`。
> This is a very different problem to the one we saw while Fixing an event loop problem. The Recommendations Panel advises that we use another Clinic tool, clinic bubbleprof.

# 遵照处方

我们可以使用与 Doctor 相同的命令创建 Flame 的分析结果，只是将 `doctor` 替换为 `bubbleprof`：
> We can create a Bubbleprof profile with a command that is the same as for Doctor, but swapping bubbleprof in for doctor:

```bash
clinic bubbleprof --on-port 'autocannon localhost:$PORT' -- node slow-io
```

输出结果如下：
> Our output looks something like this:

![](https://clinicjs.org/static/dc0157af64c0b7e67516f66208a7c5fc/ace55/06-B.png)

`node-clinic-doctor-examples` 使用非常简单的示例服务器，因此现在我们只需要查看主视图，而不是 [Clinic Bubbleprof 文档](../bubbleprof/preface.html)中详细介绍的高级功能。
> node-clinic-doctor-examples uses very simple example servers, so for now we'll only need to look at the main diagram, not the more advanced features detailed in the Clinic Bubbleprof documentation walkthrough.

主视图显示了一个忙碌的 `http.connection`，调用了一个 `timeout`，然后并行地调用了更多的 `timeout`。第一个 `timeout` 看起来很关键 - 应用程序的其余部分从第一个 `timeout` 中分支出来。
> The main diagram shows a busy http.connection, calling a timeout, which then calls more timeouts in parrallel. That first timeout looks key - the rest of the application branches off from it.

这可能就是我们的瓶颈。
> It could be our bottleneck.

单击打开它会显示两个部分。通过单击较长的部分会为我们指出了一些代码：函数 `async.series`，我们应用中的文件 `./index.js`，第 9 行，第 16 列：
> Clicking on it opens it out to show two parts. Clicking on the longer part points us to some code: a function async.series, in our application, file ./index.js, line 9, column 16:

![](https://clinicjs.org/static/3cf7340f5ac008ac9f925ee992d1fd79/4e2b5/06-C.png)

如果我们打开 `node-clinic-doctor-examples/slow-io/index.js` 寻找那一行，我们会看到：
> If we open node-clinic-doctor-examples/slow-io/index.js and find that line, we see:

```javascript
function awaitData(callback) {
  async.series(
    [
      done1 => setTimeout(done1, Math.random() * 1000),
      done1 =>
        async.parallel(
          [
            done2 => setTimeout(done2, Math.random() * 1000),
            done2 => setTimeout(done2, Math.random() * 1000),
            done2 => setTimeout(done2, Math.random() * 1000),
            done2 => setTimeout(done2, Math.random() * 1000),
            done2 => setTimeout(done2, Math.random() * 1000)
          ],
          done1
        )
    ],
    callback
  )
}
```

这就是Node.js正在等待的 - 链式 timeout。
> This is what Node.js is waiting on - chained timeouts.

如果延迟操作是一个外部进程，如慢速数据库查询，在 Node.js 看到的现象也是相同的。我们无法看到外部操作中究竟发生了什么，但我们可以识别 Node.js 正在等待的异步操作。
> If the delay was an external process like a slow database query, the clues visible to us within Node.js would be the same. We can't see what exactly is happening within the external operation, but we can identify which asynchronous operation Node.js is waiting for.

# 治愈疾病

让我们减少 timeout 的时间，将传给 `setTimeout` 的参数从 `1000` 修改为 `1`，从而模拟显著地提升外部 I/O 速度。
> Let's reduce the duration of the timeouts, changing the second argument passed to setTimeout from 1000 to 1. This simulates dramatically speeding up the external I/O:

```javascript
function awaitData(callback) {
  async.series(
    [
      done1 => setTimeout(done1, 1),
      done1 =>
        async.parallel(
          [
            done2 => setTimeout(done2, 1),
            done2 => setTimeout(done2, 1),
            done2 => setTimeout(done2, 1),
            done2 => setTimeout(done2, 1),
            done2 => setTimeout(done2, 1)
          ],
          done1
        )
    ],
    callback
  )
}
```

保存，然后重新生成分析结果：
> We then save, and recreate the profile:

```bash
clinic doctor --on-port 'autocannon localhost:$PORT' -- node slow-io
```

现在的分析结果没有检测到任何问题。所有东西都是蓝色的，图表看起来很健康，CPU 处于活跃状态。Doctor 的建议面板告诉我们 "Everything looks good!"。
> The profile now detects no issues. Everything is blue, the graphs look healthy, the CPU is active, and Doctor's Recommendations Panel is cheerfully telling us that "Everything looks good!".

![](https://clinicjs.org/static/3f07f6fec2bad9ab6c4cef3b164cbd62/ace55/06-D.png)

这是一个非常简单的示例服务器。在更复杂的应用程序中，我们通常需要进一步使用 Clinic Bubbleprof，以确定瓶颈的原因。[Clinic Bubbleprof 文档](../bubbleprof/preface.html)中提供了有关如何执行此操作的详细示例。
> This is a very simple example server. In a more complex application, we would normally need to explore the Clinic Bubbleprof profile deeper to hone in on the cause or causes of the bottleneck. Detailed examples of how to do this are available in the Clinic Bubbleprof documentation.

### 接下来

我们现在已经熟悉如何使用 Doctor 来识别问题的类型。下一步是学习更多关于这些工具的知识，我们可以使用它们来优化特定的代码。
> We're now familiar with how to use Doctor to identify the type of problem. The next step is learning more about those tools we can use to hone in on specific code.

现在我们准备继续学习以下内容的练习文档：
> We're now ready to move on to the walkthrough documentation for:
- [Clinic Flame](../flame/preface.html)，用于识别慢速同步代码
> Clinic Flame, for identifying slow synchronous code
- [Clinic Bubbleprof](../bubbleprof/preface.html)， 用于在异步代码中查找问题
> Clinic Bubbleprof, for finding problems in asynchronous code