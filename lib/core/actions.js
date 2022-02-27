// node模块
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
// 第三方模块
const program = require('commander');
const downloadRepo = promisify(require('download-git-repo'));
const open = require('open');
// 自定义模块
const repoConfig = require('../config/repo_config');
const log = require('../utils/log');
const terminal = require('../utils/terminal');
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file');

//封装ejs到文件的转化过程
const handleEjsToFile = async (name, dest, template, filename) => {
    // 1.获取模块引擎的路径
    const templatePath = path.resolve(__dirname, template);
    const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase() });

    // 2.写入文件中
    // 判断文件不存在,那么就创建文件
    mkdirSync(dest);
    const targetPath = path.resolve(dest, filename);
    writeFile(targetPath, result);
}

// 封装对应的actions
// 封装创建过程
const createProject = async (project, otherArg) => {
    // 1.提示信息
    log.hint('cw_vue helps you create your vue project, please wait a moment~');

    // 2.clone项目从仓库
    await downloadRepo(repoConfig.vueGitRepo, project, { clone: true });

    // 3.执行终端命令npm install
    // terminal.exec('npm install', {cwd: `./${project}`});
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

    // 4.打开浏览器
    open('http://localhost:8080/');

    // 5.运行项目
    await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` });
}
// 封装创建component
const addComponent = async (name, dest) => {
    //插入name.vue文件
    handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`);
}
// 封装创建page过程
const addPage = async (name, dest) => {
    addComponent(name, dest);
    //插入vue-router
    handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}
// 封装创建store过程
const addStore = async (name, dest) => {
    //插入vue-store
    handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
    //插入vue-types
    handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
    createProject,
    addComponent,
    addPage,
    addStore
}