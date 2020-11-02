import React from "react";
import {render} from "react-dom";
import {HashRouter,BrowserRouter} from 'react-router-dom';

import App from "@/App";
import {Provider} from "react-redux"
import store from "./store"

const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ,
    document.querySelector("#app")
)