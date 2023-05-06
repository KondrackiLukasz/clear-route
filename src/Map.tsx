import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
}

export function MapComponent({ from, to }: MapComponentProps) {
    const zoom = 13;
    const route: LatLngExpression[] = [from, to];

    return (
        <MapContainer center={from} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={route} pathOptions={{ color: 'blue' }} />
            {route.map((point, index) => (
                <Marker position={point} key={index} />
            ))}
        </MapContainer>
    );
}
