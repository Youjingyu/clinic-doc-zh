# 优化热函数

Clinic Flame 界面已经为我们指出了“最热”的函数。即下图中一个非常明显的函数 `payload`，位于 `1-server-with-slow-function.js` 的第 15 行。

我们也可以看到 `app.get` 在 18 行 14 列调用了热函数 `payload`。

![](https://clinicjs.org/static/60ec54d4c38a25cb8c567ccf71a6c187/65be2/03.png)

看一下从第8行开始的函数：

```javascript
app.get('/', (req, res) => {
  res.send(payload())
})
```

这只是一个匿名的箭头函数。因为它传递给了 app.get，在没有名称的情况下，Flame 采样器会将此函数命名为 app.get。从第 14 列可以明显地看出我们所讨论的函数是箭头函数。

每次请求 `/` 路由时都会调用这个函数处理。它再调用 `payload` 函数（我们的瓶颈），然后将 `payload` 的执行结果传递给 `res.send`。

再来看第 16 行：

```javascript
return function payload() {}
```

由于有一个 `return` 语句，所以还需要一个父函数。再看看整段代码，包括创建 `payload` 函数的父函数：

```javascript
function initPayload(idSize = 20) {
  return function payload() {
    let chars = ''
    let n = idSize
    const date = Date.now()
    const radix = 36
    n *= n * idSize
    while (n--) {
      const num = date + n
      chars += num.toString(radix).toUpperCase()
    }
    const id = chars.slice(-idSize)
    return { date, id }
  }
}
```

在 `initPayload` 的作用域内有一个参数 `idSize`，默认值是 `20`。

`payload` 函数返回一个具有 `date` 字段和 `id` 字段的对象。`date` 由 Date.now（）创建，看起来我们无法在这里进行优化。我们主要关注 `id` 是如何生成的。

变量 `n` 赋值为 `idSize`，但接着又乘以自身与 `idSize` 的积，结果基本上是 `n³`。然后，在每次 `while` 循环中，`n` 变量减少 1。`while` 循环体将 `timestamp` 时间戳和 `n` 相加，然后调用 `toString（36）`（ `radix` 常量为36），把数字转换为包含数字和字母的字符串（36 进制），然后把这个 36 进制字符串转为大写并添加到 `chars` 字符。最后，根据 `chars` 字符串获取长度相对于 `idSize` 的切片来生成 `id`。

多么奇怪且过度设计的创建 ID 的方式啊。当然没有人会真的写这样的代码？（旁白：“他们会。”）

让我们改进算法，但同时保证 id 的基本特性：

- 必须是一个包含数字和字母的字符串
- 必须根据 `idSize` 生成
- 不少于 6 个字符

一个优化版本的 `initPayload` 函数如下：

```javascript
function initPayload(idSize = 20) {
  if (idSize < 6) throw Error('idSize must be greater than 5')
  const max = 2147483647
  var count = 0
  return function payload() {
    count = (count + 1) % max
    const date = Date.now()
    const chars = count.toString(36).toUpperCase()
    const id = '0'.repeat(idSize - chars.length) + chars
    return { date, id }
  }
}
```

数字 `max` 是最大的32位整数（2³¹ - 1），当它达到 2³¹ 时，我们用它来循环计数到 0。在我们的例子中，这样做对速度提升并不是必要的，但是 Node 的 JavaScript 引擎（V8）针对 32 位范围内的数字进行了优化（因为实际上大多数数字都是这样的）。另外，当转换为的 36 进制（2³¹ -  1）是 6 个字符时，意味着我们没必要使用最小长度偏移来限制 `idSize`。

每次调用 `payload` 函数，`count `都会增加 1。我们把 `count` 转为 36 进制的字符串，接着将该字符串转为大写。然后我们用必要数量的零（有效的 36 进制）填充字符串的开头，以创建一个长度相对于`idSize` 的 `id`。

> 译者注：这两段话的描述和代码有出入，原文如下  

> The max number is the largest 32bit integer (2³¹ - 1) we use this to cycle count back round to 0 when it reaches 2³¹. This isn't strictly necessary for speed in our case, but Node's JavaScript engine (V8) is optimized for the numbers in 32bit range (since most numbers in practice tend to be). Additionally, when converted to base36 is (2³¹ - 1) 6 characters, which means we don't have use a minimum length offset to enforce idSize.

> Each time the payload function is called, count is increase by one. We turn count into a base36 string, and upper case it. Then we pad the beginning of the string with the necessary amount of zeros (which is valid base36) to create an id with a length corresponding to idSize.

### 测试优化后的函数

优化后的 `payload` 函数在 `2-server-with-optimized-function.js` 中。我们通过 Flame 来分析这段代码启动的服务器来评估优化效果：

```bash
clinic flame --on-port 'autocannon localhost:$PORT' -- node 2-server-with-optimized-function.js
```

生成的结果应该如下：

![](https://clinicjs.org/static/de4a5813f3c6b55a8713462e117d7a7c/65be2/06-A.png)

这看起来更健康 - 因为图里有一系列黄色和橙色，说明它不再仅仅由一个函数主导。

可以看到 `payload` 函数已经看不见了。因为它内联到了它的的父函数中，也就是内联到了标记为 `app.get` 的匿名 lambda 函数中。在 [高级控制页面](./advanced_controls.html/#合并与未合并) 有关于内联和合并的更多信息。

通过 `autocannon`，可以证明我们的优化使我们的服务器速度提高了50倍（220 req/s vs 11640 req/s）。

![](https://clinicjs.org/static/a140f7ccf8fcc653b51daefab7c9b17e/34af2/06-B.png)