import mapStyles from './map.module.css';
import {JustMap} from "./JustMap.tsx";

export function App() {
    return (
        <div className={mapStyles.mapContainer}>
            {/*<ResponsiveInterface></ResponsiveInterface>*/}
            <JustMap/>
        </div>
    );
}
