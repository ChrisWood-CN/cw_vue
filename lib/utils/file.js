const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const log = require('./log');
// 封装ejs的编译过程
const ejsCompile = (templatePath, data = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, options, (err, str) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(str);
        })
    })
}

// 封装创建文件夹的过程
const mkdirSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}
// 封装写入文件的过程：
const writeFile = (path, content) => {
    if (fs.existsSync(path)) {
        log.error("the file already exists~")
        return;
    }
    return fs.promises.writeFile(path, content);
}

module.exports = {
    ejsCompile,
    writeFile,
    mkdirSync
}