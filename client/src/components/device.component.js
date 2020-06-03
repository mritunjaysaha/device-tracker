import React, { useState, useContext, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import { AuthContext } from "../context/AuthContext";
import Message from "./message.component";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
const Device = () => {
    const [device, setDevice] = useState({});
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState(null);
    const [mac, setMac] = useState("");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [accuracy, setAccuracy] = useState(0);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        DeviceService.getDevices().then((data) => {
            setDevice(data.devices);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        device.mac = mac;
        device.latitude = latitude;
        device.longitude = longitude;
        device.accuracy = accuracy;

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

    const onMacAddr = (e) => {
        setMac({ mac: e.target.value });
    };
    const getMacAddr = (e) => {
        e.preventDefault();
        DeviceService.getMac().then((data) => {
            console.log(data);
            setMac(data.access_token);
        });
    };
    const onCoordinates = (e) => {
        setLatitude({ lat: e.target.value });
        setLongitude({ lng: e.target.value });
    };
    const getCoordinates = (e) => {
        e.preventDefault();

        // Checking whether the browser supports geolocation
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("latitude: " + position.coords.latitude);
                console.log("longitude: " + position.coords.longitude);
                console.log("accuracy: " + position.coords.accuracy);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setAccuracy(position.coords.accuracy);
            });
        } else {
            alert("Browser does not support geolocation");
        }

        // const bounds = new window.google.maps.LatLngBounds();
        // console.log(bounds);
    };

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
                            value={mac}
                            onChange={onMacAddr}
                            placeholder="Get mac address"
                        />
                        <button
                            onClick={getMacAddr}
                            className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                        >
                            Get mac address
                        </button>
                    </div>
                    <div>
                        <div>
                            <input
                                className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                                type="text"
                                name="username"
                                value={latitude}
                                onChange={onCoordinates}
                                placeholder="Latitude"
                            />
                        </div>
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                            type="text"
                            name="username"
                            value={longitude}
                            onChange={onCoordinates}
                            placeholder="Longitude"
                        />
                        <button
                            onClick={getCoordinates}
                            className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                        >
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
