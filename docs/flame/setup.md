# 安装

Flame 是 Node Clinic 工具的一部分。要安装 Flame，只需要安装 Node Clinic 就行了：
> Flame is part of the Node Clinic suit of tools. To install Flame, simply install Node Clinic like so:

```bash
npm install -g clinic
```

安装完成后，我们可以通过运行 `clinic flame command --help` 命令在检查 Flame 是否已经安装：
> After installing, we can check if Flame has been installed with running the clinic flame command with the --help flag.

```bash
clinic flame --help
```

执行上面的命令应该输出如下内容：
> It should print something similar to the following:

```bash
Clinic Flame - v3.6.0 (0x v4.7.2)

clinic flame helps you find synchronous bottlenecks
by creating a flamegraph visualization that assists in identifying
function calls that may be blocking the event loop.

For more information see the 0x readme, https://github.com/davidmarkclements/0x

To run clinic flame

  clinic flame -- node server.js

If profiling on a server, it can be useful to only do data collection:

  clinic flame --collect-only -- node server.js

You can then transfer the data and visualize it locally:

  clinic flame --visualize-only PID.clinic.flame

Flags
-h | --help                Display Help
-v | --version             Display Version
--collect-only             Do not process data on terminiation
--visualize-only datapath  Build or rebuild visualization from data
```