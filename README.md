# Node Clinic 中文文档

从我个人的角度来说，之前分析 Node.js 的性能主要依赖于 v8-profiler、v8-analytics 或者通过 Chrome DevTools 调试 Node.js 应用；要查看更加底层的操作需要借助 gcore + llnode 或者通用的进程分析工具，比如 mac 下的活动监视器、Instruments，linux 下的 strace、pstack 等相关命令。

但是有没有一种更加智能的方式，不通过复杂的工具链分析就能够知道 Node.js 应用的问题所在呢？答案就是 Clinic。

[Clinic](https://clinicjs.org/) 是一个帮助诊断和分析 Node.js 性能问题的工具。它能诊断出 Node.js 关于 CPU、内存、事件循环、异步操作的相关问题，并提供建议以及进一步分析的工具，非常方便。Clinic 的文档写得也不错，几乎是一步一步地教你如何分析问题，并告诉为什么要这样做的原理。因此我将官方文档翻译在 [Clinic 中文文档](https://youjingyu.github.io/clinic-doc-zh/)，让自己更加熟悉 Clinic 的同时也方便大家查阅。

ps：最初的想法是把官方文档扒下来翻译一份，以保证和官方文档一致的阅读体验，但是官方文档是一个单页面应用，还做了懒加载，并且请求了接口，实在不好扒。

我在官方仓库提了 [issue](https://github.com/nearform/node-clinic/issues/113)，官方回复说后期会提供支持。现在暂时使用 [vuepress](https://vuepress.vuejs.org) 展示文档。