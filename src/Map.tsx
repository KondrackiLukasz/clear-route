import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'fontawesome-free/css/all.min.css';

interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
}

function Routing({ from, to }: MapComponentProps) {
    const map = useMap();

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            showAlternatives: true,
            lineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 0.0,
                styles: [
                    { color: 'blue', opacity: 0.6, weight: 4 },
                    { color: 'blue', opacity: 0.6, weight: 4 },
                    { color: 'blue', opacity: 0.6, weight: 4 },
                ],
            },
            altLineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 0.0,
                styles: [
                    { color: 'blue', opacity: 0.3, weight: 4 },
                    { color: 'blue', opacity: 0.3, weight: 4 },
                    { color: 'blue', opacity: 0.3, weight: 4 },
                ],
            },
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to]);

    return null;
}
export function MapComponent({ from, to }: MapComponentProps) {
    const zoom = 13;

    return (
        <MapContainer center={from} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={from} />
            <Marker position={to} />
            <Routing from={from} to={to} />
        </MapContainer>
    );
}
