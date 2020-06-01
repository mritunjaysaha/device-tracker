import React, { useState, useEffect } from "react";

import DeviceService from "../services/DeviceService";
// import AuthService from "../services/AuthService";
import DeviceItem from "./deviceItem.component";
import { MapContainer } from "./map.component";
const Dashboard = () => {
    const [deviceList, setDeviceList] = useState([]);

    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {
            setDeviceList(data.devices);
            // console.log(data);
        });
    });

    const getLog = () => {
        console.log(deviceList);
        // deviceList.map((device) => {
        //     console.log(device.name);
        // });
        // for(let device in deviceList){

        // }
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
    return (
        // <section className="text-gray-700 body-font relative">
        //     <h1>Dashboard</h1>
        //     <div className="container px-5 py-12 mx-auto flex">
        //         <button onClick={getLog}>LOG</button>
        //     </div>
        //     <div>{list}</div>
        // </section>
        <MapContainer />
    );
};

export default Dashboard;
