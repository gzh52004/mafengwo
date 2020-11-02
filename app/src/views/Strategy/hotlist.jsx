import React from "react"
import request from "../../../request"
import "./hotlist.scss"

class HotList extends React.Component{
    state = {
        current:0,
        thelistdata:[],
    }
    componentDidMount(){
        request.get("/goods/list",{
            params:{
                page:1,
                pagesize:6
            }
        }).then(res=>{
            this.setState({
                ...this.state,
                thelistdata:res.data.data,
            })
        })
    }
    getdata(index){
        request.get("/goods/list",{
            params:{
                page:index+1,
                pagesize:6
            }
        }).then(res=>{
            this.setState({
                ...this.state,
                thelistdata:res.data.data,
                current:index
            })
        })
    }
    
    render(){
        let {tit,like,arr} = this.props.data
        return (
            <div className="hotlist">
                <div className="hot">
                    <h2>{tit}</h2>
                    <h3>{like}</h3>
                </div>
                <ul>
                    {arr.map((item,index)=>{
                       return <li onClick={this.getdata.bind(this,index)} className={this.state.current==index ? "active" : ""} key={item}><span>{item}</span></li>
                    })}
                </ul>
                {
                    arr.map((item,index)=>{
                        return <div className="see_box" key={item} style={{display:this.state.current==index ? "block":"none"}}>
                        {this.state.thelistdata.map((value)=>{
                        return (
                                <div className="list_box" key={value._id} onClick={()=>{this.props.change.history.push({pathname:"/detail/"+value._id})}}>
                                    <div>
                                        <img src={value.data.image} alt=""/>
                                    </div>
                                    <h3>
                                        {value.data_source.mdd.name}
                                    </h3>
                                </div>
                            
                        )
                            
                        }) }
                        </div>
                     })    
                }
            </div>
        )
    }
}


export default HotList