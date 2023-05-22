import {useState, useEffect} from "react";
import {LatLngTuple} from "leaflet";

export interface Station {
    idx: number;
    aqi: number;
    lat: number;
    lng: number;
}

export function useNearStations(waypoints: LatLngTuple[]) {
    const [stations, setStations] = useState<Station[]>([]);

    const minLat = Math.min(...waypoints.map(point => point[0])) - 0.5;
    const maxLat = Math.max(...waypoints.map(point => point[0])) + 0.5;
    const minLng = Math.min(...waypoints.map(point => point[1])) - 0.5;
    const maxLng = Math.max(...waypoints.map(point => point[1])) + 0.5;

    useEffect(() => {
        const fetchStations = async () => {
            const url = `https://api.waqi.info/v2/map/bounds?latlng=${minLat},${minLng},${maxLat},${maxLng}&networks=all&token=9249e672bc03b2494df5a83bb22f9c17cff4b4f9`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "ok") {
                const stations = data.data.map((stationData: any) => ({
                    idx: stationData.uid,
                    aqi: parseInt(stationData.aqi, 10),
                    lat: stationData.lat,
                    lng: stationData.lon,
                }));

                setStations(stations);
            }
        };

        fetchStations();
    }, [maxLat, maxLng, minLat, minLng]);

    return stations;
}
