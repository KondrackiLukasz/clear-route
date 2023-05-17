import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L, {LatLngTuple} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "fontawesome-free/css/all.min.css";
import {Routing} from "./Routing";
import {useState} from "react";
import {Station} from "./backend/useAllStations.ts";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers';
import {StationDetails} from "./backend/useStationData.ts";
import {StationPopup} from "./StationPopup.tsx";

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setFrom: (from: LatLngTuple) => void;
    setTo: (to: LatLngTuple) => void;
    stations: Station[];
    stationsData: StationDetails[];
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

export function MapComponent({from, to, setFrom, setTo, stations, stationsData}: MapComponentProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setRouteCoordinates] = useState<LatLngTuple[]>([]);


    return (
        <MapContainer
            center={from}
            zoom={13}
            // style={{height: "100%", width: "100%"}}
            style={{height: "100%", width: "100%"}}
        >
            <TileLayer
                keepBuffer={10}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing from={from} to={to} setRouteCoordinates={setRouteCoordinates} setFrom={setFrom} setTo={setTo}/>
            {stations.map((station) => (
                <Marker key={station.idx} position={[station.lat, station.lng]} icon={stationIcon}>
                    <Popup>
                        <StationPopup station={station} stationData={stationsData.find(sD => sD.idx === station.idx)}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
