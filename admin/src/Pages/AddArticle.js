import React, { useState,useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import axios from 'axios'
import servicePath from '../config/apiUrl'


import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";

const { Option } = Select;
const { TextArea } = Input;

export default ({history}) => {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择'); //选择的文章类别

  marked.setOptions({
    renderer: marked.Renderer(), // require
    gfm: true, // 启动类似Github样式的Markdown,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true, //支持Github形式的表格，必须打开gfm选项
    breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, // 优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false
  });

  // 预览
  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  // 获取文章分类
  const _getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then(res => {
      console.log(res);
      if(res.data.code === 100) {
        setTypeInfo(res.data.data)
      }
      if(res.data.code === 101) {
        history.push('/')
        localStorage.removeItem('openId')
      }
      
    }).catch(err => {
      console.log(err);
      
    })
  }

  const selectHandle = (val) => {
    setSelectType(val)
  }

  const saveData = () => {
    if(!selectedType) {
      message.error('文章类型不能为空')
      return false
    }
    if(!articleTitle) {
      message.error('文章标题不能为空')
      return false
    }
    if(!articleContent) {
      message.error('文章内容不能为空')
      return false
    }
    if(!introducemd) {
      message.error('文章简介不能为空')
      return false
    }
    if(!showDate) {
      message.error('文章日期不能为空')
      return false
    }
    let data = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      intruduce: introducemd,
      addTime: (new Date( showDate.replace('-', '/')).getTime()) / 1000,
    }
    if(articleId == 0) {
      data.view_count = 0;
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data,
        withCredentials: true,
      }).then(res => {
        setArticleId(res.data.id)
        if(res.data.isSuccess) {
          message.success('add success')
        } else {
          message.error('add error')
        }
  
      }).catch(err => {
        message.error(err)
      })
    } else {
      data.id = articleId
      axios({
        method: 'post',
        url: servicePath.updataArticle,
        data,
        withCredentials: true
      }).then(res => {
        if(res.data.isSuccess) {
          message.success('updata ok')
        }else {
          message.error('updata err')
        }
      }).catch(err => {
        message.error(err)
      })
    }
  }
  
  useEffect(() => {
    _getTypeInfo()
  }, [])

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input value={articleTitle} onChange={e => setArticleTitle(e.target.value)} placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectHandle}>
                {
                  typeInfo.map((item, index) => {
                  return <Option value={item.id} key={index}>{item.typeName}</Option>
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveData}>
              {articleId ? '编辑文章' : '发布文章'}
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker placeholder="发布日期" size="large" onChange={(date, dateString) => setShowDate(dateString)} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
