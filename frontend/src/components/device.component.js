import React, { useState, useContext, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import { AuthContext } from "../context/AuthContext";
import Message from "./message.component";
import DeviceItem from "./deviceItem.component";

const Device = () => {
    const [device, setDevice] = useState({ name: "" });
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        DeviceService.getDevices().then((data) => {
            setDevice(data.devices);
            console.log(device);
            console.log(devices);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("device: ", device);
        console.log("devices: ", devices);
        DeviceService.postDevice(device).then((data) => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
                DeviceService.getDevices().then((getData) => {
                    console.log("getData.device: " + getData.Device);
                    setDevices(getData.device);
                    console.log(message);
                    setMessage(message);
                });
            } else if (message.msgBody === "unAuthorized") {
                setMessage(message);
                console.log(message);
                authContext.setUser({ username: "" });
                authContext.setIsAuthenticated(false);
            } else {
                console.log(message);
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

    const onMacAddr = () => {};
    const getMacAddr = () => {};

    const onCoordinates = () => {};
    const getCoordinates = () => {};

    return (
        <section class="text-gray-700 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Add device
                    </h1>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
                >
                    <div>
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                            type="text"
                            name="username"
                            onChange={onChange}
                            placeholder="Enter Username"
                        />
                    </div>
                    <div>
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                            type="text"
                            name="username"
                            value={device.mac}
                            onChange={onMacAddr}
                            placeholder="Get mac address"
                        />
                        <button className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
                            Get mac address
                        </button>
                    </div>
                    <div>
                        <div>
                            <input
                                className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                                type="text"
                                name="username"
                                value={device.lat}
                                onChange={onCoordinates}
                                placeholder="91.000000"
                            />
                        </div>
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                            type="text"
                            name="username"
                            value={device.lat}
                            onChange={onCoordinates}
                            placeholder="26.000000"
                        />
                        <button className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
                            Get Coordinates
                        </button>
                    </div>
                    <button className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
                        ADD Device
                    </button>
                    {message ? <Message message={message} /> : null}
                </form>
            </div>
        </section>
    );
};

export default Device;
