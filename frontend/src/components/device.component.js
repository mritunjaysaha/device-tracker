import React, { useState, useContext, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import { AuthContext } from "../context/AuthContext";
import Message from "./message.component";

const DeviceItem = (props) => {
    return <li>{props.device.name}</li>;
};

const Device = () => {
    const [device, setDevice] = useState({ name: "" });
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        DeviceService.getDevices().then((data) => {
            setDevice(data.devices);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        DeviceService.postDevices().then((data) => {
            const { message } = data;
            resetForm();

            if (!message.msgError) {
                DeviceService.getDevices().then((getData) => {
                    setDevices(getData.devices);
                    setMessage(message);
                });
            } else if (message.msgBody === "unAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "" });
                authContext.setIsAuthenticated(false);
            } else {
                setMessage(message);
            }
        });
    };

    const onChange = (e) => {
        setDevice({ name: e.target.value });
    };

    const resetForm = () => {
        setDevice({ name: "" });
    };

    return (
        <div>
            <ul className="list-group">
                {devices.map((device) => {
                    return <DeviceItem key={device._id} device={device} />;
                })}
            </ul>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor="device">Enter Device</label>
                <input
                    type="text"
                    name="todo"
                    value={device.name}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Please Enter Todo"
                />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            {message ? <Message message={message} /> : "Hello, World"}
        </div>
    );
};

export default Device;
