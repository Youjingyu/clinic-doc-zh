# 缓存结果

一种方法是使用缓存。我们的结果很少改变，因此在 LRU 缓存中缓存查询结果是减少数据库查询总时间的好方法。
> A way to do that would be to add caching. Our result seldomly changes so caching it in an LRU cache would be a great way to reduce the amount of database queries done in total.

在 `4-server-with-caching.js` 实现了这个优化。我们运行它：
> This is implemented in 4-server-with-caching.js. Let's run it:

```bash
clinic bubbleprof --on-port 'autocannon -c 5 -a 500 localhost:$PORT' -- node 4-server-with-caching.js
```

![](https://clinicjs.org/static/3569454ee519f02bbe0cdfc78fd29e67/71c55/09-A.png)

mongodb 泡沫缩小了 7 倍。与第一个例子相比，大约是 20 倍。此外，从时间轴中的黄线可以看到，在初始查询响应到达后，mongodb 操作已被缓存操作替换。现在我们的mongodb泡泡很小 - 到目前为止，大部分时间都用于提供 http 请求。
> Our mongodb bubbles have shrunk 7x. And about 20x in comparison with the first example. Also, following the yellow line in the timeline tells us that mongodb activity has been replaced by caching activity after initial query response arrived. Now our mongodb bubbles are tiny - and by far the most time is spent just serving http requests.

希望这片文档有助于你更好地了解 Bubbleprof 工具以及如何使用它来找到你的瓶颈。
> Hope this helps you understand the Bubbleprof tool better and how to use it to find your bottlenecks.