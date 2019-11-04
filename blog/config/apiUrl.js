const baseUrl = 'http://127.0.0.1:7003/default/'

export default {
  getArticleList: baseUrl + 'getArticleList' ,  //  首页文章列表接口
  getArticleById: baseUrl + 'getArtilceById',  // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: baseUrl + 'getTypeInfo',  // 
  getListById: baseUrl + 'getListById',  // 
}
