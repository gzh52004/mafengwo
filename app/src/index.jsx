import React from "react";
import {render} from "react-dom";
import {HashRouter,BrowserRouter} from 'react-router-dom';

import App from "@/App";

const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

// import store from "./store"
render(
    <Router>
        <App />
    </Router>
    ,
    document.querySelector("#app")
)