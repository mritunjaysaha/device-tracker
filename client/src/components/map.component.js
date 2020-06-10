import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import DeviceService from "../services/DeviceService";

// mapboxgl.accessToken =
//     "pk.eyJ1IjoibXJpdHVuamF5c2FoYSIsImEiOiJja2I3eXY3N20wYWxsMzFwZ2F4cXY0MmJvIn0.pQKIGfiOkHXQMhyKkCyPHQ";

const styles = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute",
};

const MapboxGLMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    // Get location coordinates
    // last values of the current device
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    let mac = localStorage.getItem("key");

    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {});
        if (mac !== null) {
            console.log("mac: ", mac);
            DeviceService.getCoordinates(mac).then((data) => {
                console.log("here ", data);
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
                center: [91.7387746, 26.138125199999998],
                zoom: 14,
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
        };

        if (!map) {
            initializeMap({ setMap, mapContainer });
        }
    });

    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toString();
            const long = position.coords.longitude.toString();
            const acc = position.coords.accuracy.toString();
            if (lat !== latitude && long !== longitude && acc !== accuracy) {
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
    return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
