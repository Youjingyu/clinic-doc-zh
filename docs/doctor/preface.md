# 前言

诸如 CPU 使用率低，垃圾回收阻塞，频繁的事件循环延迟或混乱数量的活动句柄等症状可能表明应用存在许多潜在问题。Doctor 根据这些症状生成建议来帮助缩小问题的范围。诸如 I/O 问题，未优化的垃圾回收和事件循环阻塞等示例非常常见。Doctor 会帮助你解决所有这些问题。
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