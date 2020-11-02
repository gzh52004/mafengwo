import React,{useState} from "react"
import { NavBar, Icon, List, InputItem, Toast,Button,WingBlank  } from 'antd-mobile';
import {useHistory} from "react-router-dom";
import CryptoJS from "crypto-js";
import request from "../../../request"
import {connect} from "react-redux"

let Login = (props)=>{
    let change = useHistory()
    let {username} = props.location.state || ""
    let state = {
        hasError: false,
        value: username,
        password:"",
        hasuser:false,
      }
    let [oldState,newState] = useState(state)
    let onErrorClick = () => {
        if (oldState.hasError) {
          Toast.info('账号最少为6位');
        }
      }
    let onChange = (value) => {
        if (value.replace(/\s/g, '').length < 6) {
            newState({
                ...state,
                hasError:true,
                value
            })
        } else {
          newState({
              ...state,
              hasError:false,
              value
          }) 
        }
    }
    let onPassword = (value)=>{
        newState({
            ...oldState,
            password:value
        })
    }
    let login = ()=>{
        if(!oldState.value){
            return
        }
        let password = CryptoJS.SHA256(oldState.password).toString();
        request.post("/user/login",{
           username:oldState.value,
           password:password
        }).then(res => {
            let {data:{data}} = res
            let username
            if(data){
                username = data[0]
            }else{
                res.data
            }
            props.dispatch({type:"login",user:username})

            if(res.data.code){
                let {search} = props.location
                let arr = search.match(/targetUrl\=([\/\w\-]+)/)
                let targetUrl
                if (arr) {
                    targetUrl = arr[1]
                }
                Toast.success("登录成功",1)
                props.history.push({
                    pathname: targetUrl || "/home"
                })
            }else{
                Toast.fail("用户名或密码错误",1)
            }
        })
    }
    let goto = ()=>{
        change.push("/reg");
    }
    let back = ()=>{
        change.goBack();
    }
    return (
        <div>
            <NavBar
            mode="dark"
            leftContent="Back"
            onLeftClick={back}
            rightContent={[
                <Icon key="1" type="ellipsis" />,
            ]}
            >登录</NavBar>
            <List renderHeader={() => '登录'}>
            <InputItem
                type="text"
                placeholder="请输入账号"
                error={oldState.hasError}
                onErrorClick={onErrorClick}
                onChange={onChange}
                value={oldState.value}

            >账号</InputItem>
             <InputItem
             type="password"
            clear={true}
            placeholder="输入密码"
            value={oldState.password}
            onChange={onPassword}
            >密码</InputItem>
            </List>
            <WingBlank style={{marginTop:"20px", textAlign:"center"}}>
                <Button onClick={goto} type="ghost" inline size="small" style={{ marginRight: '4px' }}>注册</Button>
                <Button onClick={login} type="ghost" inline size="small" style={{ marginRight: '4px' }}>登录</Button>
            </WingBlank>
        </div>
    )
}

Login = connect()(Login)
export default Login
