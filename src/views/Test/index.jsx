import React, { Component } from 'react'
import request from "../../../request"
import { Icon , Carousel, WingBlank, ListView } from 'antd-mobile';

import "./index.scss"

class Test extends React.Component{
    render(){
      return(
        <div>
          <header>
            <h1>
                <img src="/images/logo2.png" alt=""/>
            </h1>
            <div>
                搜索目的地/攻略/游记
                <Icon type="search" size={"xxs"} />
            </div>
            <a href="#">登录</a>
          </header>
          <main></main>
        </div>
       
      )
    }
}

export default Test