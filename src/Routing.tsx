import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";
import {MapComponentProps} from "./Map.tsx";

export function Routing({from, to}: MapComponentProps) {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            showAlternatives: false,
            lineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 0.0,
                styles: [
                    {color: 'blue', opacity: 0.6, weight: 4},
                    {color: 'blue', opacity: 0.6, weight: 4},
                    {color: 'blue', opacity: 0.6, weight: 4},
                ],
            },
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to]);

    return null;
}
