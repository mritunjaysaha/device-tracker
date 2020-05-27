import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <a href="#" class="navbar-brand">
                    DevTrkr
                </a>

                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <a href="#" class="nav-link">
                                Devices
                            </a>
                        </li>
                        <li className="navbar-item">
                            <Link to="/devices" className="nav-link">
                                Create Device log
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">
                                Create User
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
