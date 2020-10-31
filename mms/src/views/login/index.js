import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';


import './login.css';
import request from '../../utils/request';



class Login extends React.Component {

  onFinish = async (values) => {
    console.log('Success:成功', values);
    let { username, passward, remember } = values;
    const { data } = await request.post("/user/login", {
        username:username,
        passward:passward
    })
    console.log(data, "data");
    if (data.code) {
      // if(values.remember){
      //     localStorage.setItem('useinfo',JSON.stringify(data.data))
      // }else{
      //     sessionStorage.setItem('useinfo',JSON.stringify(data.data))
      // }
      sessionStorage.setItem('useinfo',JSON.stringify(values))
      message.success("登陆成功")
      setTimeout(()=>{this.props.history.push("/home");console.log(this);},2000) 
  }else{
    message.success("用户名密码错误")
  }
  }
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 8 },
    };
    const { onFinish } = this

    // const onFinishFailed = errorInfo => {
    //   console.log('Failed:完成', errorInfo);
    // };
    return (
      <div className="login">
        <Form
          style={{ marginTop: "100px" }}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
          <h2 style={{ textAlign: "center" }}>mms-登录页面</h2>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空!' }]}
            style={{ marginBottom: "20px" }}
          // onFieldsChange={onFieldsChange}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: "100px" }}>
              登录
        </Button>
            <Button type="primary" htmlType="submit" onClick={() => this.props.history.push("/reg")} >
              注册
        </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Login;
