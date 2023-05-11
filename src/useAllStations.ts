import { useState, useEffect } from "react";
import {LatLngTuple} from "leaflet";

export interface Station {
    idx: number;
    aqi: number;
    lat: number;
    lng: number;
}


export function useAllStations(waypoints: LatLngTuple[], radius: number) {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            const response = await fetch(
                "https://api.waqi.info/v2/map/bounds?latlng=53.254,15.972,57.670,20.635&networks=all&token=9249e672bc03b2494df5a83bb22f9c17cff4b4f9"
            );
            const data = await response.json();

            if (data.status === "ok") {
                const allStations = data.data.map((stationData: any) => ({
                    idx: stationData.uid,
                    aqi: parseInt(stationData.aqi, 10),
                    lat: stationData.lat,
                    lng: stationData.lon,
                }));

                setStations(allStations);
            }
        };

        fetchStations();
    }, [waypoints, radius]);

    return stations;
}

