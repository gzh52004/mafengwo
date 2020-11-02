import React,{useState} from "react"
import { NavBar, Icon, List, InputItem, Toast,Button, WingBlank  } from 'antd-mobile';
import {useHistory} from "react-router-dom";
import CryptoJS from "crypto-js";
import request from "../../../request"

import "./index.scss"
let Reg = ()=>{
    let change = useHistory()
    let state = {
        hasError: false,
        value: '',
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
    let onBlur = () => {
        // console.log(oldState)
        if(oldState.hasError || !oldState.value){
            return;
        }
        request.get("/user/checkuse",{
            params:{
                username:oldState.value
            }
        }).then(res => {
            // console.log(res)
            if(!res.data.code){
                Toast.success(res.data.msg,1)
                newState({
                    ...oldState,
                    hasuser:true
                })
            }else{
                Toast.fail(res.data.msg,1)
                newState({
                    ...oldState,
                    hasuser:false
                })
            }
        })
    }
    let register = ()=>{
        if(!oldState.hasuser){
            Toast.fail("注册失败,用户名已被使用",1)
            return
        }
        let password = CryptoJS.SHA256(oldState.password).toString();
        request.post("/user/reg",{
           username:oldState.value,
           password:password
        }).then(() => {
                Toast.success("注册成功",1)
                change.push({pathname:"/login",state:{username:oldState.value}})
        })
    }
    let goto = ()=>{
        change.push("/login");
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
            >免费注册</NavBar>
            <List renderHeader={() => '注册'}>
            <InputItem
                type="text"
                placeholder="请输入账号"
                error={oldState.hasError}
                onErrorClick={onErrorClick}
                onChange={onChange}
                onBlur={onBlur}
                value={oldState.value}

            >账号</InputItem>
             <InputItem
             type="password"
            clear={true}
            placeholder="输入密码"
            // value={oldState2.password}
            value={oldState.password}
            onChange={onPassword}
            >密码</InputItem>
            </List>
            <WingBlank style={{marginTop:"20px", textAlign:"center"}}>
                <Button onClick={register} type="ghost" inline size="small" style={{ marginRight: '4px' }}>注册</Button>
                <Button onClick={goto} type="ghost" inline size="small" style={{ marginRight: '4px' }}>登录</Button>
            </WingBlank>
        </div>
    )
}
export default Reg
