/* eslint-disable prefer-const */
'use strict';
const path = require('path');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api hi';
  }

  async getArticleList() {
    const sql = "select article.id as id, article.title as title, article.intruduce as intruduce, FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, article.view_count as view_count, type.typeName as typeName from article left join type on article.type_id = type.id";
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
      code: 100,
    };
  }

  async getArtilceById() {
    let id = path.parse(this.ctx.req.url).name;
    let sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.intruduce as intruduce,' +
        'article.article_content as article_content,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ,' +
        'type.id as typeId ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
        'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getListById() {
    let id = path.parse(this.ctx.req.url).name;
    let sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.intruduce as intruduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.id ' +
    'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
