import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/AuthService";
import Message from "../components/message.component";

const Register = (props) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setUser({ username: "", password: "" });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.login(user).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 2000);
            }
        });
    };

    return (
        // <div className="container">
        //     <form onSubmit={onSubmit} className="form-group">
        //         <h3 class="text-center">Register</h3>
        //         <label htmlFor="username" className="sr-only">
        //             Username:
        //         </label>
        //         <input
        //             type="text"
        //             name="username"
        //             onChange={onChange}
        //             className="form-control"
        //             placeholder="mack@gmail.com"
        //         />
        //         <label htmlFor="password" className="sr-only">
        //             Password:
        //         </label>
        //         <input
        //             type="password"
        //             name="password"
        //             onChange={onChange}
        //             className="form-control"
        //             placeholder="!Mp$t@nt"
        //         />
        //         <button className="btn btn-lg btn-primary btn-block">
        //             Register
        //         </button>
        //         {message ? <Message message={message} /> : null}
        //     </form>
        // </div>
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
                <form
                    onSubmit={onSubmit}
                    className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
                >
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                        Sign Up
                    </h2>
                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Email"
                        type="email"
                        onChange={onChange}
                        name="email"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Password"
                    />
                    <button
                        className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    {message ? <Message message={message} /> : null}
                </form>
            </div>
        </section>
    );
};

export default Register;
