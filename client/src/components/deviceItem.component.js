import React from "react";
import "../styles/dashboard.css";

function DeviceItem(props) {
    return (
        <div className="device-card" key={props.device._id}>
            <div className="device-card-details">
                <h3>Name: {props.device.name}</h3>
                <p>latitude: {props.device.latitude}</p>
                <p>longitude: {props.device.longitude}</p>
                <p>accuracy: {props.device.accuracy}</p>
            </div>
            <button onClick={() => props.deleteItem(props.device._id)}>
                <i className="uil uil-trash"></i>
            </button>
        </div>
    );
}
export default DeviceItem;
