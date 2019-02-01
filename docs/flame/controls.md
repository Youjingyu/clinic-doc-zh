# 控制面板

Clinic 火焰图的控制面板主要包括三个部分：

- 火焰图控制：与火焰图本身交互
- 信息面板：位于顶部，包含有关当前高亮显示的函数块的信息
- 菜单选项：可以从信息面板扩展更高级的控件

## 火焰图控制

### 和火焰图函数块交互

悬停，将鼠标悬停在某个函数块上，屏幕顶部的信息面板中会显示有关该函数块的信息。

单击，单击选择函数块，当你不再悬停在任何内容上时，信息面板仍旧显示该函数块的信息。

如果你发现一个看起来很有趣的块，点击它会很有用，这样你就可以在不丢失它的情况下徘徊探索它周围的函数块。

<video src="https://clinicjs.org/assets/videos/flame-docs-A.mp4" playsinline loop autoplay muted width="100%"></video>

### 提示按钮

单击一个函数块或在上面悬停一会儿，会出现一个提示框，其中包含一个或多个按钮：

- Expand：展开一个特定的函数块
- Contract：如果某个函数块已经被展开了，就会显示 ”Contract“，让你能够收起函数块然后回到主界面。
- Copy path：将包含函数代码的文件的相对文件路径复制到剪切板，仅适用于被分析的应用的代码（白色）或其 `node_modules`（蓝色）中的代码。
- Open in browser：针对 Node.js 核心代码（灰色），在新的浏览器标签页中打开 Github 页面，页面中会包含该函数对应的 Node.js 源码。查看这些可以更好地了解 Node.js 在“背后”做了什么。

<video src="https://clinicjs.org/assets/videos/flame-docs-B.mp4" playsinline loop autoplay muted width="100%"></video>

### 展开

如果双击某个函数块或者点击了提示框中的 ”Expand“ 按钮，该函数块会展开填充满整个火焰图。展开的函数块下方的函数块也会填充满整个屏幕，而其上方的函数块所占的比率会增加。

已展开的函数块具有阴影背景。此“阴影”下方的每个函数块都可能扩展到比整个屏幕更宽的宽度（在 CPU 上的执行时间更长）。

要返回展开前的主界面，你可以单击背景、单击屏幕底部的 “Return to main view”、双击展开的函数块或单击提示框中的 ”Contract“ 按钮。

<video src="https://clinicjs.org/assets/videos/flame-docs-C.mp4" playsinline loop autoplay muted width="100%"></video>

## 信息面板

信息面板有五个主要功能：

- 堆栈栏：一个细条，按顺序显示“最热”的函数块
- 选择控制面板：切换到下一个、上一个“最热”函数块等
- 代码信息：当前高亮函数块的函数的来源
- 搜索框：按名字或路径搜索函数
- 选项菜单：更多高级功能。该[功能具有其自己的章节](#Options Menu)

### 堆栈栏

我们之前在[火焰图](./flamegraphs.html)章节解释过，堆栈栏用于显示某个函数在栈顶的停留时间，也就是在 CPU 执行该函数的代码时，Node.js 的事件循环会被阻塞，以及这是如何通过亮度或“热度”来表示的。

堆栈栏显示了火焰图中每个函数块顶部亮条的热度，并按热度排序，即按照阻塞事件循环的时间排序。

首次打开 Clinic 火焰图时，默认选择最左侧（最热）的块。

<video src="https://clinicjs.org/assets/videos/flame-docs-D.mp4" playsinline loop autoplay muted width="100%"></video>

### 选择控制面板

通过选择控制面板的按钮，你可以方便地从当前选定的函数块跳转到堆栈栏中按续显示的左侧或右侧的函数块。

一个开始使用 Clinic 火焰图的好方式是使用“Next hottest”按钮循环观察函数块，对于它选择的每个函数块，想想为什么这个函数会执行这么多时间。例如，它可能是一个需要优化的慢函数，或者它可能是一个你知道的快函数，但是当你在火焰图中看到它下面的东西时，你可能会发现它被调用了太多次（例如，它可能在嵌套循环中）。

<video src="https://clinicjs.org/assets/videos/flame-docs-E.mp4" playsinline loop autoplay muted width="100%"></video>


