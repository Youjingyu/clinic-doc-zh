# 高级分析

在我们最新的火焰图中仍然有一些热块：
> We still have some hot blocks in our latest flamegraph:

![](https://clinicjs.org/static/d81062495d5e738b07588125894b8263/65be2/07-A.png)

没有最热的块涉及到我们的代码，但让我们花点时间思考一下发生了什么。
> None of the hottest blocks refer to any of our code, but let's take a minute to think through what's happening.

最热块的是 `_stream_writable.js` 中的 `clearBuffer`，这是 Node 的核心代码，由于我们的目标不是优化 Node 核心代码，因此我们继续看下一个最热的块：`handleRequest`。
> The hottest is clearBuffer in _stream_writable.js. This is part of Node core. Since the goal here isn't to begin optimizing Node core, let's look at the next hottest block: handleRequest.

我们可以展开 `handleRequest` 块，如下所示：
> We can expand the handleRequest block to look something like the following:

![](https://clinicjs.org/static/c387182660b3c2dd9e81143b5f5554ef/65be2/08-A.png)

看一下这个子视图中最热的三个函数：
> Looking at the three hottest functions in this sub-view:

1. Node.js 的 `clearBuffer` 是第一个，它占用了 `onSendEnd` 内部的大部分时间。如上所述，优化它可能会很困难。
> Node.js's clearBuffer is first and accounts for most of the time spent inside onSendEnd. As discussed, optimizing that will probably be difficult.
2. 第二个最热的是 Fastify 中的函数 `handleRequest`，它有很多子函数块，所以显然非常复杂。
> Second hottest is the Fastify function handleRequest, which has many children so is clearly quite complex.
3. 第三是我们自己的函数 - 但我们已经对其进行了优化。
> Third is in our own payload function - but we've already optimized that.

那么，为什么在 `handleRequest` 中花了那么长时间？如果我们点击 `copy path` 按钮来查看 Fastify 的代码，会发现没有什么明显的问题，因为 Fastify 已经针对性能做了很好的优化。
> So, why are we spending a long time inside handleRequest? If we click copy path to look at the Fastify code, there's nothing obviously wrong, and we know Fastify is quite well optimized for performance.

是我们遗漏了什么东西吗？让我们打开选项菜单并勾选未选中的 "V8" 按钮，然后火焰图会显示通常隐藏在 V8 JavaScript 引擎内的操作：
> Maybe something is missing? Let's open the Options menu and tick the unticked "V8" button, showing operations inside the V8 JavaScript engine that are normally hidden:

![](https://clinicjs.org/static/86862789c949579d6b975ee4a5642c54/65be2/08-B.png)

火焰图中的间隙几乎完全消失，并出现了一个新的块（上面截图中选中的块），它执行了 `T v8::internal::Builtin_JsonStringify`。这说明它是 v8 中的 c++ 函数，名为 `Builtin_JsonStringify`。显然，这与 `JSON.stringify()` 有关。
> The gap almost completely disappears, and a new block appears (selected in the above screenshot), starting T v8::internal::Builtin_JsonStringify. This means it refers to a C++ function inside V8, named Builtin_JsonStringify. Clearly, this is related to JSON.stringify().

需要知道的是，我们熟悉的 JavaScript API `JSON.stringify()`和 `JSON.parse()` 不是通过 V8 采样，而是直接跳到底层的 C ++ 实现。
> It's worth knowing that the JavaScript wrappers JSON.stringify() and JSON.parse() that we are familiar with are not sampled directly by V8, which instead skips straight to the underlying C++ implementation.

展开它，我们看到 V8 在对某些 JSON 进行 stringify 时需要执行许多步骤。
> Expand that, and we see V8 needs to do many, many steps when trying to stringify some JSON.

![](https://clinicjs.org/static/3ba323f173ed19f21f7ed89568f36154/65be2/08-C.png)

在这种情况下，我们需要关注一个调用许多微任务的低效父函数，而不是关注一个“热”函数。每个微任务看起来都很快 - 问题是，他们加起来会耗费很多时间。
> This is a case where instead of focussing on one "hot" function, we need to focus on an inefficient parent function that is calling many micro-tasks. Each one looks pretty fast - the problem is, they add up to a lot of time.

为什么这里会做 JSON 转为字符串的操作？这是因为我们发送了一个对象，Express 和 Fastify 都会自动序列化传递给 send 方法的对象。
> Why is JSON stringification happening here? It's because we send an object, and both Express and Fastify will automatically serialize an object passed to their send method.

当我们关闭内联优化时，这个瓶颈会变得更加清晰。
> This bottleneck becomes a lot clearer when we turn off inlining.

运行下面的命令：
> Let's run the following command:

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node --no-turbo-inlining 3-server-with-reduced-call-graph.js
```

这会生成下面的火焰图：
> This will produce a flamegraph similar to the following:

![](https://clinicjs.org/static/b7fcc18a00ca422e08241f7ee7aec38c/0b628/08-D.png)

我们发现一个新的第二热函数（在 Node 核心代码之后）- `serialize`，之前由于被 V8 内联而隐藏了。
> We have a new second-hottest function (after the Node core one) - serialize. This was previously hidden due to being inlined by V8.

由于没有内联函数，`serialize` 函数变为更加明显的瓶颈。而在内联中，热块更多地位于堆栈的顶部，因为它们代表了其他几个已经内嵌到其中的函数。
> With none of the functions inlining, it becomes a lot more apparent that the serialize function is a bottleneck. Whereas with inlining the hot blocks were seen more on the top of the stack because they represent several other functions that have also been inlined into them.

在 `The 4-server-with-manual-serialization.js` 中，将 `payload` 函数的 23 行的 `return {date, id}` 修改为：
> The 4-server-with-manual-serialization.js alters the line 23 in the payload function from return {date, id} to:

```javascript
return `{"date": ${date}, "id": "${id}"}`
```

注意注意的是，在许多情况下，这种优化可能是不合适的，例如，由于安全问题，必须对输入转义的情况。一种替代手动序列化的方法使用基于 schema 的序列化方案 [fast-json-stringify](http://npm.im/fast-json-stringify)，这种方式仍然比使用 `JSON.stringify` 快。Fastify Web 框架默认支持基于 schema 的序列化，请参阅 [Fastify 的序列化文档](https://github.com/fastify/fastify/blob/master/docs/Validation-and-Serialization.md#serialization)。
> It should be noted here that this technique may be inappropriate in many cases, for instance where escaping inputs is crucial to security. An alternative to manual serialization which is still faster than using JSON.stringify is schema-based serialization using fast-json-stringify. The Fastify web framework also supports schema-based serialization by default, see Fastify's Serialization Documentation.

我们再次运行  Clinic Flame 为 `4-server-with-manual-serialization.js` 生成一个火焰图：
> Let's run Clinic Flame to create a flamegraph for 4-server-with-manual-serialization.js:

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node 4-server-with-manual-serialization.js
```

结果如下: 
> This should give something like:

![](https://clinicjs.org/static/caff578ccade06aca99efed3c1a45dff/65be2/08-E.png)


我们可以看到最热的块是 Node 核心函数 `Socket._writeGeneric`，它由 `clearBuffer` 调用。它与之前的 Node 核心瓶颈相同，只是在这个采样周期内，V8 引擎没有将 `Socket._writeGeneric` 内联到 `clearBuffer` 中。
> We can see the the hottest block is a Node core function, Socket._writeGeneric, which is called by clearBuffer. It's same Node core bottleneck as before, it's just that in this sampling period the V8 engine didn't inline Socket._writeGeneric into clearBuffer.

让我们使用 `autocannon` 来确定它对服务器性能的影响：
> Let's use autocannon to determine the effect this has had on server performance:

![](https://clinicjs.org/static/c12e04a80202e977607f373c110ff2d6/366e0/08-F.png)

可以看到，我们已经实现了大约10％的改进。
> We've achieved roughly another 10% improvement.

现在，对应用程序的进一步优化变得越来越具有挑战性，因为 Node 核心代码中的函数已成为主要瓶颈。我们还可以在这里、那里挤出几个百分点的性能提升，特别是如果我们愿意改变针对 `id` 字段的约束。
> At this point further optimization of the application becomes increasingly challenging, since functions in Node core have become the primary bottleneck. A few more percent could be squeezed out here and there, especially if we were willing to change the constraints of the id field.

但是，在大多数情况下，我们的工作已经完成了。
> However, for the most part, our work here is done.

### 下一步

练习已经完成。恭喜！你现在应该可以使用 Clinic Flame 来解决常见的性能问题了。
> The walkthrough is complete. Congratulations! You should now be able to use Clinic Flame to solve common performance problems.

你也可以选择继续阅读有关 Flame [高级控件](./advanced_controls.html)的内容。
> You may also choose to continue to read about Flame's more advanced controls.