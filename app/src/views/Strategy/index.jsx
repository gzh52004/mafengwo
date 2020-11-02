import React from "react"
import {  Icon,SearchBar } from 'antd-mobile';
import {withverify} from "@/hoc/hoc"


import "./index.scss"
import Hotlist from "./hotlist"
class Strategy extends React.Component{
    state={
        tripdata:{
            tit:"热门目的地",
            like:"最受大家喜欢的目的地推荐",
            arr:["热门1","热门2","热门3","热门4","热门5","热门6"]
        }
    }
    goin(path){
        this.props.history.push({
            pathname:path
        })
    }
    render(){
        return(
            <div className="strategy">
                <header >
                    <h1 onClick={this.goin.bind(this,"/home")}>
                        <img src="/images/logo2.png" alt=""/>
                    </h1>
                    <div className="top_r">
                        <span onClick={this.goin.bind(this,"/home")}>官方首页</span>
                        <Icon type="search" size={"xs"} />
                    </div>
                </header>
                <main>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <SearchBar placeholder="搜索目的地" maxLength={8} />
                        <section className="con">
                            <div className="img_box">
                                <img src="/images/oneimg.jpeg" alt=""/>
                                <p>神仙海岛的三款热门玩法，去普吉一定不能错过</p>
                            </div>
                        </section>
                        <Hotlist change={this.props} data={this.state.tripdata}></Hotlist>
                        <Hotlist data={this.state.tripdata}></Hotlist>
                        <Hotlist data={this.state.tripdata}></Hotlist>
                    </div>

                </main>
                
            </div>
            
        )
    }
}
Strategy = withverify(Strategy)

export default Strategy