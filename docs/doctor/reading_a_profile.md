# 查看结果

Clinic Doctor 分析结果主要包含三部分：
> The Clinic Doctor profile has three main sections:

- 警告栏：指出应用的主要问题，如果有的话，还会包含视图控件
Alert Bar: Points us towards the main problem, if there is one. Also contains View Controls
- 图表：绘制 Doctor 得到的数据
Graphs: Plot the data from which Doctor is drawing its conclusions
- 建议面板：下一步有关问题的详细说明
Recommendations Panel: Detailed explanation of the problem with next steps

## 警告栏

![](https://clinicjs.org/static/36bf05d98947002e03836e15c083df3a/ace55/04-A.png)

点击此按钮打开它，我们会看到应用的主要问题的一行摘要（如果有的话）。将鼠标悬停在此摘要上，它将突出显示 Doctor 认为与分析该问题最相关的特定图表的标题。
Click on this to open it out, and we see a one-line summary of the main problem, if there is one. Hover over this summary and it will underline the title of the specific graph that Doctor thinks is most relevant to understanding the problem.

Doctor 通常不会识别多个问题，因此这里通常只会出现一个问题，或者说没有发现任何问题。这是因为一个性能问题可能会破坏诊断另一个问题所需的数据。例如，如果 Doctor 确定存在事件循环问题，则可能无法获取足够的读数来判断是否存在 I/O 问题。
Doctor does not generally identify more than one issue, so there will generally be either one problem here, or a note that no problems were found. This is because one performance problem can disrupt the data needed to diagnose another problem. For example, if Doctor is sure there is an event loop problem, it might not be able to take enough readings to judge if there is an I/O problem.

第一次使用的用户主要使用警告栏查看是否存在问题，然后再直接查看建议面板中的说明以更好地理解它。更有经验的用户会看出常见问题，然后研究适当的图表，以寻找特定的示例造成这些问题的线索。
A first-time user will mainly use the Alert Bar to see if there is a detected problem or not, before going straight to the description in the Recommendations Panel to understand it better. A more experienced user will recognise common detected problems and then study the appropriate graphs for clues about how this particular example of the problem is manefesting itself.

在上面的例子中，Doctor 告诉我们它检测到的问题是 “潜在的事件循环问题”，可以在 Event Loop Delay 图中看到：
In the above example, Doctor is telling us that it has detected a problem, and the problem is "a potential Event Loop issue", which can be seen in the Event Loop Delay graph:

![](https://clinicjs.org/static/c0a8148579033ba7d12a334fc122d845/ace55/04-B.png)

## 视图控件

警报栏的右侧有两个按钮可以更改视图：
To the right of the Alert Bar there are two buttons to change the view:

![](https://clinicjs.org/assets/images/doctor-docs-04-C.png) 列表输入/网格视图。默认情况下，Doctor 在网格视图中显示所有图形，以便可以立即在屏幕上看到它们。如果通过这个按钮切换到列表视图，每个图形都会占据屏幕的整个宽度。这对于想要研究图表细节的高级用户非常有用。在列表视图中，单击警告栏中描述的问题会将页面向下滚动到最相关的图形（如果它不在视窗中的话）。
Grid View / List View. By default, Doctor shows all graphs in a grid so they can all be seen on the screen at once. This button switches to a List View where each graph takes the full width of the screen. This can be useful for advanced users who might want to study the detail of the graphs. When in List View, clicking on the problem described in the Alert Bar scrolls the page down to the most relevant graph, if it is not in view.

![](https://clinicjs.org/static/a488fa25a507f7684c86653986efb60e/d582b/04-E.png)

![](https://clinicjs.org/assets/images/doctor-docs-04-D.png) 白间主题/深色主题。默认情况下，Doctor 使用深色背景和浅色文本的主题。这有利于减少眩光，但有些情况（或某些个人喜好），具有浅色背景和深色文字的主题更好。例如，我们可能在希望拍摄将要打印在纸上的屏幕截图时，或者在光线充足且难以阅读黑暗主题的房间中投屏 Doctor 的分析结果时切换到白间主题。
Light Theme / Dark Theme. By default, Doctor uses a theme with a dark background and light text. This is good for reducing glare, but some in situations (or for some individual preferences), a theme with a light background and dark text is better. For example, we will probably want to switch to the Light Theme when taking screenshots that will be printed on paper, or when projecting a Doctor profile in a well-lit room where the dark theme is hard to read.

![](https://clinicjs.org/static/4303a4129bb57240bd7f68fda00a41a1/ace55/04-F.png)

## 图表

这些图绘制了 Doctor 分析中使用的各种变量随时间的变化情况，即从分析结果的开始时间（x 轴的左端）到结束时间（x 轴的右端）段内的变化。
These plot various variables used in Doctor's analysis over time, from the start time of the profile (left end of the X-axis) to the finish time (right end of the X-axis).

所有图表都使用相同的 X 轴。我们将看到悬停在一个上显示所有其他图上同一时间点的值。
All graphs use the same X-axis. We will see that hovering over one shows the values at the same point in time on all the other graphs.

![](https://clinicjs.org/static/b750e14ce27b15143813ea66c7b85384/ace55/04-G.png)

### CPU 占用（%）

This graph shows what percentage of the machine's available CPU capacity was being used by the Node.js process being profiled at any one point in time.

![](https://clinicjs.org/static/389c9373f960566e37d4a083ebaee209/88f33/04-H.png)

CPU Usage can exceed 100% if the machine has multiple cores. 100% on this graph means 100% of the capacity of a single core.

Spikes in this graph indicate high CPU activity. This can be a problem if it is excessive and correlates with event loop blockage (see below), but rapid spikes can be a sign that the server is healthily processing high load quickly. Too little CPU activity can be a sign that the Node.js process is stuck waiting for an I/O operation to complete, like a slow database query or file write.

In this profile, the processor is usually fairly busy, which looks healthy.

In part 6 of this walkthrough, Fixing an I/O problem, we will see an example of an unhealthy CPU Usage graph.

### 内存占用（MB）

This graph has three lines, showing megabytes of memory at each point in time, all on the same scale.

![](https://clinicjs.org/static/3ae52eee7e17187afb4f6a8f7c6b8493/a1f39/04-I.png)

The three lines are:

RSS (Resident Set Size): This will always be the highest value, representing all memory allocated as part of the execution of this process. The gap between this line and the Total Heap Allocated line represents non-heap memory, such as storing of the JS code itself, the "stack" which contains variable pointers and primitives like boolean and integer states, and a memory pool for Buffer contents.
THA (Total Heap Allocated): This is the amount of space that has been set aside for storing items that have a reference, such as strings, objects and function closures. Unlike the stack, where the reference pointers to these items are stored, a pre-set amount of memory is assigned for the heap, before it is needed.
HU (Heap Used): This is how much heap memory is actually being used at this point. It represents the total size of all strings, objects, closures etc that have been allocated but not garbage collected at a given point in time. This is usually the most interesting line, with RSS and Total Heap Allocated providing context.
A constantly increasing Heap Used line suggests a possible memory leak, where references to something are remaining in-scope, meaning it can't ever be garbage collected and therefore causing available memory to eventually run dry. The opposite is perhaps a more common problem: many sharp drops, correlating with high readings in the Event Loop Delay graph, suggests that disruptive garbage collection events are disrupting the process and blocking Node.js from executing code.

In this profile, the heap goes up and down fairly gradually, there is always plenty of spare heap allocation, and there is plenty of non-heap memory in the Resident Set as well. This looks healthy.

If we encounter an unhealthy Memory graph, the specific line indicating a problem will be marked in red:

![](https://clinicjs.org/static/54f57b35734b5bc7c4caba599f008c6d/091f6/04-Q.png)

### 时间循环延迟（ms）

This represents points in time in which Node.js was blocked by executing synchronous JavaScript code.

![](https://clinicjs.org/static/96a3560909bdff9ba406fa0e400777b1/4d6f1/04-J.png)

It is important that we understand how this graph works, because it also gives us information about the acuity of the other graphs:

The Y-axis represents the duration of the event loop delay that ended at the moment in time indicated by the tooltip arrow
This is then always followed by a horizontal line representing the same amount of time on the X-axis. For the length of this line, Node.js was blocked, therefore, we don't have any data on any graphs. If we run the cursor along a graph containing substantial event loop delay, the tooltip jumps - this is because no data could be collected between the jumps, for any graphs, because Node.js was stuck executing some slow synchronous code.
For example, in the below screenshot, we can see:

That this is the (joint) longest event loop delay seen in this profile, because it is the highest point on the Y-axis.
That this delay took up a noticable chunk of the duration of the profile, by looking at the horizontal line between this tooltip and the previous one.
Moving the cursor along, we can see that four event loop delays account for most of the run time. We can also see that this is causing the other data to be very course - after the first quarter of a second or so, there are noticable jumps between each reading for memory, CPU, etc, because Node.js was too busy executing some slow synchronous code to even take another reading.

This is clearly not healthy - and Doctor has flagged it as such, colouring this graph red and pointing to it in the Alert box.

### 活跃的回调

This graph shows the quantity of I/O handles presently active, awaiting an output.

![](https://clinicjs.org/static/219ffa9cf01783b28257f3e3e05545d9/1eddf/04-K.png)

When Node.js delegates asychronously, such as using libuv to delegate a task like a file write or a database query the operating system, it stores a "handle". An "active handle" is a delegated task that has not reported as being complete.

The Active Handles graph therefore gives us an idea of how much asychronous I/O activity the Node.js process is waiting on at any point in time. This should ideally follow an orderly pattern, rising and falling as requests are handled and completed. It can also offer clues when combined with the other graphs - for example, CPU spikes on a server that correlate with increased active handles should usually also correlate with incoming requests.

This graph generally provides context for the other graphs. It's hard to say generically what an Active Handles graph "should" look like: we generally can't point to an Active Handles graph and say "That looks unhealthy" without knowing the application logic.

Here, we have a period with very few active handles, and very little other activity, which presumably represents the process getting ready. There is then a steady period of [103] active handles, which presumably represents incoming requests being dealt with. It tells us we can probably ignore that early period with very few active handles as not representing typical server activity.

## 建议面板

Click on the blue bar at the bottom, and it will open a panel telling us more about Doctor's conclusions about what is happening with this application.

![](https://clinicjs.org/static/b005ce77c877d64ecf2d58d17f891e3a/ace55/04-M.png)

This is in two parts: a Recommendations Summary, and a Recommendation in Detail article below a 'Read more' button.

### 建议摘要

This gives a simple bullet point overview of the identified problem, typically with a suggested next step.

![](https://clinicjs.org/static/474986b77bde7a332535c5a4a68cb27d/091f6/04-N.png)

There are a few UI controls:

The 'x' closes the panel
"Browse undetected issues" allows us to read descriptions of issues that Doctor can identify but hasn't identified for this profile. Clicking on this expands out some tabs to show descriptions of problems that Doctor has not identified for this profile. For example, We might find this useful, for example:

While learning about Node.js performance, to avoid creating new problems while fixing an existing problem.
To understand why Doctor might not have identified a known problem. As discussed in the Alert Bar section, Doctor generally does not diagnose more than one problem at a time.

![](https://clinicjs.org/static/4bf69d3b979a9915246c8048ab673700/d582b/04-O.png)

In this case, it tells us that "There may be one or more long running synchronous operations blocking the thread", and recommends using clinic flame to narrow down.

After reading the summary, we recommend clicking "Read more" to understand the problem in more depth.

### 建议详情

Clicking 'Read more' expands the Recommendations Panel to show a detailed article on the performance problem that has been diagnosed. These usually have three sections (clicking on the contents list on the left allows us to skip to a particular section):

Understanding the analysis describes the problem in depth.
Next Steps details some recommended steps to narrow down on the exact cause of the problem, so we can fix it. Usually this involves using another tool in the Clinic suite which can identify individual lines of problematic code.
Reference gives links for suggested further reading and credits any sources that were quoted or used in writing this recommendation.

![](https://clinicjs.org/static/899f2e13b32fa86e73f309d8f410200a/ace55/04-P.png)

Then we're ready to look at fixing the problem.