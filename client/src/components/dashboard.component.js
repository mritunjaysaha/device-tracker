import React, { useState, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import DeviceItem from "./deviceItem.component";
import GoogleApiWrapper from "./map.component";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [deviceList, setDeviceList] = useState([]);

    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {
            setDeviceList(data.devices);
        });
    });

    const getLog = () => {
        console.log(deviceList);
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

    if (navigator.geolocation) {
        const watchID = navigator.geolocation.watchPosition(function (
            position
        ) {
            console.log(position.coords);
        });
    }
    return (
        <div className="dashboard">
            <GoogleApiWrapper className="map" />
            <section className="text-gray-700 body-font relative">
                <h1>Dashboard</h1>
                <div className="container px-5 py-12 mx-auto flex">
                    <button onClick={getLog}>LOG</button>
                </div>
                <div>{list}</div>
            </section>
        </div>
    );
};

export default Dashboard;
