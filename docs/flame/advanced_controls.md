# 高级控件

本节会提供一些有关 Clinic Flame 高级功能的参考信息。
> This section provides further reference information on some of Clinic Flame's advanced features.

## 初始化

Clinic Flame 默认隐藏各种初始化函数。过滤掉这些函数通常会减少冗余的初始化噪声。
> Clinic Flame by default hides various initializaton functions. Filtering out these frames reduces generally redundant initialization noise.

过滤的函数包括：
> They include:

- 在加载依赖树时经常重复调用的内部模块系统函数（比如 `require`）
> Internal module system functions which are repeated frequently as the dependency tree is loaded (such as require())
- 与 Clinic Flame 自己的数据捕获相关的函数
> Functions relating to Clinic Flame's own data capture
- 其它初始化函数
> Other initialization functions

勾选选项菜单中的 ["Advanced" 选项](./controls.html#高级)可以显示这些函数。
> An option in the "Advanced" section of the Options Menu allows these to be shown.

如图所示，初始化函数块与所有其他块显示得一样，并根据 "Visibility by code area" 中选择的选项显示或隐藏。唯一的区别是，当在[信息面板](./controls.html#信息面板)中显示时，右侧的上下文部分是 "In initialization process" 。
> When shown, Init blocks are presented like all other blocks, and will be shown or hidden according to the options selected in "Visibility by code area". The only differences is that when shown in the Info Panel, the context section on the right states "In initialization process".

## 合并和取消合并

V8 可能对一些频繁运行的代码做自动优化，从而创建这些函数的优化版本。在内部 JavaScript 引擎中，优化和未优化的函数是独立的实体。
> V8 may apply automatic optimizations to some frequently-run code, creating optimized versions of those functions. At an internal JavaScript engine level, optimized and unoptimized functions are separate entities.

#### 优化和未优化的代码

默认情况下，Clinic Flame 合并所有优化和未优化的函数，并将它们表示为单个块。Clinic Flame 还会将所有可内联函数合并到调用函数中，也就是稍后会内联到的函数中。这样做能够生成只关注代码逻辑的简单火焰图
> By default, Clinic Flame merges all Optimized and Unoptimized functions, and represents them as single blocks. It also merges all inlinable functions in to the calling functions that they are later inlined into. This creates a simplified graph where stacks only diverge based code logic.

在选项菜单中的 ["Advanced"](./controls.html#高级) 中取消 "Merge" 选项，可以分离优化和未优化的函数，将它们显示为单独的块和单独的堆栈。
> Unticking "Merge" in the "Advanced" section of the Options Menu separates Optimized and Unoptimized functions, showing them as seperate blocks and seperate stacks.

下面是我们为[优化热函数](./optimizing_a_hot_function.html#测试优化后的函数)生成的未合并的火焰图。注意 `app.get`（以及其他块）分成了两个堆栈。一个是未优化的函数，另一个是优化后的版本。
> This is the unmerged view of the flamegraph we created for Optimizing A Hot Function. Note how app.get (among others) forks into two stacks. One is the original unoptimized function, the other is the optimized version.

![](https://clinicjs.org/static/733c5355fcfddb79cdf8bcf1cfb6dd80/65be2/09-A.png)

[信息面板](./controls#信息面板)会在右侧的上下文部分中突出显示函数块的优化状态。对于所有 JavaScript 函数块，都会显示 "Unoptimized"（优化） 或 "Optimized"（未优化）。如果函数块被V8 内联，还会显示 "Inlinable"（可内联）。
> The Info Panel shows the highlighted block's optimization status, in the context section on the right. For all JavaScript blocks, this will say either "Unoptimized" or "Optimized". If the block is inlined by V8, it will also say "Inlinable".

![](https://clinicjs.org/static/7606095a95eb1e8cbc323c28d06d8224/0b628/09-B.png)

#### 显示优化状态

"Merge" 没有被选中时，还有另一种方法可以查看哪些函数块是优化的或未优化的。当 "Merge" 未被选中时，另一个选项 "Show optimization status" 会变为可选。如果选中此项，则会更改函数块的文本和边框颜色以及火焰图右下方的选项，以显示：
> With "Merge" unticked, there is another way to see which blocks are Optimized or Unoptimized. Another option, "Show optimization status", becomes available when "Merge" is unticked. If this is ticked, the text and outline colours of blocks are changed, along with the key at the bottom right of the flamegraph, to show:

- 白色的未优化的函数块
> Unoptimized blocks in white
- 灰色的优化后的函数块
> Optimized blocks in grey
- 与优化无关的块，因为它们没有用蓝色表示（译者注：非 JavaScript 代码 ）JavaScript
> Blocks where optimization is not relevant because they don't represent JavaScript in blue

"Merge" 选项未勾选时，可以通过在搜索框中输入 "inlinable" 来搜索内联函数。
> Inlinable functions can be found by typing "inlinable" into the search box while "Merge" is unticked.

![](https://clinicjs.org/static/775047b810f4faaa69c0987ca20a9859/65be2/09-C.png)

例如，在上面的火焰图（[优化热函数](./optimizing_a_hot_function.html#测试优化后的函数)时生成的火焰图）中，我们可以更清楚地看到 `app.get` 分为优化和未优化两部分，并且在优化的部分，`payload`（已选中）被标记为 "Inlinable"（可内联）。
> For example, in the above flamegraph (the one we generated while Optimizing A Hot Function), we can see more easily that app.get forks into an optimized and unoptimized branch, and in the optimized branch, payload (selected) is flagged as "Inlinable".

这就是为什么当我们在默认的合并视图中查看该火焰图时，它就不存在了。因为它被内联到了其父函数中，即优化后的 `app.get` 中。
> This is why, when we looked at that flamegraph in the default merged view, it was absent. It was inlined into its parent function, the optimized version of app.get.

## V8

除了显示 Node.js 框架中的函数之外，还可以通过勾选选项菜单 "Visibility by code area" 部分中的 "V8" 复选框，将 Clinic Flame 设置为显示 V8 JavaScript 引擎中的函数。
> In addition to showing functions from the Node.js framework, Clinic Flame can be set to show functions from within the V8 JavaScript engine, by ticking the "V8" checkbox in the "Visibility by code area" section of the Options Menu.

这通常会增加火焰图的复杂性，其中大部分可能不需要。因此，Flame 允许用户扩展 V8 选项然后过滤特定类型的 V8 函数：
> This often adds a significant amount of complexity to the flamegraph, much of which may not be wanted. Flame therefore allows users to expand the V8 options and filter specific types of V8 function:

#### V8 原生函数

编译到 V8 中的原生 JavaScript 函数。
> These are native JavaScript functions that are compiled into V8.

包括任何原生原型方法（例如 `Array.prototype.join` ），以及任何未公开但由V8内部使用的函数（例如 `InnerArrayJoin`）。
> This would include any native prototype methods (Array.prototype.join for instance), and any functions that aren't publicly exposed but are used internally by V8 (InnerArrayJoin for instance).

此外，动态函数（使用 `eval` 运行的代码或使用 `Function` 创建的代码）也会显示为原生块，文件路径显示为 `[eval]`。
> In addition, evaluated functions (either code run with eval or created with Function) will also appear as native frames, with the file path shown as [eval].

#### V8 运行时

与 V8 实现的 JavaScript 的运行时操作有关的 C++ 函数块。比如（取决于V8版本）`StringEqual` 和 `ObjectSetPrototypeOf`。
> These are C++ frames pertaining to the runtime operations of V8's implementation of JavaScript. Examples include (depending on V8 version) StringEqual and ObjectSetPrototypeOf.

这些函数块的标签包括： `[CODE:LoadGlobalIC]`, `[CODE:Handler]`, `[CODE:CallIC]`, `[CODE:LoadIC]`, `[CODE:StoreIC]`, `[CODE:Builtin]` , `[CODE:BytecodeHandler]`, `[CODE:Builtin]` , `[CODE:Stub]`
> Tags can include [CODE:LoadGlobalIC], [CODE:Handler], [CODE:CallIC], [CODE:LoadIC], [CODE:StoreIC], [CODE:Builtin] , [CODE:BytecodeHandler], [CODE:Builtin] , [CODE:Stub].

#### V8 C++

由 V8 底层调用的 C++ 函数块，但不包括可在 Node、Libuv 或第三方模块中调用的 C++ 函数。
> These are C++ frames that are called by the V8 layer, not including C++ frames that may be called in Node, Libuv or third party modules.

这些函数块的标签可以包括 `[CPP]` 和 `[SHARED_LIB]`。
> These frames can include the tags `[CPP]` and `[SHARED_LIB]`.

#### RegExp

RegExp 代表正则表达式。这也被捕获为函数块。在这种情况下，正则表达式会填充函数块标签的 "function name" 部分。这可用于识别慢正则表达式（特别是[指数复杂度的正则表达式](https://perlgeek.de/blog-en.cgi/perl-tips/in-search-of-an-exponetial-regexp.html)）。
> RegExp stands for Regular Expressions. These are also captured as "frames". In this case the regular expression notation fills in as the "function name" portion of the block label. This can be useful in identifying slow regular expressions (in particular exponential time regular expressions).

这些函数块具有 `[CODE：RegEx]` 标签。
> These will have the tag [CODE:RegExp].
