import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import DeviceService from "../services/DeviceService";
import "../styles/marker.css";
const styles = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute",
};

const MapboxGLMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    // details pf other devices
    const [deviceList, setDeviceList] = useState([]);

    // details of current device
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
                setLatitude(parseFloat(data.latitude));
                setLongitude(parseFloat(data.longitude));
                setAccuracy(parseFloat(data.accuracy));
            });
        }

        mapboxgl.accessToken =
            "pk.eyJ1IjoibXJpdHVuamF5c2FoYSIsImEiOiJja2I3eXY3N20wYWxsMzFwZ2F4cXY0MmJvIn0.pQKIGfiOkHXQMhyKkCyPHQ";
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [longitude, latitude],
                zoom: 14,
            });

            map.on("load", () => {
                setMap(map);
                map.resize();

                map.on("click", "places", function (e) {
                    new mapboxgl.Popup()
                        .setLngLat([longitude, latitude])
                        .setHTML("Device 1")
                        .addTo(map);
                });
            });

            // current device
            new mapboxgl.Marker({ color: "#ff0000" })
                .setLngLat([longitude, latitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setText("Current Device")
                )
                .addTo(map);

            // other devices
            deviceList.map((device) => {
                if (mac !== device.mac) {
                    new mapboxgl.Marker()
                        .setLngLat([device.longitude, device.latitude])
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }).setText(
                                device.name
                            )
                        )
                        .addTo(map);
                }
            });
        };
        if (!map) {
            initializeMap({ setMap, mapContainer });
        }
    }, [latitude, longitude, accuracy, deviceList]);

    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toString();
            const long = position.coords.longitude.toString();
            const acc = position.coords.accuracy.toString();
            if (lat !== latitude && long !== longitude && acc !== accuracy) {
                DeviceService.postUpdateCoordinates(mac, {
                    latitude: lat,
                    longitude: long,
                    accuracy: acc,
                });
            }
        });
    };

    if (navigator.geolocation) {
        setInterval(updateLocation(), 1000);
    }
    return (
        <div
            ref={(el) => (mapContainer.current = el)}
            className="mapContainer"
        />
    );
};

export default MapboxGLMap;
