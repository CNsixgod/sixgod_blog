// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.home.index);
  router.post('/admin/checkLogin', controller.admin.home.checkLogin);
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.home.getTypeInfo);
  router.post('/admin/addArticle', adminAuth, controller.admin.home.addArticle);
  router.post('/admin/updataArticle', adminAuth, controller.admin.home.updataArticle);
};
