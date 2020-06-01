import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
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
                <Link className="mr-5 hover:text-gray-900" to="/">
                    Home
                </Link>
                <Link className="mr-5 hover:text-gray-900" to="/login">
                    Login
                </Link>
                <Link className="mr-5 hover:text-gray-900" to="/register">
                    Register
                </Link>
            </>
        );
    };

    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/dashboard" className="mr-5 hover:text-gray-900">
                    Dashboard
                </Link>

                <Link to="/devices" className="mr-5 hover:text-gray-900">
                    Devices
                </Link>
                <button type="button" onClick={onClickLogoutHandler}>
                    <Link to="/" className="mr-5 hover:text-gray-900">
                        Logout
                    </Link>
                </button>
            </>
        );
    };

    return (
        <header className="body-font bg-teal-400">
            <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">DevTrkr</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap justify-center">
                    {!isAuthenticated
                        ? unauthenticatedNavBar()
                        : authenticatedNavBar()}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;