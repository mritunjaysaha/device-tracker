import React from "react";
import ReactDom from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1IjoibXJpdHVuamF5c2FoYSIsImEiOiJja2I3eXY3N20wYWxsMzFwZ2F4cXY0MmJvIn0.pQKIGfiOkHXQMhyKkCyPHQ";

export default class MapBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 26.138125199999998,
            lng: 91.7387746,
            zoom: 14,
        };
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });
        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });
    }

    render() {
        return (
            <div
                ref={(el) => (this.mapContainer = el)}
                className="mapContainer"
            ></div>
        );
    }
}
