import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreateDevice from "./components/create-device.component";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <br />
                <Route path="/users" component={CreateUser} />
                <Route path="/devices" component={CreateDevice} />
            </Router>
        </div>
    );
}

export default App;
