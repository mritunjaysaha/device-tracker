import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
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

    function unauthenticatedNavBar() {
        return (
            <>
                <Link className="mr-5  hover:text-gray-900" to="/">
                    Login
                </Link>
                <Link className="mr-5  hover:text-gray-900" to="/register">
                    Register
                </Link>
            </>
        );
    }

    function authenticatedNavBar() {
        return (
            <>
                <Redirect to="/dashboard" />
                <Link to="/dashboard" className="mr-5 mt-1 hover:text-gray-900">
                    Dashboard
                </Link>

                <Link to="/devices" className="mr-5 mt-1 hover:text-gray-900">
                    Add Device
                </Link>
                <Link className="mr-5 mt-1 hover:text-gray-900" to="/map">
                    Map
                </Link>
                <button type="button" onClick={onClickLogoutHandler}>
                    <Link
                        to="/"
                        className="inline-block text-sm px-8 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-100 hover:bg-teal-700  lg:mt-0"
                    >
                        Logout
                    </Link>
                </button>
            </>
        );
    }

    return (
        <header className="body-font bg-teal-400 z-20">
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
