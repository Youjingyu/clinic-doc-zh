# 准备

现在我们准备开始分析了。要开始分析，我们需要某种服务器来执行一些异步操作才能开始。为了简单起见，我们可以使用“官方”的 Bubbleprof 示例，该示例围绕从 mongodb 服务器查询 npm 元数据数据来优化。
> Great, now we are ready to start profiling. To start profiling we find need a server of some sorts that does some async operations to get started. To keep things simple let's use our "official" Bubbleprof example that evolves around optimising a server that queries a mongodb containing npm metadata data.

```bash
git clone https://github.com/nearform/node-clinic-bubbleprof-demo.git
```

官方示例中的 README 包含关于如何使用 npm 数据进行 mongodb 设置的一些说明以及其他信息。
> If you read the example README, it will contain some instructions on how to get mongodb setup with npm data and more.