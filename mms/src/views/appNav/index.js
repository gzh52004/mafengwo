import React from 'react';
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";

import { Menu } from 'antd';
import { UserOutlined , GiftOutlined , ProfileOutlined  } from '@ant-design/icons';
import "./appnav.css"
import User from "../appMain/user"
import Shop from "../appMain/shop"
import Order from "../appMain/order"
import Aam from '../appMain/aam';

// @withRouter
class AppNav extends React.Component {
    state={
        menu:[
            {
                text:'驴友分享',
                path:'/home/user',
                name:'user',
                icon:<UserOutlined />,
                component:User
            },
            {
                text:'景点介绍',
                path:'/home/shop',
                name:'shop',
                icon:<GiftOutlined />,
                component:Shop
            },
            {
                text:'旅游攻略',
                path:'/home/order',
                name:'order',
                icon:<ProfileOutlined />,
                component:Order
            },
            {
                text:'用户管理',
                path:'/home/aam',
                name:'aam',
                icon:<ProfileOutlined />,
                component:Aam
            },
        ],
        current: '/home/user',
    }
      

  changeMenu = (key)=>{
        console.log(key,"key");
        this.props.history.push(key.key);
        this.setState({
            current:key.key
        })
    }
    UNSAFE_componentWillMount(){//刷新页面保持current的位置
        // history,location,match
        const {pathname} = this.props.location;
        this.setState({
            current:pathname
        })
    }

  render(){  
    const {menu,current} = this.state
  return (
      <div className="content">
    <div className="AppNav" style={{backgroundColor:'#001529'}}>
       
     <Menu onClick={this.changeMenu} selectedKeys={[current]} mode="vertical" theme="dark">
                        {
                            menu.map(item => <Menu.Item 
                                key={item.path}   
                            >{item.text}</Menu.Item>)
                        }
                    </Menu>
      </div>
      <div className="main">
      <Switch>   
        
        {menu.map(item => <Route key={item.name} path={item.path} component={item.component}></Route>)}
        <Redirect from='/home' to='/home/user' exact />
        
        </Switch>
    </div>
    </div>
  );
}
}

AppNav = withRouter(AppNav);//withRouter高阶组件，可以使不是Route渲染的组件也获得history
export default AppNav;