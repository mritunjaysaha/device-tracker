import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

const Navbar = (props) => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        );
    };

    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>

                <Link to="/devices">
                    <li className="nav-item nav-link">Devices</li>
                </Link>
                <button
                    type="button"
                    className="btn btn-link nav-item nav-link"
                    onClick={onClickLogoutHandler}
                >
                    <Link to="/">Logout</Link>
                </button>
            </>
        );
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">DevTrkr</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated
                        ? unauthenticatedNavBar()
                        : authenticatedNavBar()}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
