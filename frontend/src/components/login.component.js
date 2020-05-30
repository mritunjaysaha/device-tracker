import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import Message from "../components/message.component";
import { AuthContext } from "../context/AuthContext";

const Login = (props) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.login(user).then((data) => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push("/device");
            } else {
                setMessage(message);
            }
        });
    };

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900">
                        Slow-carb next level shoindcgoitch ethical authentic,
                        poko scenester
                    </h1>
                    <p className="leading-relaxed mt-4">
                        Poke slow-carb mixtape knausgaard, typewriter street art
                        gentrify hammock starladder roathse. Craies vegan
                        tousled etsy austin.
                    </p>
                </div>
                <div
                    onSubmit={onSubmit}
                    className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
                >
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                        Log In
                    </h2>
                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Email"
                        type="email"
                        onChange={onChange}
                    />
                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Password"
                        type="password"
                        onChange={onChange}
                    />
                    <button className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
                        Log In
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                        Literally you probably haven't heard of them jean
                        shorts.
                        {message ? <Message message={message} /> : null}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
