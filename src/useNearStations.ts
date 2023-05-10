import {useState, useEffect} from "react";
import {LatLngTuple} from "leaflet";

interface Station {
    idx: number;
    aqi: number;
    lat: number;
    lng: number;
}

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    function toRad(value: number) {
        return (value * Math.PI) / 180;
    }

    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function fetchStationsForBounds(lat1: number, lon1: number, lat2: number, lon2: number, token: string) {
    const response = await fetch(
        `https://api.waqi.info/v2/map/bounds?latlng=${lat1},${lon1},${lat2},${lon2}&networks=all&token=${token}`
    );
    const data = await response.json();

    if (data.status === "ok") {
        return data.data.map((stationData: any) => ({
            idx: stationData.uid,
            aqi: parseInt(stationData.aqi, 10),
            lat: stationData.lat,
            lng: stationData.lon,
        }));
    }

    return [];
}

export function useNearStations(waypoints: LatLngTuple[], radius: number) {
    const [stations, setStations] = useState<Station[]>([]);
    const token = "9249e672bc03b2494df5a83bb22f9c17cff4b4f9";

    useEffect(() => {
        const fetchStations = async () => {
            const allStations: Station[] = [];

            for (const waypoint of waypoints) {
                const [lat, lng] = waypoint;
                const dLat = (radius / 111.32) * Math.sqrt(2);
                const dLng = (radius / 111.32) * Math.sqrt(2) / Math.cos((Math.PI / 180) * lat);

                const bounds = [lat - dLat, lng - dLng, lat + dLat, lng + dLng] as const;
                const stations = await fetchStationsForBounds(...(bounds as [number, number, number, number]), token);
                allStations.push(...stations);
            }

            setStations(
                allStations.filter(
                    (station, index, self) =>
                        self.findIndex((s) => s.idx === station.idx) === index &&
                        waypoints.some((waypoint) => haversineDistance(waypoint[0], waypoint[1], station.lat, station.lng) <= radius)
                )
            );
        };

        fetchStations();
    }, [waypoints, radius]);

    return stations;
}

