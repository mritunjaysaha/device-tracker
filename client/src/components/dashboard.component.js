import React, { useState, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import DeviceItem from "./deviceItem.component";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [deviceList, setDeviceList] = useState([]);
    // last values of the current device
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    let mac = localStorage.getItem("key");
    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {
            setDeviceList(data.devices);
        });
        if (mac !== null) {
            DeviceService.getCoordinates(mac).then((data) => {
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setAccuracy(data.accuracy);
            });
        }
    }, []);

    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toString();
            const long = position.coords.longitude.toString();
            const acc = position.coords.accuracy.toString();
            if (lat !== latitude || long !== longitude || acc !== accuracy) {
                DeviceService.postUpdateCoordinates(mac, {
                    latitude: lat,
                    longitude: long,
                    accuracy: acc,
                });
            }
        });
    };

    if (navigator.geolocation) {
        setInterval(updateLocation(), 1000);
    }
    function deleteDevice(key) {
        const filteredDeviceList = deviceList.filter(
            (device) => device._id !== key
        );
        DeviceService.deleteDevice(key);
        setDeviceList(filteredDeviceList);
    }
    let list;
    if (deviceList.length > 0) {
        list = (
            <>
                {deviceList.map((device) => {
                    return (
                        <DeviceItem
                            key={device._id}
                            device={device}
                            deleteItem={deleteDevice}
                        />
                    );
                })}
            </>
        );
    } else {
        list = (
            <div className="w-full text-center bg-gray-300 p-8 rounded">
                <h1>No devices. Add a device</h1>
                <button className="text-white bg-teal-500 border-0 m-1 py-1 px-6 focus:outline-none hover:bg-teal-800 rounded text-lg">
                    <Link to="/devices">Add Device</Link>
                </button>
            </div>
        );
    }

    return (
        <>
            {/* <div className="container">{list}</div> */}
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb- text-gray-900">
                            Devices
                        </h1>
                    </div>
                    <div className="flex flex-wrap -m-2">{list}</div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
