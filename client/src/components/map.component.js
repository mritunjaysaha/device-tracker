import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

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

    useEffect(() => {
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
            var marker = new mapboxgl.Marker()
                .setLngLat([91.7387746, 26.138125199999998])
                .addTo(map);
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
