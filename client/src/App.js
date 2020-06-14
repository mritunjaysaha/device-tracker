import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import Register from "./components/register.omponent";
import Device from "./components/device.component";
import Dashboard from "./components/dashboard.component";
import MapBoxGLMap from "./components/map.component";
function App() {
    return (
        <Router>
            <Navbar />

            <Route exact path="/" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/devices" component={Device}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/map" component={MapBoxGLMap}></Route>
        </Router>
    );
}

export default App;
