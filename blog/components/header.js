import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import {Row, Col, Menu, Icon} from 'antd'
import Axios from 'axios';
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import Router from 'next/router'

export default () => {
  const [navArr, setNavArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(servicePath.getTypeInfo).then((res) => {
        // setNavArray(res.data.data)
        return res.data.data
      })
      setNavArr(result)
    }
    fetchData()
  },[])

  const handleClick = (e) => {
    if(e.key == 0) {
      Router.push('/index')
    }else {
      Router.push('/list?id='+e.key)
    }
  }

  return (
    <div className="sixgod_header">
      <Row type="flex" justify="center" >
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="sixgod_logo">SixGod</span>
          <p className="sixgod_txt">思而不学则黄， 醉生梦死在FONTEND</p>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>

            <Menu.Item key="0">
              <Icon type="home" />
              首页
            </Menu.Item>
            {
              navArr.map(item => {
                return(
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}