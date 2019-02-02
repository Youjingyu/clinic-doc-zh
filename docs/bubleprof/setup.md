# 安装

Bubbleprof 是 Node Clinic 工具的一部分。要安装 Bubbleprof，只需安装 Node Clinic 就行了，如下所示：
> Bubbleprof is part of the Node Clinic suit of tools. To install Bubbleprof, simply install Node Clinic like so:

```bash
npm install -g clinic
```

安装后，我们可以通过运行 `clinic bubbleprof --help` 命令来检查 Bubbleprof 是否安装成功。
> After installing, we can check if Bubbleprof has been installed by running the clinic bubbleprof command with the --help flag.

```bash
clinic bubbleprof --help
```

输出结果应该如下：
> It should print something similar to the following:

```bash
Clinic BubbleProf - v1.11.0

clinic bubbleprof helps you find asynchronous bottlenecks and debug event loop blocking.

To run clinic bubbleprof

  clinic bubbleprof -- node server.js

If profiling on a server, it can be useful to only do data collection:

  clinic bubbleprof --collect-only -- node server.js

You can then transfer the data and visualize it locally:

  clinic bubbleprof --visualize-only PID.clinic-bubbleprof-sample

Flags
-h | --help                Display Help
-v | --version             Display Version
--collect-only             Do not process data on terminiation
--visualize-only datapath  Build or rebuild visualization from data
```