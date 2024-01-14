import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { Route, Switch, HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Login from "./components/Login";

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={App} />
            </Switch>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
