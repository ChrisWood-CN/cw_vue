const program = require('commander');

const helpOptions = () => {
    // 添加单个选项
    program.option('-w --why', 'a coderwhy option')
        .option('-s --src <src>', 'a source folder')
        .option('-d --dest <dest>', 'a destination folder, 例如: -d src/pages, 错误/src/pages')
        .option('-f --framework <framework>', 'your framework name');

    // 监听help指令
    program.on('--help', function () {
        console.log("");
        console.log("usage");
        console.log("   cw_vue -v");
        console.log("   cw_vue --version");
    })
}

module.exports = helpOptions;