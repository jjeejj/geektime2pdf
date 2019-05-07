// 获取每篇文章下面所有的评论
const config = require('./config.js');
const superagent = require('superagent');
const utils = require('./utils');

/**
 * 获取每篇文章下面所有的评论
 * @param {String} 文章的链接地址
 * @param {Number} 文章的ID
 */
async function downloadComments (url, articleId, prev = 0) {
    console.log('开始获取 ', url, '评论');
    let commentsArr = [];
    let commentsTotal = 0;
    async function run (prev) {
        try {
            let res = await superagent.post(config.commentUrl)
            .set({
                'Content-Type': 'application/json',
                'Cookie': config.cookie,
                'Referer': url,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
            }).send({
                aid: articleId,
                prev: prev
            });
            if (res.body && res.body.error && res.body.error.code){
                console.log('error msg', res.body.error.msg);
                throw new Error(res.body.error.msg);
            };
            let resData = res.body.data
            commentsTotal = resData.page.count;
            let nextPage = resData.page.more;
            commentsArr.push(...resData.list);
            if (nextPage) {
                prev = resData.list[resData.list.length -1].score;
                await utils.sleep(1);
                await run(prev);
            };
        }catch (err){
            console.log(`获取 评论 ${url} err`, err.message);
        };
    };
    await run(prev);
    // console.log('commentsArr', commentsArr);
    // console.log('commentsTotal', commentsTotal);
    console.log('结束获取 ', url, '评论 总评论数为', commentsTotal);
    return {commentsArr, commentsTotal};
};

// downloadComments('https://time.geekbang.org/column/article/82337',82337);

module.exports = downloadComments;