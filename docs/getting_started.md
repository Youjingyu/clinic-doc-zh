# 开始

在开始使用 Clinic 之前，我们需要先在电脑上安装 Clinic，并运行几个测试，以保证一切正常。我们按照下面的步骤开始：

1.注意：Node.js 版本必须大于 `8.11.1`

```bash
npm install -g clinic
npm install -g autocannon
```

2.确定 Clinic 是否安装成功

```
clinic --help
```

3.执行上面的命令应该输出如下的内容：

```bash
Clinic - v2.2.1

Getting started
As a first step, run the clinic doctor:

  clinic doctor -- node server.js

Then benchmark your server with wrk or autocannon:

  wrk http://localhost:3000
  autocannon http://localhost:3000

Finally shut down your server (Ctrl+C). Once the server process has shutdown
clinic doctor will analyse the collected data and detect what type of issue
you are having. Based on the issue type, it will provide a recommendation for
you.

For example, to debug I/O issues, use Clinic Bubbleprof:

  clinic bubbleprof -- node server.js

Then benchmark your server again, just like you did with clinic doctor.

Report an issue
If you encounter any issue, feel free to send us an issue report at:

  https://github.com/nearform/node-clinic/issues

When creating an issue, it will be a huge help for us if you upload your
data to the clinic cloud. To do this, use clinic upload:

  clinic upload 1000.clinic-doctor

Utilities
When using clinic a bunch you have fill up your directory with data folders and files.
You can clean these easily using clinic clean.

More information
For information on the clinic sub-commands, use the --help option:

  clinic doctor --help
  clinic bubbleprof --help
  clinic upload --help
  clinic clean --help
  clinic flame --help

Flags
-h | --help                Display Help
-v | --version             Display Version
```

4.我们上传了一些例子到 Github 供你测试。我们先使用 [Clinic Doctor](https://clinicjs.org/doctor/) 和 [autocannon](https://github.com/mcollina/autocannon) 来尝试一下第一个例子：

```bash
git clone git@github.com:nearform/node-clinic-doctor-examples.git
cd node-clinic-doctor-examples
npm install
clinic doctor --on-port 'autocannon localhost:$PORT' -- node ./slow-io
```

上面的命令使用 autocannon 对一个具有 IO 问题的应用进行测试，测试完成后，会自动在浏览器中打开 Doctor 工具。
