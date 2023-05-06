import mapStyles from './map.module.css';
import { MapComponent } from './Map.tsx';

export function App() {
    const gdanskWrzeszczCoordinates: [number, number] = [54.3842, 18.5922];
    const gdyniaCoordinates: [number, number] = [54.5189, 18.5305];

    return (
        <div className={mapStyles.mapContainer}>
            <MapComponent from={gdanskWrzeszczCoordinates} to={gdyniaCoordinates} />
        </div>
    );
}
