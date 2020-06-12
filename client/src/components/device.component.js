import React, { useState, useContext, useEffect, useRef } from "react";
import DeviceService from "../services/DeviceService";
import { AuthContext } from "../context/AuthContext";
import Message from "./message.component";
import mapboxgl from "mapbox-gl";
import "../styles/marker.css";

const Device = () => {
    const [device, setDevice] = useState({});
    const [message, setMessage] = useState(null);
    const [mac, setMac] = useState("");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [accuracy, setAccuracy] = useState(0);
    const authContext = useContext(AuthContext);

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        DeviceService.getMac().then((data) => {
            setMac(data.access_token);
        });
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
    }, [latitude, longitude, accuracy]);

    useEffect(() => {
        // if (latitude && longitude) {
        //     console.log("Empty");
        //     return;
        // }
        mapboxgl.accessToken =
            "pk.eyJ1IjoibXJpdHVuamF5c2FoYSIsImEiOiJja2I3eXY3N20wYWxsMzFwZ2F4cXY0MmJvIn0.pQKIGfiOkHXQMhyKkCyPHQ";
        const initializeMap = ({ setMap, mapContainer }) => {
            console.log("latitude: ", typeof latitude);
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [91.7387521, 26.1381886],
                zoom: 14,
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });

            // current device
            new mapboxgl.Marker({ color: "#ff0000" })
                .setLngLat([91.7387521, 26.1381886])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setText("Current Device")
                )
                .addTo(map);
        };
        if (!map) {
            initializeMap({ setMap, mapContainer });
        }
    }, [map]);
    const onSubmit = (e) => {
        e.preventDefault();
        device.mac = mac;
        device.latitude = latitude;
        device.longitude = longitude;
        device.accuracy = accuracy;

        localStorage.setItem("key", mac);

        DeviceService.postDevice(device).then((data) => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
                DeviceService.getDeviceList().then((getData) => {
                    setDevice(getData.device);
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

    const onDeviceName = (e) => {
        setDevice({ name: e.target.value });
    };

    const resetForm = () => {
        setDevice({ name: "" });
    };

    const onMacAddr = (e) => {
        setMac({ mac: e.target.value });
    };
    const onCoordinates = (e) => {
        setLatitude({ lat: e.target.value });
        setLongitude({ lng: e.target.value });
    };

    return (
        <>
            <div
                ref={(el) => (mapContainer.current = el)}
                className="mapContainer"
            ></div>
            <section className="text-gray-700 body-font relative bg-transparent ">
                <div className="container px-5 add-device-padding-y mx-auto flex">
                    <form
                        onSubmit={onSubmit}
                        className="lg:w-1/3 md:w-1/2 bg-white bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
                    >
                        <h2 className="text-gray-900 text-lg mb-1 pb-4 font-medium title-font">
                            Device Details
                        </h2>

                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                            placeholder="Device Name"
                            type="text"
                            onChange={onDeviceName}
                        />
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                            placeholder="Device ID"
                            type="text"
                            value={mac}
                            onChange={onMacAddr}
                        />
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                            placeholder="Latitude"
                            type="text"
                            value={latitude}
                            onChange={onCoordinates}
                        />
                        <input
                            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
                            placeholder="Longitude"
                            type="text"
                            value={longitude}
                            onChange={onCoordinates}
                        />

                        <button className="text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-800 rounded text-lg">
                            Submit
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                            {message ? (
                                <Message message={message} />
                            ) : (
                                <h1>Hello, World!</h1>
                            )}
                        </p>
                    </form>
                </div>
            </section>
        </>
        // <section className="text-gray-700 body-font">
        //     <div class="container px-5 py-24 max-w-full">
        // <form
        //     onSubmit={onSubmit}
        //     className="bg-gray-200 rounded-lg p-8 flex flex-col w-1/2"
        // >
        //     <input
        //         className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
        //         type="text"
        //         name="username"
        //         onChange={onChange}
        //         placeholder="Enter Username"
        //     />
        //     <p className="pb-2">Device Id</p>
        //     <input
        //         className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
        //         type="text"
        //         name="username"
        //         value={mac}
        //         onChange={onMacAddr}
        //         placeholder="Get mac address"
        //     />
        //     <p className="pb-2">Latitude</p>

        //     <input
        //         className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
        //         type="text"
        //         name="username"
        //         value={latitude}
        //         onChange={onCoordinates}
        //         placeholder="Latitude"
        //     />
        //     <p className="pb-2">Longitude</p>
        //     <input
        //         className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
        //         type="text"
        //         name="username"
        //         value={longitude}
        //         onChange={onCoordinates}
        //         placeholder="Longitude"
        //     />
        //     <button className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">
        //         ADD Device
        //     </button>
        //     {message ? <Message message={message} /> : null}
        // </form>
        // </div>
        // </section>
    );
};

export default Device;
