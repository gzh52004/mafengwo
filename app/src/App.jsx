import React from "react";
import {Redirect, Route, Switch} from "react-router-dom"

import Home from "~/Home"
import Reg from "~/Reg"
import Login from "~/Login"
import Detail from "~/Detail"
import Demo from "~/Demo"
import Test from "~/Test"
import "@/common/reset.scss"



let App = ()=>{
    return (
        <div style={{height:"100%"}}>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/reg" component={Reg}/>
                <Route path="/login" component={Login}/>
                <Route path="/detail/:id" component={Detail}/>
                <Route path="/demo" component={Demo}/>
                <Route path="/test" component={Test}/>
                <Route path="/notfound" render={()=><div>404</div>} />
                <Redirect from="/" to="/home" exact></Redirect>
                <Redirect to="/notfound"></Redirect>

            </Switch>
        </div>
        
    )
}
export default App