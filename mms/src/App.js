import React from 'react';
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import 'antd/dist/antd.css'

import Home from "./views/home"
import Reg from "./views/reg"
import Login from "./views/login"
import Header from "./views/appHead"

import './App.css';

function App() {
  const menu = [
    {},
  ]
  return (
    <div className="App">
      <Header />
      <Switch>
        //                 <Route path='/home' component={Home}></Route>
//                 <Route path='/login' component={Login}></Route>
//                 <Route path='/reg' component={Reg}></Route>
        {/* //                 <Route path="/nofind" render={()=>{return(<div>404</div>)}}></Route> */}
//                 <Redirect from='/' to='/home' exact />
        {/* <Redirect to="/nofind"></Redirect> */}
//            </Switch>
    </div>
  );
}

export default App;
