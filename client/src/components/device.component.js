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
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [accuracy, setAccuracy] = useState(0);
    const authContext = useContext(AuthContext);

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(parseFloat(position.coords.latitude));

                setLongitude(parseFloat(position.coords.longitude));
                setAccuracy(parseFloat(position.coords.accuracy));
            });
        } else {
            alert("Browser does not support geolocation");
        }
    });

    useEffect(() => {
        DeviceService.getMac().then((data) => {
            setMac(data.access_token);
        });
    });

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            mapboxgl.accessToken =
                "pk.eyJ1IjoibXJpdHVuamF5c2FoYSIsImEiOiJja2I3eXY3N20wYWxsMzFwZ2F4cXY0MmJvIn0.pQKIGfiOkHXQMhyKkCyPHQ";
            const initializeMap = ({ setMap, mapContainer }) => {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                    center: [longitude, latitude],
                    zoom: 14,
                });

                map.on("load", () => {
                    setMap(map);
                    map.resize();
                });

                // current device
                new mapboxgl.Marker({ color: "#ff0000" })
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setText(
                            "Current Device"
                        )
                    )
                    .addTo(map);
            };
            if (!map) {
                initializeMap({ setMap, mapContainer });
            }
        }
    }, [map, latitude, longitude, accuracy]);

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

    function getDeviceID() {}

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

            <div className="px-5 add-device-padding-y flex">
                <form
                    onSubmit={onSubmit}
                    className="lg:w-1/3 md:w-1/2 bg-white bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
                >
                    <h2 className="text-gray-900 text-lg mb-1 pb-4 font-medium title-font">
                        Device Details
                    </h2>

                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Device Name"
                        type="text"
                        onChange={onDeviceName}
                    />
                    <div>
                        <input
                            className="bg-white w-1/2 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                            placeholder="Device ID"
                            type="text"
                            value={mac}
                            onChange={onMacAddr}
                        />
                        <button
                            className="w-1/2 bg-transparent mb-4 hover:bg-teal-500 text-teal-700 font-semibold focus:outline-none hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                            onClick={getDeviceID}
                        >
                            Device ID
                        </button>
                    </div>
                    <button className="bg-transparent mb-4 hover:bg-teal-500 text-teal-700 font-semibold focus:outline-none hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                        Get Coordinates
                    </button>

                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Latitude"
                        type="text"
                        value={latitude}
                        onChange={onCoordinates}
                    />

                    <input
                        className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
                        placeholder="Longitude"
                        type="text"
                        value={longitude}
                        onChange={onCoordinates}
                    />

                    <button className="text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-800 rounded text-lg">
                        Submit
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                        {message ? <Message message={message} /> : null}
                    </p>
                </form>
            </div>
        </>
    );
};

export default Device;
