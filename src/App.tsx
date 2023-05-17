import mapStyles from './map.module.css';
import ResponsiveInterface from './ResponsiveInterface';

export function App() {
    return (
        <div className={mapStyles.mapContainer}>
            <ResponsiveInterface></ResponsiveInterface>
        </div>
    );
}
