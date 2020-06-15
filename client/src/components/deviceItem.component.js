import React from "react";

function DeviceItem(props) {
    return (
        // <div className="device-card" key={props.device._id}>
        //     <div className="device-card-details">
        //         <h3>Name: {props.device.name}</h3>
        //         <p>latitude: {props.device.latitude}</p>
        //         <p>longitude: {props.device.longitude}</p>
        //         <p>accuracy: {props.device.accuracy}</p>
        //     </div>
        //     <button onClick={() => props.deleteItem(props.device._id)}>
        //         <i className="uil uil-trash"></i>
        //     </button>
        // </div>
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                        {props.device.name}
                    </h2>
                    <p className="text-gray-500">
                        Latitude: {props.device.latitude}
                    </p>
                    <p className="text-gray-500">
                        Longitude: {props.device.longitude}
                    </p>
                    <p className="text-gray-500">
                        Accuracy: {props.device.accuracy}
                    </p>
                    <hr />

                    <button
                        className="text-center w-full pt-2"
                        onClick={() => props.deleteItem(props.device._id)}
                    >
                        <i className="uil uil-trash text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DeviceItem;
