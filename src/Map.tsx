import {MapContainer, TileLayer, Polyline, Marker} from 'react-leaflet';
import {LatLng, LatLngExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function MapComponent() {
    const position: LatLngExpression = new LatLng(51.505, -0.09);
    const zoom = 13;
    const route: LatLngExpression[] = [
        new LatLng(51.505, -0.09),
        new LatLng(51.51, -0.1),
        new LatLng(51.51, -0.12),
    ];

    return (
        <MapContainer center={position} zoom={zoom} style={{height: '100%', width: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={route} pathOptions={{color: 'blue'}}/>
            {route.map((point, index) => (
                <Marker position={point} key={index}/>
            ))}
        </MapContainer>
    );
}
