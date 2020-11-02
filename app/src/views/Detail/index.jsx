import React, {useEffect,useState} from "react"
import { Icon } from 'antd-mobile';

import "./index.scss"
import request from "../../../request"
let Detail = (props)=>{
    let {id} = props.match.params
    let [state,newState] = useState([])
    useEffect( function(){
        // let {data:{data}} = await request.get("/goods/single/" + id)
        let data;
        request.get("/goods/single/" + id).then(res=>{
            data = res.data.data
            newState(data)
        })
    },[])
    let goto = ()=>{
        props.history.push("/")
    }
    return ( 
        <div>
            <header id="detail">
                <h1 onClick={goto.bind(this)}>
                    <img src="/images/logo2.png" alt=""/>
                </h1>
                <div>
                    <input type="text" placeholder="搜索目的地/攻略/游记"/>
                    
                    <Icon type="search" size={"xxs"} />
                </div>
            </header>
            <main className="detail">
                {

                    state.map(item=>{
                        return (
                        <div key={item}>
                            <img src={item.data.image} alt=""/>
                            <h2>{item.data.title}</h2>
                            <p>介绍：{item.data.content}</p>
                            <div className="author">
                                <span>作者名称：<br/>{item.data_source.user.name}</span>

                                <div className="img_box">
                                    作者头像<img src={item.data_source.user.logo} alt=""/>
                                </div>
                                
                            </div>
                            <div className="trip">
                                <h3>旅游注意事项</h3>
                                <img src="/images/tour.jpg" alt=""/>
                                <img src="/images/tour2.jpg" alt=""/>
                                <img src="/images/tour3.jpg" alt=""/>
                            </div>
                        </div>
                        )
                    })
                }

            </main>

                

        </div>
    )
}
export default Detail