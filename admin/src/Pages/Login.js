import React, { useState } from 'react';
import 'antd/dist/antd.css'
import { Card, Input, Icon, Button, Spin, message } from 'antd'
import service from '../config/apiUrl'
import axios from 'axios'
import qs from 'qs'

import '../static/css/Login.css';

export default (props) => {

  // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  const [userName, setUserName] = useState('')
  const [passwd, setPasswd] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { history, location, match } = props
  const checkLogin = () => {
    setIsLoading(true)
    if(!userName) {
      message.error('用户名不能为空') && setIsLoading(false)
      return false
    } else if(!passwd) {
      message.error('密码不能为空') && setIsLoading(false)
      return false
    }
    let ReqData = {
      userName,
      password: passwd
    }

    axios({
      method: 'post',
      url: service.checkLogin,
      data: ReqData,
      withCredentials: true   // 前后端共享session  证书
    }).then(res => {
      setIsLoading(false)
      if(res.data.code !== 100) {
        message.error(res.data.data)
        return false
      }
      localStorage.setItem('openId', res.data.openId)
      history.push('/index')
    }).catch(err => {
      setIsLoading(false)
      message.error(err)
    })
  }

  return (
    <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
          <Card title="sixgod" bordered={true} style={{width:400}}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={(e)=>{setUserName(e.target.value)}}
          /> 
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
            onChange={(e)=>{setPasswd(e.target.value)}}
          />     
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
          </Card>
        </Spin>
    </div>
  )
}