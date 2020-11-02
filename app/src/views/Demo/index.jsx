import React from "react"
import request from "../../../request"
import { ListView } from 'antd-mobile';
import "./index.scss"

class Demo extends React.Component{
  state={
    arr:["小白","小绿","小红","小黑","白","绿","红","黑"],
    arr2:[{
      name:"小白"
    },
    {
      name:"小绿"
    },
    {
      name:"小红"
    },
    {
      name:"小黑"
    },
    {
      name:"白"
    },
    {
      name:"绿"
    },],
    current:0,

    // imgarr:[
    //   {
    //     add:
    //   }
    // ]
  }
  render(){
    return(
      <div>
      <ul style={{display:"flex",overflowX:"auto",}}>
          {
            this.state.arr.map((item,index)=>{
              return <li className={this.state.current == index ? "active" : ""} onClick={()=>{this.setState({
                current:index
              })}} style={{width:'80px',height:"50px",flexShrink:0,lineHeight:"50px",textAlign:"center"}} key={item}>{item}</li>
            })
          }
      </ul>

      {
        this.state.arr2.map((item,index)=>{
          console.log(this.state.current,index)
          return (
            <div key={item.name} style={{display:this.state.current == index ? "block" : "none"}}>
              {item.name}
            </div>
              )
        })
      }
      </div>
    ) 
  }
}



export default Demo 
