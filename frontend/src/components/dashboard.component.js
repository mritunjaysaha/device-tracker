import React, { useState, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import AuthService from "../services/AuthService";
const DeviceItem = (props) => {
    return (
        <ul>
            <li>{props.device.name}</li>
            <li>{props.device.mac}</li>
        </ul>
    );
};

const Dashboard = () => {
    const [id, setId] = useState("");
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            if (data.isAuthenticated === true) {
                console.log(data.id);
                setId(data.id);
            }
        });
    });

    const getUser = () => {
        console.log(id);
    };
    return (
        <section className="text-gray-700 body-font relative">
            <div className="container px-5 py-12 mx-auto flex"></div>
            <button onClick={getUser}>USER</button>
        </section>
    );
};

export default Dashboard;
