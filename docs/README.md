# 开始

> 译者注：本篇文档只是关于 Clinic 使用文档的翻译，建议先阅读[官网](https://clinicjs.org)对 Clinic 的介绍后，再来看这篇文档。

在开始使用 Clinic 之前，我们需要先在电脑上安装 Clinic，并按照下面的步骤运行几个测试，以保证一切正常：
> Before you get started with Clinic, first let's make sure we install it on our machines and run a couple of tests just to make sure everything is working fine. Let's follow these steps to kick off:

1.注意：Node.js 版本必须大于等于 `8.11.1`
> 1. Note: You must use a version of Node.js >= 8.11.1

```bash
npm install -g clinic
npm install -g autocannon
```

2.确定 Clinic 是否安装成功
> 2. Confirm that it has installed ok with:

```
clinic --help
```

3.执行上面的命令应该输出如下的内容：
> 3. It should print something similar to the following:

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

4.我们上传了一些例子到 Github 供你测试。现在先使用 [Clinic Doctor](https://clinicjs.org/doctor/) 和 [autocannon](https://github.com/mcollina/autocannon) 来尝试一下第一个例子：
> 4. We have a set of example apps on Github. Let's run through the first one using Clinic Doctor and autocannon:

```bash
git clone git@github.com:nearform/node-clinic-doctor-examples.git
cd node-clinic-doctor-examples
npm install
clinic doctor --on-port 'autocannon localhost:$PORT' -- node ./slow-io
```

上面的命令使用 autocannon 对一个具有 IO 问题的应用进行测试，测试完成后，会自动在浏览器中打开 Doctor 工具。
> This will run autocannon against a simple app with an IO issue and once it's complete it will automatically launch the Doctor tool inside your browser.

### 接下来

通常，在使用 Clinic 时，我们首先使用 Clinic Doctor 来确定应用程序中存在哪些性能问题。然后，Doctor 会告诉我们接下来应该用什么工具并提供具体分析的建议。
> Normally, when using Clinic, we begin by using Clinic Doctor to identify what performance problems exist in an application. Doctor will then give us recommendations on what tools and enquires to make next.