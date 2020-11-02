import React,{Suspense,lazy} from "react";
import {Redirect, Route, Switch} from "react-router-dom"

// import Home from "~/Home"
// import Reg from "~/Reg"
// import Login from "~/Login"
// import Detail from "~/Detail"
// import Review from "~/Review"
// import Strategy from "~/Strategy"
import "@/common/reset.scss"

const Home = lazy(() => import("~/Home"));
const Reg = lazy(() => import("~/Reg"));
const Login = lazy(() => import("~/Login"));
const Detail = lazy(() => import("~/Detail"));
const Review = lazy(() => import("~/Review"));
const Strategy = lazy(() => import("~/Strategy"));



let App = ()=>{
    return (
        <div style={{height:"100%"}}>
            <Suspense fallback={<div>loading...</div>}>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/reg" component={Reg}/>
                <Route path="/login" component={Login}/>
                <Route path="/detail/:id" component={Detail}/>
                <Route path="/review" component={Review}/>
                <Route path="/strategy" component={Strategy}/>
                <Route path="/notfound" render={()=><div>404</div>} />
                <Redirect from="/" to="/home" exact></Redirect>
                <Redirect to="/notfound"></Redirect>
            </Switch>
            </Suspense>
        </div>
        
    )
}
export default App