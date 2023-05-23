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
import {AirQualityData} from "./backend/interpolateData.ts";

export const MOBILE_VH_375_HIDDEN = "75";
export const MOBILE_VH_375_VISIBLE = "65";
export const MOBILE_VH_600_HIDDEN = "78";
export const MOBILE_VH_600_VISIBLE = "65";
export const PC_VH_HIDDEN = "82.5";
export const PC_VH_VISIBLE = "65";
export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setFrom: (from: LatLngTuple) => void;
    setTo: (to: LatLngTuple) => void;
    stations: Station[];
    stationsData: StationDetails[];
    toolbarVisible: boolean;
    selectedDate: Date;
    interpolatedData: AirQualityData;
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

function SetHeightOnChange({height}: any) {
    const map = useMap();

    const mapContainer = map.getContainer();
    mapContainer.style.cssText = `height: ${height}vh; position: relative;`;

    return null;
}

function calculateHeight(visible: boolean) {
    if (window.innerWidth <= 375) {
        return visible ? MOBILE_VH_375_VISIBLE : MOBILE_VH_375_HIDDEN;
    } else if (window.innerWidth <= 600) {
        return visible ? MOBILE_VH_600_VISIBLE : MOBILE_VH_600_HIDDEN;
    } else {
        return visible ? PC_VH_VISIBLE : PC_VH_HIDDEN;
    }
}


function reduceRouteCoordinates(routeCoordinates: LatLngTuple[]) {
    const newCoordinates: LatLngTuple[] = [];
    if (routeCoordinates.length > 10) {
        const step = Math.floor(routeCoordinates.length / 10);

        for (let i = 0; i < routeCoordinates.length; i += step) {
            newCoordinates.push(routeCoordinates[i]);
        }

        newCoordinates.length = 10; // ensure that newCoordinates only contains 10 elements
    }
    return newCoordinates;
}

export function MapComponent({
                                 from,
                                 to,
                                 setFrom,
                                 setTo,
                                 stations,
                                 stationsData,
                                 toolbarVisible,
                                 interpolatedData,
                                 selectedDate
                             }: MapComponentProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[]>([]);
    const adjustedHeight = calculateHeight(toolbarVisible);

    return (
        <div>
            <MapContainer
                center={from}
                zoom={13}
                style={{height: {adjustedHeight} + "vh", width: '100%'}}
            >
                <TileLayer
                    keepBuffer={10}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Routing from={from} to={to}
                         setRouteCoordinates={(cords: LatLngTuple[]) => setRouteCoordinates(reduceRouteCoordinates(cords))}
                         setFrom={setFrom} setTo={setTo} interpolatedData={interpolatedData}/>
                {stations.map((station) => (
                    <Marker key={station.idx} position={[station.lat, station.lng]} icon={stationIcon}>
                        <Popup>
                            <StationPopup station={station}
                                          stationData={stationsData.find(sD => sD.idx === station.idx)}
                                          selectedDate={selectedDate}/>
                        </Popup>
                    </Marker>
                ))}
                <SetHeightOnChange height={adjustedHeight}/>
            </MapContainer>

        </div>
    );
}
