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

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
}

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

    console.log(stations)
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
                <Marker key={station.idx} position={[station.lat, station.lng]}>
                    <Popup>
                        Station ID: {station.idx} <br/>
                        AQI: {station.aqi}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
