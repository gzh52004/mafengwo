import React from 'react';
import CryptoJS from 'crypto-js'
import { Form, Input, Button, Checkbox } from 'antd';

import './reg.css';
import request from '../../utils/request';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8},
};
const rules = {
  username: [
      { required: true, message: '用户名不能为空' },
      {
          async validator(rule, value) {//validator 函数名 验证器
              if (!value) {
                  return
              }
              // 根据输入的用户名校验用户名是否被占用
              const { data } = await request.get('/user/checkuse', {
                  params: {
                      username: value
                  }
              });
              console.log(data);
              if (data.code === 0) {
                  return Promise.resolve();
              }
              return Promise.reject('用户名已存在');
          },
      }
  ]
}

function Reg(props) {
  const onFinish = async(values) => {
    console.log('Success:', values);
    //密码加密
    values.password= CryptoJS.SHA256(values.password).toString();
    console.log(values,"加密后密码");
    const {data} = await request.post("/user/reg",values)
    console.log(data);
  };

  return (
    <div className="reg">
       <Form
      style={{marginTop:"100px"}}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h2 style={{textAlign:"center"}}>mms-注册页面</h2>
      <Form.Item
        label="用户名"
        name="username"
        rules={rules.username}
        style={{marginBottom:"20px"}}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' },{ min: 6, max: 12, message: '密码长度必须为6-12位字符' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{marginRight:"100px"}}>
          注册
        </Button>
        <Button type="primary" htmlType="submit" onClick={() => props.history.push("/login")} >
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default Reg;
