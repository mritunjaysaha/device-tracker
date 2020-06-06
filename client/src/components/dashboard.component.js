import React, { useState, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import DeviceItem from "./deviceItem.component";

const Dashboard = () => {
    const [deviceList, setDeviceList] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {
            setDeviceList(data.devices);
            setLatitude(data.devices.latitude);
            setLongitude(data.devices.longitude);
        });
    });

    const getLog = () => {
        console.log(deviceList);
        console.log(latitude);
        console.log(longitude);
    };

    let list;
    if (deviceList.length > 0) {
        list = (
            <div>
                {deviceList.map((device) => {
                    return <DeviceItem key={device._id} device={device} />;
                })}
            </div>
        );
    } else {
        list = <h1>Hello, World</h1>;
    }

    // watch the position of the device. If the position changes then update the location
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            console.log(position.coords);
        });
    }
    return (
        <div>
            <section className="text-gray-700 body-font relative">
                <h1 className="dashboard__header">Dashboard</h1>
                <div className="container px-5 py-12 mx-auto flex">
                    <button onClick={getLog}>LOG</button>
                </div>
                {list}
            </section>
        </div>
    );
};

export default Dashboard;
