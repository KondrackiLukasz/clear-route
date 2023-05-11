import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "fontawesome-free/css/all.min.css";
import {Routing} from "./Routing";
import {useState} from "react";
import {Station, useAllStations} from "./useAllStations.ts";
import {haversineDistance} from "./useNearStations.ts";
// import {useAllStations} from "./useAllStations.ts";
// import { Icon } from "leaflet";
import L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
}

const stationIcon = L.AwesomeMarkers.icon({
    icon: 'smog', // replace 'coffee' with the name of the icon you want to use
    markerColor: 'red', // replace 'red' with the color you want
    prefix: 'fa', // prefix for the icon, 'fa' for font-awesome
});

const DefaultIcon = L.AwesomeMarkers.icon({
    icon: 'circle', // replace 'coffee' with the name of the icon you want to use
    markerColor: 'blue', // replace 'red' with the color you want
    prefix: 'fa', // prefix for the icon, 'fa' for font-awesome
});

L.Marker.prototype.options.icon = DefaultIcon;

export function MapComponent({from, to}: MapComponentProps) {
    const [waypoints, setWaypoints] = useState([from, to]);
    const zoom = 13;

    const radius = 1000;
    const stations: Station[] = useAllStations(waypoints, radius);

    const filteredStations = stations.filter((station) =>
        waypoints.some((waypoint) =>
            haversineDistance(waypoint[0], waypoint[1], station.lat, station.lng) <= radius
        )
    );

    // const stations = useNearStations(waypoints, radius);

    return (
        <MapContainer
            center={from}
            zoom={zoom}
            style={{height: "2000%", width: "100%"}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing from={from} to={to} setWaypoints={setWaypoints}/>
            {filteredStations.map((station) => (
                <Marker key={station.idx} position={[station.lat, station.lng]} icon={stationIcon}>
                    <Popup>
                        Station ID: {station.idx} <br/>
                        AQI: {station.aqi}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
