import React from "react";

function DeviceItem(props) {
    return (
        <div>
            <h3>{props.device.name}</h3>
            {/* <p>mac: {props.device.mac}</p>
            <p>latitude: {props.device.latitude}</p>
            <p>longitude: {props.device.longitude}</p> */}
            <br />
            <br />
        </div>
    );
}
export default DeviceItem;
