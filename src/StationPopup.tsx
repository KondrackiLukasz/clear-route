import {StationDetails} from "./backend/useStationData.ts";
import {Station} from "./backend/useNearStations.ts";

export function StationPopup({stationData, station, selectedDate}: { stationData?: StationDetails, station: Station, selectedDate: Date }) {
    const today = new Date();
    const isToday = selectedDate.getUTCFullYear() === today.getUTCFullYear() &&
        selectedDate.getUTCMonth() === today.getUTCMonth() &&
        selectedDate.getUTCDate() === today.getUTCDate();

    const forecastForSelectedDayO3 = !isToday && stationData?.forecast?.daily?.o3.find(forecast => new Date(forecast.day).getUTCDate() === selectedDate.getUTCDate());
    const forecastForSelectedDayPM10 = !isToday && stationData?.forecast?.daily?.pm10.find(forecast => new Date(forecast.day).getUTCDate() === selectedDate.getUTCDate());
    const forecastForSelectedDayPM25 = !isToday && stationData?.forecast?.daily?.pm25.find(forecast => new Date(forecast.day).getUTCDate() === selectedDate.getUTCDate());

    return (
        <div>
            <h4>Station ID: {station.idx}</h4>
            <table>
                <tbody>
                {isToday && <tr>
                    <td>CO:</td>
                    <td>{stationData?.iaqi.co?.v || "?"} µg/m³</td>
                </tr>}
                {isToday && <tr>
                    <td>NO2:</td>
                    <td>{stationData?.iaqi.no2?.v || "?"} µg/m³</td>
                </tr>}
                <tr>
                    <td>O3:</td>
                    <td>{isToday ? (stationData?.iaqi.o3?.v || "?") : (forecastForSelectedDayO3 && forecastForSelectedDayO3.avg || "?")} µg/m³</td>
                </tr>
                <tr>
                    <td>PM10:</td>
                    <td>{isToday ? (stationData?.iaqi.pm10?.v || "?") : (forecastForSelectedDayPM10 && forecastForSelectedDayPM10.avg || "?")} µg/m³</td>
                </tr>
                <tr>
                    <td>PM2.5:</td>
                    <td>{isToday ? (stationData?.iaqi.pm25?.v || "?") : (forecastForSelectedDayPM25 && forecastForSelectedDayPM25.avg || "?")} µg/m³</td>
                </tr>
                {isToday && <tr>
                    <td>SO2:</td>
                    <td>{stationData?.iaqi.so2?.v || "?"} µg/m³</td>
                </tr>}
                </tbody>
            </table>
        </div>);
}
