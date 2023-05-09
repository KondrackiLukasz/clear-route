import {MapContainer, TileLayer} from 'react-leaflet';
import {LatLngTuple, Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'fontawesome-free/css/all.min.css';
import {Routing} from "./Routing.tsx";

export interface MapComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
}

export function MapComponent({ from, to }: MapComponentProps) {
    const zoom = 13;

    // Fix the default icon URLs
    const defaultIcon = new Icon.Default();
    defaultIcon.options.iconUrl = "images/marker-icon.png";
    defaultIcon.options.shadowUrl = "images/marker-shadow.png";
    Icon.Default.prototype.options.iconUrl = defaultIcon.options.iconUrl;
    Icon.Default.prototype.options.shadowUrl = defaultIcon.options.shadowUrl;

    return (
        <MapContainer center={from} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing from={from} to={to} />
        </MapContainer>
    );
}
