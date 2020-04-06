/**
 * 需要转换为 pdf 的配置信息 
 */
module.exports = {
    url: 'https://time.geekbang.org/serv/v1/article',
    commentUrl: 'https://time.geekbang.org/serv/v1/comments',
    columnBaseUrl: 'https://time.geekbang.org/column/article/',
    columnName: '分布式协议与算法实战',
    firstArticalId: 201700, //专栏第一篇文章的ID
    articalIds: [201700,202772,204472,205784],  //指定下载的articalId, 优先级更高, 配置后firstArticalId配置将失效
    isdownloadVideo: true, // 是否下载音频
    isComment: true, // 是否导出评论
    cookie: 'cookie'
};