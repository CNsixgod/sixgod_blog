import React, {useState} from 'react'
import Head from 'next/head'
import {List,icon,Row, Col, Icon, Breadcrumb, Affix} from 'antd'
import '../static/style/pages/details.css'
import 'markdown-navbar/dist/navbar.css'
import Axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import servicePath from '../config/apiUrl'


// 自定义组件
import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/adverticement'
import Footer from '../components/footer'
import Tocify from '../components/tocify.tsx'


const details = (props) => {
  // market && marked nav配置
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading=function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  

  let markdown = '# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  let html = marked(markdown) 

  return (
    <div>
      <Head>
        <title>details</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header/>
      
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a>视频列表</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
            {props.title}
            </div>
        
            <div className="list-icon center">
              <span><Icon type="calendar" /> {props.addTime}</span>
              <span><Icon type="folder" /> {props.typeName}</span>
              <span><Icon type="fire" /> {props.view_count}</span>
            </div>
          
            <div className="detailed-content"
              dangerouslySetInnerHTML={{__html: html}}
            >
            </div>
            </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

details.getInitialProps = async (ctx) => {
  let id = ctx.query.id

  return await new Promise((resolve) => {
    Axios(`${servicePath.getArticleById}/${id}`).then((res) => {
      resolve(res.data.data[0])
    })
  })
}

export default details

