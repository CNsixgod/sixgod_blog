// eslint-disable-next-line strict
module.exports = option => {
  return async function adminauth(ctx, next) {
    console.log(ctx);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '没有登陆', code: 101 };
    }
  };
};
