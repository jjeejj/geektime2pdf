# 极客时间专栏转换为PDF

>说明：该项目仅仅只能用户个人学习使用，不能在商业中使用，若极客时间官方要求该代码仓库删除，请联系我进行删除

## 使用方法

### 配置信息

在配置文件[config.js](./config,js)中修改配置所需要的信息

```js
/**
 * 需要转换为 pdf 的配置信息 
 */
module.exports = {
    url: 'https://time.geekbang.org/serv/v1/article', // 该配置项不需要改动
    commentUrl: 'https://time.geekbang.org/serv/v1/comments', // 该配置项不需要改动
    columnBaseUrl: 'https://time.geekbang.org/column/article/', // 该配置项不需要改动
    columnName: '玩转VScode', // 专栏名称
    firstArticalId: 18053, //专栏第一篇文章的ID
    articalIds: [201700,202772,204472,205784],  //指定下载的articalId, 优先级更高, 配置后firstArticalId配置将失效
    isdownloadVideo: false, // 是否下载音频
    isComment: false, // 是否导出评论
    cookie: 'cookie'
};
```

* 上面的配置项**前三项是不需要修改**的, 只需要修改后面的专栏信息

* 会自动生成一个`geektime_{{columnName}}` 的文件夹来保存导出的所有`pdf`文件, `columnName` 为上面配置的

* `firstArticalId` 这个参数最好配置专栏第一篇文章的 `ID` ，这个可以获取专栏的所有的文章,若不是第一篇文章的`ID` 则获取的是该文章以及之后的文章

* `articalIds` 这个参数配置为需要获取的文章的所有的 `ID`

* `cookie` 你在网页版登录后返回的`cookie`信息

### 运行

1. `git clone git@github.com:jjeejj/geektime2pdf.git` 在本地克隆下来
2. 然后执行 `npm i` 安装依赖
3. 运行主程序 `node columnArticleList.js` 等待一段时间,生成 `PDF` 完成

> 这里可以先设置 `firstArticalId` 参数，获取整个专栏的内容；若中间有错误，不用管它，等运行完毕后，再设置 `articalIds` 参数，参数的值为上面获取失败的文章 `ID`，再次运行下载

![](./image/geektime_run.png)

## 导出结果

![](./image/geektime_VScode_filelist.png)

![](./image/geektime_file_content.png)

## 问题汇总

* `puppeteer` 下载失败问题，参考 [stackoverflow](https://stackoverflow.com/questions/53997175/puppeteer-error-chromium-revision-is-not-downloaded)