# 高级分析

在我们最新的火焰图中仍然有一些热块：

![](https://clinicjs.org/static/d81062495d5e738b07588125894b8263/65be2/07-A.png)

没有最热的块涉及到我们的代码，但让我们花点时间思考一下发生了什么。

最热块的是 `_stream_writable.js` 中的 `clearBuffer`，这是 Node 的核心代码，由于这里的目标不是开始优化 Node 核心代码，因此我们继续看下一个最热的块：`handleRequest`。

我们可以展开 `handleRequest` 块，如下所示：

![](https://clinicjs.org/static/c387182660b3c2dd9e81143b5f5554ef/65be2/08-A.png)

看一下这个子视图中最热的三个函数：

1. Node.js 的 `clearBuffer` 是第一个，它占用了 `onSendEnd` 内部的大部分时间。如上所述，优化它可能会很困难。
2. 第二个最热的是 Fastify 中的函数 `handleRequest`，它有很多子函数块，所以显然非常复杂。
3. 第三是我们自己的函数 - 但我们已经对其进行了优化。