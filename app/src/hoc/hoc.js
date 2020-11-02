import React from "react"
import {Redirect} from "react-router-dom"

function withuser(Mycomponent){
    return function Mytest(props) {
        let currentUser = localStorage.getItem("currentUser");
        try{
            currentUser = JSON.parse(currentUser);
        }catch(err){
            currentUser = {}
        }
        return <Mycomponent {...props} currentUser={currentUser}></Mycomponent>
    }
}

function withverify(Sendcomponent) {
    @withuser
    class Sendverify extends React.Component{
        render(){
           let {currentUser,location:{pathname}} = this.props
           if(currentUser){
               return <Sendcomponent {...this.props}></Sendcomponent>
           }
           return <Redirect to={"/login?targetUrl=" + pathname}></Redirect>
        }
    }
    // return withuser(Sendverify)
    return Sendverify

    // class curvecomponent extends Sendcomponent {
    //     componentDidMount(){
    //         super.componentDidMount()
    //     }
    //     render(){
    //         if(this.props.info){
    //             return super.render()
    //         }
    //         return <Redirect to="/login"></Redirect>
    //     }
    // }
    // return withuser(curvecomponent)
}
export {withuser,withverify}