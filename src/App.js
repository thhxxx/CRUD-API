import "./assets/css/App.scss"
import {Home} from "./views/Home";
import {Nav} from "./components/Nav";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Cart} from "./views/Cart";
import {LogIn} from "./views/LogIn";

function App() {
    return (
        <div className="App">
            <Router>
                <div>

                    <Nav/>

                    <Switch>
                        <Route exact={true} path="/log-in">
                            <LogIn/>
                        </Route>
                        <Route exact={true} path="/cart">
                            <Cart/>
                        </Route>
                        <Route exact={true} path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
