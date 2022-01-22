/*!

*******************************************************
* BLK Design System React - v1.2.0
*******************************************************

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

*******************************************************

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import { initContract } from "services/NearRCP";
import App from "./App";
import DetailPage from "pages/DetailPage";
import DownloadCSVPage from 'pages/DownloadCSVPage';


window.nearInitPromise = initContract()
    .then(() => {
        ReactDOM.render(
            <HashRouter>
                <Switch>
                    <Route path="/guilds" render={(props) => <App {...props} />} />
                    <Route
                        path="/detail/:slug"
                        render={(props) => <DetailPage {...props} />}
                    />
                    <Route
                        path="/download-csv/:slug"
                        render={(props) => <DownloadCSVPage {...props} />}
                    />
                    <Redirect from="/" to="/guilds" />
                </Switch>
            </HashRouter>,
            document.getElementById("root")
        )
    }
)
.catch(console.error)


