import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={{ width: "50%", height: "100%" }}
                initialCenter={{ lat: -1.2884, lng: 36.2222 }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBhZFiKXHP-E18TJltaLeTFhX3lyesvKI8",
})(MapContainer);
