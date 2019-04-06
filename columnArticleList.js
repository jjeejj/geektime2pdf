// 获取专栏文章列表
const config = require('./config.js');
const superagent = require('superagent');
const utils = require('./utils');
const path = require('path');
const generaterPdf = require('./generaterPdf.js');

(async function getColumnArticleList (firstArticalId){
    await utils.createDir('geektime_'+config.columnName);
    console.log('专栏文章链接开始获取');
    let columnArticleUrlList = [];
    let articalId = firstArticalId;
    async function getNextColumnArticleUrl (){
        try {
            let res = await superagent.post(config.url)
            .set({
                'Content-Type': 'application/json',
                'Cookie': config.cookie,
                'Referer': config.columnBaseUrl + articalId,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
            }).send({
                'id': articalId,
                'include_neighbors': true
            });
            if (res.body && res.body.error && res.body.error.code){
                console.log('error msg', res.body.error.msg);
                throw new Error(res.body.error.msg);
            };
            console.log(res.body.data.article_title);
            let columnArticle = res.body.data;

            let articleInfo = {
                articleTitle: columnArticle.article_title, // 文章标题
                articalUrl: config.columnBaseUrl + articalId, // 文章地址
                articleContent: columnArticle.article_content, // 文章内容
                articleCover: columnArticle.article_cover, // 文章背景图
                authorName: columnArticle.author_name, // 文章作者
                articleCtime: utils.formatDate(columnArticle.article_ctime), // 文章创建时间 unix 时间戳 单位为 s 
                articleNeighbors: columnArticle.neighbors,  //  上下篇文章信息
                audioDownloadUrl: columnArticle.audio_download_url,
                audioTitle: columnArticle.audio_title
            };
            columnArticleUrlList.push(articleInfo);
            //生成PDF 
            await generaterPdf(articleInfo,
                columnArticle.article_title + '.pdf',
                path.resolve(__dirname, 'geektime_' + config.columnName)
            );
            // 判断是否还有下一篇文章
            let neighborRight = columnArticle.neighbors.right;
            if (neighborRight && neighborRight.id){
                articalId = neighborRight.id;
                await utils.sleep(1.5);
                await getNextColumnArticleUrl();
            };
        } catch(err){
            console.log(`访问 地址 ${config.columnBaseUrl + articalId} err`, err.message);
        };
    };
    await getNextColumnArticleUrl(firstArticalId);
    console.log('专栏文章链接获取完成');
    utils.writeToFile(`geektime_${config.columnName}`, JSON.stringify(columnArticleUrlList,null,4));
    return columnArticleUrlList;
})(config.firstArticalId);