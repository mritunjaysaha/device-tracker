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
    const [deviceList, setDeviceList] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    let mac = localStorage.getItem("key");
    let markerArr = [];
    const test = [
        {
            latitude: 26.158694399999998,
            longitude: 91.7635072,
            color: "#ff0000",
        },
        {
            latitude: 26.1400725,
            longitude: 91.7403456,
            color: "#0000ff",
        },
    ];

    useEffect(() => {
        DeviceService.getDeviceList().then((data) => {
            setDeviceList(data.devices);
        });
        if (mac !== null) {
            // console.log("mac: ", mac);
            DeviceService.getCoordinates(mac).then((data) => {
                // console.log("here ", data);
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
            });
            test.map((device) => {
                const marker = new mapboxgl.Marker({ color: device.color })
                    .setLngLat([device.longitude, device.latitude])
                    .addTo(map);
            });

            // console.log(deviceList);
            // deviceList.map((device) => {
            //     console.log("device ");
            //     const marker = new mapboxgl.Marker({ color: "#ff0000" })
            //         .setLngLat([longitude, latitude])
            //         .addTo(map);
            // });
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
                // console.log({ lat: lat, long: long, acc: acc });
                DeviceService.postUpdateCoordinates(mac, {
                    latitude: lat,
                    longitude: long,
                    accuracy: acc,
                });
            } else {
                // console.log("same");
            }
        });
    };

    if (navigator.geolocation) {
        setInterval(updateLocation(), 1000);
    }
    return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
