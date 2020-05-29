import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";

function App() {
    // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    //     AuthContext
    // );

    // console.log(user);
    // console.log(isAuthenticated);

    return (
        <Router>
            <Navbar />
        </Router>
    );
}

export default App;
