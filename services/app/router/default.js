// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArtilceById/:id', controller.default.home.getArtilceById);
  router.get('/default/getTypeInfo/', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);
};
