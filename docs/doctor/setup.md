# 安装

Doctor 是 Node Clinic 工具的一部分。要安装 Flame，只需要安装 Node Clinic 就行了：
> Doctor is part of the Node Clinic suit of tools. To install Doctor, simply install Node Clinic like so:

```bash
npm install -g clinic
```

安装完成后，我们可以通过运行 `clinic doctor command --help` 命令来检查 doctor 是否已经安装：
> After installing, we can check if Doctor has been installed by running the clinic doctor command with the --help flag.

```bash
clinic doctor --help
```

执行上面的命令应该输出如下内容：
> It should print something similar to the following:

```bash
Clinic Doctor - v3.12.0

clinic doctor is the first step in profiling your application.
It will show you what kind of problem you are having and recommend the path
forward.

To run clinic doctor

  clinic doctor -- node server.js

If profiling on a server, it can be useful to only do data collection:

  clinic doctor --collect-only -- node server.js

You can then transfer the data and visualize it locally:

  clinic doctor --visualize-only PID.clinic-doctor-sample

Flags
-h | --help                Display Help
-v | --version             Display Version
--collect-only             Do not process data on termination
--visualize-only datapath  Build or rebuild visualization from data
--sample-interval interval Sample interval in milliseconds
--on-port                  Run a script when the server starts listening on a port.
--dest                     Destination for the collect data (default .).
```