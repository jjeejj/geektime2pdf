/**
 * 工具方法
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
 /**
  * 暂停几秒
  */
async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
};
/**
 * 创建单文件夹
 * 如果传入的参数是相对路径，在当前目录创建
 * 如果是绝对路径，就直接创建
 */
function createDir (dir){
    return new Promise((resolve) => {
        if(!dir) throw '请传入一个文件夹名称';
        if(!path.isAbsolute(dir)) {
            dir = path.resolve(__dirname, dir);
        };
        fs.stat(dir, (err, stat) => {
            if (err){ // 不存在进行创建
                fs.mkdirSync(dir);
            }else{
                console.log('该文件夹已经存在',dir);
            };
            resolve();
        });
    });
};

/**
 * 向指定的文件夹写入文件
 * @param {string} dir 需要写入的文件夹名称， 相对于项目目录的路径
 */
function writeToFile (dir, content){
    fs.writeFileSync(path.resolve(__dirname, dir, './articleInfoList.json'), content);
};

/**
 * 传进来的是unix 时间戳 单位 为 s
 * 返回对应的年月日
 * @param {Number} unixTime
 * @returns YYYY-MM-dd
 */
function formatDate (unixTime) {
    let date = new Date(unixTime * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

// ejs 文章模版
let articleEjsTempate = fs.readFileSync('./template/article.ejs', 'utf8');

// console.log(articleEjsTempate);
/**
 * 渲染 文章 ejs 模版 并返回 html 
 * @param {Object} 渲染 ejs 需要的数据
 * @param {options} 渲染配置项
 * @returns {String} html 页面字符串
 */
function renderEjsArticle2Html(data, options) {
    try {
        let html = ejs.render(articleEjsTempate, data, options);
        return html;
    } catch(err){
        throw err
    };
};

module.exports = {
    sleep,
    createDir,
    writeToFile,
    formatDate,
    renderEjsArticle2Html
};