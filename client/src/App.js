import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.omponent";
import Device from "./components/device.component";
import Dashboard from "./components/dashboard.component";
import GoogleApiWrapper from "./components/map.component";
function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/devices" component={Device}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/map" component={GoogleApiWrapper}></Route>
        </Router>
    );
}

export default App;
