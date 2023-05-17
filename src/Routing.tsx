import {useMap} from "react-leaflet";
import {useEffect, useRef} from "react";
import L, {LatLngTuple} from "leaflet";

export interface RoutingComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setPlan: (Plan: L.Routing.Plan) => void;
    setFrom: (from: LatLngTuple) => void;
    setTo: (to: LatLngTuple) => void;
}

export function Routing({
                            from,
                            to,
                            setPlan,
                            setFrom,
                            setTo,
                        }: RoutingComponentProps) {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            showAlternatives: false,
            fitSelectedRoutes: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            createMarker: function (i, start) {
                const marker = L.marker(start.latLng, {
                    draggable: true,
                });
                marker.on('dragend', function () {
                    // THIS NEEDS TO BE SWAPPED FOR SOME REASON
                    const newLatLng = [marker.getLatLng().lng, marker.getLatLng().lat] as LatLngTuple;
                    if (i === 0) {
                        console.log(i)
                        console.log(marker.getLatLng())
                        setFrom(newLatLng);
                    } else {
                        console.log(i)
                        console.log(marker.getLatLng())
                        setTo(newLatLng);
                    }
                    const newWaypoint = L.Routing.waypoint(L.latLng(newLatLng[0], newLatLng[1]));
                    routingControl.spliceWaypoints(i, 1, newWaypoint);
                    routingControl.route();
                });
                return marker;
            },
            lineOptions: {
                extendToWaypoints: true,
                addWaypoints: false,
                missingRouteTolerance: 0.0,
                styles: [
                    {color: 'blue', opacity: 0.6, weight: 4},
                ],
            },
        }).addTo(map);

        setPlan(routingControl.getPlan());

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to]);
    return null;
}
