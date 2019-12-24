const baseUrl = 'http://127.0.0.1:7005/admin/'

export default {
  checkLogin: baseUrl + 'checkLogin' ,  //  检查用户铭密码
  getTypeInfo: baseUrl + 'getTypeInfo' ,  // 获得文章类别信息
  addArticle: baseUrl + 'addArticle' ,  // 
  updataArticle: baseUrl + 'updataArticle' ,  // 
}
