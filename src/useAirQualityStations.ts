import { useState, useEffect } from "react";

interface AirQualityStation {
    idx: number;
    aqi: number;
    lat: number;
    lng: number;
}

export function useAirQualityStations(lat1: number, lng1: number, lat2: number, lng2: number) {
    const [stations, setStations] = useState<AirQualityStation[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            const response = await fetch(
                `https://api.waqi.info/v2/map/bounds?latlng=${lat1},${lng1},${lat2},${lng2}&networks=all&token=demo`
            );
            const data = await response.json();

            if (data.status === "ok") {
                setStations(
                    data.data.map((station: any) => ({
                        idx: station.idx,
                        aqi: station.aqi,
                        lat: station.lat,
                        lng: station.lng,
                    }))
                );
            }
        };

        fetchStations();
    }, [lat1, lng1, lat2, lng2]);

    return stations;
}
