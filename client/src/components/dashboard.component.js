import React, { useState, useEffect } from "react";
import DeviceService from "../services/DeviceService";
import DeviceItem from "./deviceItem.component";

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
                console.log("here ", data);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setAccuracy(data.accuracy);
            });
        }
    }, []);

    const getLog = () => {
        console.log(deviceList);
        console.log(latitude);
        console.log(longitude);
        console.log(accuracy);
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
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const acc = position.coords.accuracy;

            if (lat !== latitude || long !== longitude || acc !== accuracy) {
                console.log({ lat: lat, long: long, acc: acc });
                DeviceService.postUpdateCoordinates(mac, {
                    latitude: lat,
                    longitude: long,
                    accuracy: acc,
                });
            }
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
