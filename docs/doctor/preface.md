# 前言

当您的应用出现 CPU 使用率低、垃圾回收阻塞、频繁的事件循环延迟或是不明数量的活动句柄等问题时，其实意味着还有更多的问题没有被发现。Doctor 根据这些“症状”提出改进建议、缩小排查范围。就拿I/O (Input输入/Output输出) 问题来说，未优化的垃圾回收和事件循环阻塞等情况已经见怪不怪了。Doctor 助你一臂之力来解决所有问题。
> Symptoms such as low CPU usage, blocking garbage collection, frequent event loop delay or a chaotic number of active handles may indicate a number of potential problems. Doctor helps narrow down the possibilities by generating a recommendation based on those symptoms. Examples such as I/O issues, non-optimized garbage collection and blocked event loop are quite common. Doctor will help you with all of these.

1. [安装](./setup.html)
> Setup
2. [准备](./getting_ready.html)
> Getting ready
3. [首次分析](./first_analysis.html)
> First analysis
4. [查看分析结果](./reading_a_profile.html)
> Reading a profile
5. [解决事件循环问题](./fixing_an_event_loop_problem.html)
> Fixing an event loop problem
6. [解决 I/O 问题](./fixing_an_IO_problem.html)
> Fixing an I/O problem
