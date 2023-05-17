import mapStyles from './map.module.css';
// import {JustMap} from "./JustMap.tsx";
import ResponsiveInterface from "./ResponsiveInterface.tsx";

export function App() {
    return (
        <div className={mapStyles.mapContainer}>
            <ResponsiveInterface></ResponsiveInterface>
            {/*<JustMap/>*/}
        </div>
    );
}
