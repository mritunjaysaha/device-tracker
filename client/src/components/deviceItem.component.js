import React from "react";
import "../styles/dashboard.css";

function DeviceItem(props) {
    return (
        <div className="device-card">
            <h3>Name: {props.device.name}</h3>
            <p>latitude: {props.device.latitude}</p>
            <p>longitude: {props.device.longitude}</p>
            <p>accuracy: {props.device.accuracy}</p>
        </div>
    );
}
export default DeviceItem;
