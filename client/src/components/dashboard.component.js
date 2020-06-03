import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeviceService from "../services/DeviceService";
import DeviceItem from "./deviceItem.component";
import GoogleApiWrapper from "./map.component";
import "../styles/dashboard.css";
const DeviceListDiv = styled.div``;

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
        <div className="dashboard">
            <GoogleApiWrapper className="map" />
            <DeviceListDiv className="devicelist">
                <section className="text-gray-700 body-font relative">
                    <h1>Dashboard</h1>
                    <div className="container px-5 py-12 mx-auto flex">
                        <button onClick={getLog}>LOG</button>
                    </div>
                    <div>{list}</div>
                </section>
            </DeviceListDiv>
        </div>
    );
};

export default Dashboard;
