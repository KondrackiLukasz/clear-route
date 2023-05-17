import {useState, useEffect} from "react";
import {LatLngTuple} from "leaflet";

export interface Station {
    idx: number;
    aqi: number;
    lat: number;
    lng: number;
}

export function useNearStations(waypoints: LatLngTuple[], radius: number) {
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            // calculate min and max lat/lng for our waypoints
            const minLat = Math.min(...waypoints.map(point => point[0])) - 1;
            const maxLat = Math.max(...waypoints.map(point => point[0])) + 1;
            const minLng = Math.min(...waypoints.map(point => point[1])) - 1;
            const maxLng = Math.max(...waypoints.map(point => point[1])) + 1;

            // construct the fetch URL
            const url = `https://api.waqi.info/v2/map/bounds?latlng=${minLat},${minLng},${maxLat},${maxLng}&networks=all&token=9249e672bc03b2494df5a83bb22f9c17cff4b4f9`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "ok") {
                const allStations = data.data.map((stationData: any) => ({
                    idx: stationData.uid,
                    aqi: parseInt(stationData.aqi, 10),
                    lat: stationData.lat,
                    lng: stationData.lon,
                }));

                // Function to calculate distance between two coordinates
                // const calculateDistance = (coord1: LatLngTuple, coord2: LatLngTuple) => {
                //     const R = 6371; // Radius of the earth in km
                //     const dLat = (coord2[0]-coord1[0]) * Math.PI / 180;
                //     const dLon = (coord2[1]-coord1[1]) * Math.PI / 180;
                //     const a =
                //         Math.sin(dLat/2) * Math.sin(dLat/2) +
                //         Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
                //         Math.sin(dLon/2) * Math.sin(dLon/2);
                //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                //     const d = R * c; // Distance in km
                //
                //     return d;
                // };

                // Filter stations based on distance
                // const nearStations = allStations.filter(station => {
                //     return waypoints.some(waypoint => calculateDistance([station.lat, station.lng], waypoint) <= radius);
                // });

                setStations(allStations);
            }
        };

        fetchStations();
    }, [waypoints, radius]);

    return stations;
}
