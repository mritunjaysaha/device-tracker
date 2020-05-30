import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.omponent";
import Device from "./components/device.component";
function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/device" component={Device}></Route>
        </Router>
    );
}

export default App;
