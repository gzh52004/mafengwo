/**
* 高阶组件
   * 高阶组件是一个函数
   * 高阶组件的参数为React组件
   * 高阶组件必须返回一个新的组件
*/
import React from 'react';
import {Redirect} from 'react-router-dom';

export function withUser(MyComponent){
    return function Get(props){console.log('OuterComponent.props',props)
        let userInfo = localStorage.getItem("useinfo") || sessionStorage.getItem("useinfo")
        try{
            userInfo = JSON.parse(userInfo)
        }catch(err){
            userInfo = {}
        }
        return <MyComponent {...props} userInfo={userInfo} />
    }
}

export function withAuth(InnerComponent){
    class OuterComponent extends React.Component{
        render(){console.log("hoc",this.props);
            if(this.props.userInfo){
                 // 用户登录后显示内容
                return <InnerComponent {...this.props} />
            }else{
                // console.log("未登录");
                return <Redirect to="/login" />
                
            }
    }
}
    return withUser(OuterComponent);
}