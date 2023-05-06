import mapStyles from './map.module.css';
import {MapComponent} from "./Map.tsx";

export function App() {
    return (
        <div className={mapStyles.mapContainer}>
            <MapComponent />
        </div>
    );
}
