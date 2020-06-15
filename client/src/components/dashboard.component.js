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

    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toString();
            const long = position.coords.longitude.toString();
            const acc = position.coords.accuracy.toString();
            if (lat !== latitude || long !== longitude || acc !== accuracy) {
                console.log({ lat: lat, long: long, acc: acc });
                DeviceService.postUpdateCoordinates(mac, {
                    latitude: lat,
                    longitude: long,
                    accuracy: acc,
                });
            } else {
                console.log("same");
            }
        });
    };

    if (navigator.geolocation) {
        setInterval(updateLocation(), 1000);
    }
    function deleteDevice(key) {
        console.log("_id: ", key);
        const filteredDeviceList = deviceList.filter(
            (device) => device._id !== key
        );
        DeviceService.deleteDevice(key).then((data) => console.log(data));
        setDeviceList(filteredDeviceList);
    }
    let list;
    if (deviceList.length > 0) {
        console.log("here ", deviceList);
        list = (
            <div className="device-container">
                {deviceList.map((device) => {
                    return (
                        <DeviceItem
                            key={device._id}
                            device={device}
                            deleteItem={deleteDevice}
                        />
                    );
                })}
            </div>
        );
    } else {
        list = <h1>Hello, World</h1>;
    }

    return (
        <>
            <div className="container">{list}</div>
        </>
    );
};

export default Dashboard;
