import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L, {LatLngTuple} from "leaflet";

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setWaypoints: (waypoints: LatLngTuple[]) => void;
}
export function Routing({from, to, setWaypoints}: MapComponentProps) {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            showAlternatives: false,
            fitSelectedRoutes: false,
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

        const waypoints = routingControl.getPlan().getWaypoints();

        setWaypoints(waypoints.map(w => [w.latLng.lat, w.latLng.lng]));

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to, setWaypoints]);

    return null;
}
