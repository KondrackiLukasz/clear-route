import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// import {useAllStations} from "./useAllStations.ts";
// import { Icon } from "leaflet";
import L, {LatLngTuple} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "fontawesome-free/css/all.min.css";
import {Routing} from "./Routing";
import {Component, useMemo, useState} from "react";
import {Station} from "./backend/useAllStations.ts";
import {useNearStations} from "./backend/useNearStations.ts";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setFrom: (from: LatLngTuple) => void;
    setTo: (to: LatLngTuple) => void;
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

class MockedPopup extends Component<{ station: Station }> {
    render() {
        return <div>
            <h4>Station ID: {this.props.station.idx}</h4>
            <table>
                <tbody>
                <tr>
                    <td>CO:</td>
                    <td>6.7 µg/m³</td>
                </tr>
                <tr>
                    <td>NO2:</td>
                    <td>28.8 µg/m³</td>
                </tr>
                <tr>
                    <td>O3:</td>
                    <td>24.4 µg/m³</td>
                </tr>
                <tr>
                    <td>PM10:</td>
                    <td>57 µg/m³</td>
                </tr>
                <tr>
                    <td>PM2.5:</td>
                    <td>134 µg/m³</td>
                </tr>
                <tr>
                    <td>SO2:</td>
                    <td>3.6 µg/m³</td>
                </tr>
                </tbody>
            </table>
        </div>;
    }
}

export function MapComponent({from, to, setFrom, setTo}: MapComponentProps) {
    const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[]>([]);
    const zoom = 13;


    // Just for annoying linter
    routeCoordinates.slice(2,2);


    const waypoints = useMemo(() => [from, to], [from, to]);
    const stations: Station[] = useNearStations(waypoints);
    return (
        <MapContainer
            center={from}
            zoom={zoom}
            // style={{height: "100%", width: "100%"}}
            style={{height: "100%", width: "100%"}}
        >
            <TileLayer
                keepBuffer={10}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing from={from} to={to} setRouteCoordinates={setRouteCoordinates} setFrom={setFrom} setTo={setTo} />
            {stations.map((station) => (
                <Marker key={station.idx} position={[station.lat, station.lng]} icon={stationIcon}>
                    <Popup>
                        <MockedPopup station={station}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
