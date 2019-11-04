import React, {useState} from 'react'
import Head from 'next/head'
import {List,icon,Row, Col, Icon} from 'antd'
import Link from 'next/link'
import '../static/style/pages/index.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

// 自定义组件
import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/adverticement'
import Footer from '../components/footer'


const Home = (list) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  }); 




  const [myList, setMyList] = useState(
    list.data
  )

  myList.map(item => {
    item.intruduce = marked(item.intruduce)
  })
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            header="最新日志"
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title"><Link href={{pathname: '/details', query: {id:item.id}}}><a>{item.title}</a></Link></div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> {item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" /> {item.view_count}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: item.intruduce}}></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Home.getInitialProps = async () => {
  return await new Promise((resovle) => {
    axios(servicePath.getArticleList).then((res) => {
      resovle(res.data)
    })
  })
}

export default Home
