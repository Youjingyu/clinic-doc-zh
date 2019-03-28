# 控制面板

Clinic 火焰图的控制面板主要包括三个部分：

> The Clinic Flame UI controls have three main sections:

-   火焰图控制：与火焰图本身交互
    > Flamegraph controls: Interacting with the flamegraph itself
-   信息面板：位于顶部，包含有关当前高亮显示的函数块的信息
    > Info Panel: Along the top, containing info about the block currently highlighted
-   菜单选项：可以从信息面板扩展更高级的控件
    > Options Menu: More advanced controls expandable from the info panel

## 火焰图控制

### 和火焰图函数块交互

悬停，将鼠标悬停在某个函数块上，屏幕顶部的信息面板中会显示有关该函数块的信息。

> Hovering the mouse over a block will temporarily show info about that block in the info panel at the top of the screen.

单击，单击选择函数块，当你不再悬停在任何内容上时，信息面板仍旧显示该函数块的信息。

> Clicking will select the block, so that the info panel reverts to that block when you are no longer hovering over anything.

如果你发现一个看起来很有趣的块，点击它会很有用，这样你就可以在不丢失它的情况下查看它周围的函数块。

> If you find an interesting-looking block, it can be useful to click on it so you can hover around exploring its neighbours without losing it.

<video src="https://clinicjs.org/assets/videos/flame-docs-A.mp4" playsinline loop autoplay muted width="100%"></video>

### 提示按钮

单击一个函数块或在上面悬停一会儿，会出现一个提示框，其中包含一个或多个按钮：

> Tooltip buttons
> After single-clicking on a block, or hovering over it for a moment, a tooltip appears, with one or more buttons:

-   Expand：展开一个特定的函数块
    > Expand. See below for more about expanding a particular block.
-   Contract：如果某个函数块已经被展开了，就会显示 "Contract"，让你能够收起函数块然后回到主界面。
    > Contract. If this is the block that you have already expanded, it will show "Contract" instead of "Expand", which will take you back to the main view.
-   Copy path：将包含函数代码的文件的相对路径复制到剪切板，仅适用于被分析的应用的代码（白色）或其 `node_modules`（蓝色）中的代码。
    > Copy path. Copies to the clipboard the relative file path to the file containing the code this block represents. This only appears for blocks from the application being profiled (white) or its dependencies (blue).
-   Open in browser：针对 Node.js 核心代码（灰色），在新的浏览器标签页中打开 Github 页面，其中会包含该函数对应的 Node.js 源码。查看这些可以更好地了解 Node.js 在“背后”做了什么。
    > Open in browser. For Node.js core blocks only (grey). In a new browser tab, opens the GitHub page showing the source code for the Node.js function represented by this block. Exploring these can be a good way to learn more about what Node.js is doing "under the hood".

<video src="https://clinicjs.org/assets/videos/flame-docs-B.mp4" playsinline loop autoplay muted width="100%"></video>

### 展开

如果双击某个函数块或者点击了提示框中的 "Expand" 按钮，该函数块会展开填充满整个火焰图。展开的函数块下方的函数块也会填充满整个屏幕，而其上方的函数块所占的比率会增加。扩展的函数块实际上创建了一个新的火焰图，它表示了主火焰图的一个特定区域。

> When a block is double-clicked, or its tooltip "Expand" button is used, it will expand to fill the full width of the flamegraph. Blocks below will also expand and fill the full width, while blocks above the clicked block will increase in ratio to the block they sit on. Expanding a block essentially creates a new flamegraph which represents a particular partition of the main flamegraph.

已展开的函数块下方会有一块阴影。此“阴影”下方的每个函数块都可能扩展到比整个屏幕更宽的宽度（在 CPU 上的执行时间更长）。

> The block that has been expanded is marked with a shadow underneath. Every block below this 'shadow' is probably wider (longer on the CPU) than the block that has expanded to fill the screen.

要返回展开前的主界面，你可以单击背景、单击屏幕底部的 "Return to main view"、双击展开的函数块或单击提示框中的 "Contract" 按钮。

> To get back to the main, non-expanded view, you can either click on the background, click "Return to main view" at the bottom of the screen, double-click on the expanded frame, or click on its "Contract" tooltip button.

<video src="https://clinicjs.org/assets/videos/flame-docs-C.mp4" playsinline loop autoplay muted width="100%"></video>

### 信息面板

信息面板有五个主要功能：

> There are five main features in the Info Panel:

-   堆栈栏：一个细条，按顺序显示“最热”的函数块
    > Stack bar: A thin bar showing the "hottest" blocks in order
-   选择控制面板：切换到下一个、上一个“最热”函数块等
    > Selection controls: Flick to the next hottest, previous, etc
-   代码信息：当前高亮函数块的函数的来源
    > Code info: Where the function behind the currently highlighted block comes from
-   搜索框：按名字或路径搜索函数
    > Search box: For finding functions by name or path
-   选项菜单：更多高级功能。该功能具有[自己的章节](#菜单选项)
    > Options Menu: More advanced features. This Options Menu has its own section below

### 堆栈栏

我们之前在[火焰图](./flamegraphs.html)章节解释过，堆栈栏用于显示某个函数在栈顶的停留时间，也就是在 CPU 执行该函数的代码时，Node.js 的事件循环会被阻塞，以及这是如何通过亮度或“热度”来表示的。

> We previously explained, in the Flamegraphs page, how it is useful to consider how much time a function was at the top of the stack, meaning the Node.js event loop was blocked as the CPU executes code within that function; and how this is represented by the brightness or "heat" of the colour of the exposed part of a block.

堆栈栏显示了火焰图中每个函数块顶部亮条的热度，并按热度排序，即按照阻塞事件循环的时间排序。

> This bar shows you the heat of those exposed stack tops, of every block in the flamegraph, in order of heat i.e. in order of how long that block's function was blocking the event loop.

你可以从左到右沿着堆栈栏移动光标，看看这些“热”函数在火焰图上的位置，并使用与上面相同的交互：悬停查看信息，单击选择并显示工具提示，双击展开。

> You can run the cursor along this bar from left to right to see where these "hot" functions are on the main flamegraph, with the same interaction as above: hover to see info, click to select and show tooltip, double click to expand.

首次打开 Clinic 火焰图时，默认选择最左侧（最热）的块。

> The left-most (hottest) block is selected by default when a Clinic Flame profile is first opened.

<video src="https://clinicjs.org/assets/videos/flame-docs-D.mp4" playsinline loop autoplay muted width="100%"></video>

### 选择控制面板

通过选择控制面板的按钮，你可以方便地从当前选定的函数块跳转到堆栈栏中按续显示的左侧或右侧的函数块。

> These buttons allow you to easily jump from the currently selected block, to the block that is one to the left or right of it in the hottness-ranking shown by the Stack Bar.

一个开始使用 Clinic 火焰图的好方式是使用 "Next hottest" 按钮循环观察函数块，对于它选择的每个函数块，想想为什么这个函数会执行这么多时间。例如，它可能是一个需要优化的慢函数，或者它可能是一个你知道的快函数，但是当你在火焰图中看到它下面的东西时，你可能会发现它被调用了太多次（例如，它可能在嵌套循环中）。

> A good place to start with a Clinic Flame flamegraph, is to cycle through using the "Next hottest" button, and for each block it selects, think why that function might be spending so much time active. For example, it might be a slow function needing optimising, or it might be a function you know is fast, but when you look at what is below it in the flamegraph, you might discover that it is being called too many times (for example, it might be in a nested loop).

<video src="https://clinicjs.org/assets/videos/flame-docs-E.mp4" playsinline loop autoplay muted width="100%"></video>

### 代码信息

代码信息为你提供了有关当前突出显示的块对应的代码的更完整信息。

> This gives you more complete information about the code behind the block that is currently highlighted.

-   左侧是函数名（或类似的内容）。匿名函数记作 `(anonymous)`
    > Function name (or equivalent) on the left. Anonymous functions are labelled (anonymous).
-   中间是文件的路径（或类似内容），包括行号列号（如果可用的话）
    > File path (or equivalent) in the middle, including line and column number (if applicable).
-   上下文。告诉你这个函数块的类别（例如，依赖关系），如果使用[高级控件](./advanced_controls.html)，则可能包含其他信息。
    > Context. This tells you what category this block is (for example, dependency), and may include additional information if certain advanced controls are used.

![](https://clinicjs.org/static/9778071079ffe9114265e1733a2ba6cc/a7166/05-A.png)

### 搜索框

如果你想要找到某个特定文件或函数，可以在此处输入函数名称、文件路径或类似内容的部分字符，任何匹配项将以与文本和边框相同的颜色突出显示（白色代表应用中的代码，蓝色代表依赖包中的代码，灰色代表 Node.js 本身的代码）。

> If there is some particular file or function(s) you want to locate, you can type part of the function name, file path or equivalent here, and any matches will be highlighted, in the same colour used for text and outlines (white for code from the profiled application, blue from a dependencies, grey from Node.js itself).

如果你非常熟悉优化操作，那么这将非常有用，你就不需要再在火焰图上找它了！

> This can be useful if you've done such a good job optimizing an operation, you can no longer find it on the flamegraph!

![](https://clinicjs.org/static/e229f0870153bec97169e482ebde3e6d/65be2/05-B.png)

如果你知道的某个函数无法在任何地方找到，即使使用搜索也不行，它可能是被 V8 内联了，你可以在选项菜单(Options)中关闭 ["merge"](#高级) 后尝试再次搜索。有关合并和内联块的更多信息，请参阅高级控件中的[“合并和取消合并”](./advanced_controls.html#合并与未合并)部分。

> If a function you know exists can't be found anywhere, even using search, it's possible it might have been inlined by V8: try searching again after turning off "Merge" in the Options Menu. For more on merging and inlined blocks, see the section "Merging and Unmerging" in Advanced Controls

如果函数运行得很快，或者在 CPU 上停留的时间很短，那可能是在采集样本时这个函数从不在 CPU 上（译者注：即每次采样都不在 CPU 上），如果用 [autocannon](https://www.npmjs.com/package/autocannon#usage) 创建一个持续时间较长和/或非常多连接的压力测试，则可能会出现这种情况。

> If it is possible the function was so fast, or on the CPU for so little time, that it was never on the CPU while a sample was being taken, it might appear if you create a new profile with a longer duration and/or more connections in Autocannon.

### 菜单选项

单击信息面板右侧的 "Options" 按钮可打开包含更多高级选项的菜单。

> Clicking "Options" on the right side of the Info Panel opens a menu with more advanced options.

#### 代码区域的可见性

这些切换按钮根据代码在应用程序或 Node.js 框架中的位置显示（勾选）或隐藏（取消）块

> These toggle buttons show (tick) or hide (untick) blocks based on where the code is in the application or Node.js framework

-   [Application name]：正在分析的应用内的代码。默认可见。
    > [Application name]: Code inside the main package being profiled. Visible by default.
-   Dependencies：`node_modules` 中的依赖。默认可见。
    > Dependencies: Code in a dependency in a node_modules directory. Visible by default.
-   Node JS：Node.js 核心代码。默认可见。
    > Node JS: Code inside Node.js core. Visible by default.
-   V8：V8 JavaScript 引擎内的函数。默认隐藏，仅建议高级用户使用。[更多信息](./advanced_controls.html#V8)
    > V8: Functions inside the V8 JavaScript engine. Hidden by default, recommended for advanced users only. More info

#### 高级

-   Init：允许显示初始化函数的火焰图，默认隐藏。[更多信息](./advanced_controls.html#初始化)
    > Init: Allows initialization functions to be shown that Flame hides by default. More info
-   Merge：允许为 V8 优化的功能显示不同的堆栈。[更多信息](./advanced_controls.html#合并与未合并)
    > Merge: Allows different stacks to be shown for functions that V8 has optimised. More info.

#### 偏好

-   Presentation mode: 增加文本大小和颜色对比度，如果在不太好的条件下（例如在明亮的房间中的投影仪上）呈现 Clinic Flame，这可能有用。
    > Presentation mode: Increases text sizes and colour contrasts, which can be useful if Clinic Flame is being presented under suboptimal conditions (e.g. on a projector in a brightly lit room).

通过将 `PRESENTATION_MODE` 环境变量设置为 `TRUE`，可以让分析结果默认在 `Presentation mode` 下演示。

> Profiles can be set to show in Presentation Mode by default by setting the PRESENTATION_MODE environment variable to TRUE.
