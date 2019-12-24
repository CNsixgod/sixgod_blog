'use strict';
// const path = require('path');
/* eslint-disable prefer-const */


const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api(admin) hi';
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = `select userName from admin_user where userName = '${userName}' and password = '${password}'`;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = {
        data: '登陆成功',
        openId,
        code: 100,
      };
    } else {
      this.ctx.body = {
        data: '登陆失败,请填写正确账号密码',
        code: -100,
      };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {
      data: resType,
      code: 100,
    };
  }

  async addArticle() {
    let temp = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', temp);
    const isSuccess = result.affectedRows === 1;
    const id = result.insertId;
    this.ctx.body = {
      code: 100,
      isSuccess,
      id,
    };
  }

  async updataArticle() {
    let temp = this.ctx.request.body;
    const result = await this.app.mysql.update('article', temp);
    const isSuccess = result.affectedRows === 1;
    this.ctx.body = {
      code: 100,
      isSuccess,
    };
  }

  async getArticleList() {

    // let sql = 'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    //   'type.typeName as typeName ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //   'ORDER BY article.id DESC ';

    // const resList = await this.app.mysql.query(sql);
    // this.ctx.body = { list: resList };

  }
}

module.exports = HomeController;
