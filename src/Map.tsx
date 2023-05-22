import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
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
    toolbarVisible: boolean;
    selectedDate: Date;
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

function SetHeightOnChange({ height }:any) {
    const map = useMap();

    const mapContainer = map.getContainer();
    mapContainer.style.cssText = `height: ${height}vh; position: relative;`;

    return null;
  }

function calculateHeight(visible:boolean){
    if (window.innerWidth <= 375) {
        return visible ? '60' : '85';
      }
    else if (window.innerWidth <= 600) {
        return visible ? '50' : '85';
      }
    else {
        return visible ? '75' : '86.5';
    }
}

export function MapComponent({from, to, setFrom, setTo, stations, stationsData, toolbarVisible, selectedDate}: MapComponentProps) {
    const [_, setRouteCoordinates] = useState<LatLngTuple[]>([]);
    const adjustedHeight = calculateHeight(toolbarVisible);

    return (
        <div>
        <MapContainer
            center={from}
            zoom={13}
            style={{ height: {adjustedHeight} +"vh" ,width: '100%' }}
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
            <SetHeightOnChange height={adjustedHeight} />
        </MapContainer>

        </div>
    );
}
