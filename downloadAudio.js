const path = require('path');
const superagent = require('superagent');
const fs = require('fs');
/**
 * 下载对应的音频文件
 * @param {String} url 音频文件的地址
 * @param {String} fileName 文件名称
 * @param {String} fileDir 保存文件夹地址
 */
const downloadAudio = async (url, fileName, fileDir = __dirname) => {
   console.log('开始下载 音频文件: ', fileName);
   if (!url) throw '请传入一个音频地址';
   if (path.extname(fileName) !== '.mp3'){ // 判断传的文件后缀是否是 mp3
      fileName = fileName + '.mp3';
   };
   let filePath = path.resolve(fileDir, fileName);
   let writeStream = fs.createWriteStream(filePath);
   superagent.get(url).pipe(writeStream);
   console.log('结束下载 音频文件: ', fileName);
};

// downloadAudio(
//    'https://static001.geekbang.org/resource/audio/e7/b1/e7ffca8ca5b09224969b3237723a0bb1.mp3',
//    '305 | 学会几个系统调用：咱们公司能接哪些类型的项目？.mp3',
//    '/Users/jiang/Project/geektime2pdf/geektime_趣谈Linux操作系统')

module.exports = downloadAudio;