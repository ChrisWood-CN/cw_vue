#!/usr/bin/env node
//自动在环境变量中查找node
const cmd = require('commander');
// 定义显示模块的版本号
cmd.version(require('./package.json').version);
// 解析终端指令
cmd.parse(process.argv);