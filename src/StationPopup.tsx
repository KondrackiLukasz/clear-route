import {StationDetails} from "./backend/useStationData.ts";
import {Station} from "./backend/useNearStations.ts";

export function StationPopup({stationData, station}: { stationData?: StationDetails, station: Station }) {
    return (
        <div>
            <h4>Station ID: {station.idx}</h4>
            <table>
                <tbody>
                <tr>
                    <td>CO:</td>
                    <td>{stationData?.iaqi.co?.v || "?"} µg/m³</td>
                </tr>
                <tr>
                    <td>NO2:</td>
                    <td>{stationData?.iaqi.no2?.v || "?"} µg/m³</td>
                </tr>
                <tr>
                    <td>O3:</td>
                    <td>{stationData?.iaqi.o3?.v || "?"} µg/m³</td>
                </tr>
                <tr>
                    <td>PM10:</td>
                    <td>{stationData?.iaqi.pm10?.v || "?"} µg/m³</td>
                </tr>
                <tr>
                    <td>PM2.5:</td>
                    <td>{stationData?.iaqi.pm25?.v || "?"} µg/m³</td>
                </tr>
                <tr>
                    <td>SO2:</td>
                    <td>{stationData?.iaqi.so2?.v || "?"} µg/m³</td>
                </tr>
                </tbody>
            </table>
        </div>);
}
