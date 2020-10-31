import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import "./apphead.css"


class AppHead extends React.Component {

  onClick = ({ key }) => {
    if (key === "1") {
      message.info(`完善信息页面`);
    } else if (key === "2") {
      message.info(`修改密码`);
    } else if (key === "3") {

      //清除前端保存的用户名和密码信息
      localStorage.removeItem("useinfo")
      sessionStorage.removeItem("useinfo")
      
      message.info(`退出账号`);
      setTimeout(()=>{this.props.data.history.push("/login");},2000)
    }
  };

  state = {
    menu: (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1">完善个人信息</Menu.Item>
        <Menu.Item key="2">修改密码</Menu.Item>
        <Menu.Item key="3">退出</Menu.Item>
      </Menu>
    )
  }

  render() {
    console.log(this.props,"header");
    const { menu } = this.state
    return (
      <div className="AppHead" style={{ backgroundColor: 'gery' }}>
        <a>
          <img className="logo" src="/logo512.png" style={{ width: "50px", height: "45px" }} />
          <span className="company">React后台管理系统</span>
        </a>

        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            用户信息
     <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  }
}



export default AppHead;