# 寻找第一个瓶颈

![](https://clinicjs.org/static/0d21aa67f80041328f996853361c0e89/71c55/03-A.png)

通过查看第一个图表我们注意到的一些信息是：
> A few things we notice by looking at this first diagram are:

1. 在左边的 mongodb 气泡里花了很多时间。
> 1.A lot of time is spent inside the mongodb bubble on the left.
2. 底部的查询气泡在查询时花费了差不多的时间。
> 2.Similar amount of time is spent querying in the query bubble at the bottom.
3. 时间轴稀疏，表明吞吐量低。
> 3.The timeline is sparse indicating low throughput.

这似乎是吞吐量问题，并且可能与mongodb有关。
> This seems like a throughput problem, likely related to mongodb.

如果我们查看数据库设置，会注意到服务器正在使用不包含索引的集合。
> If we investigate the database setup we notice that the server is using a collection that doesn't contain an index.

这意味着数据库每次都必须循环所有数据来响应我们的查询，从而产生大量的数据库延迟。
> This means the database has to iterate all the data every time to answer our query, which creates a lot of database latency.

我们可以通过在我们使用的属性上添加索引来减少这种开销。
> We can reduce this overhead by adding an index on the properties we use.