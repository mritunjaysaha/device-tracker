import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.omponent";
function App() {
    // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    //     AuthContext
    // );

    // console.log(user);
    // console.log(isAuthenticated);

    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
        </Router>
    );
}

export default App;
