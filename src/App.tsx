import mapStyles from './map.module.css';
import { MapComponent } from './Map';
import ResponsiveInterface from './ResponsiveInterface';
import React from 'react'

export function App() {
    const gdanskWrzeszczCoordinates: [number, number] = [54.3842, 18.5922];
    const gdyniaCoordinates: [number, number] = [54.5189, 18.5305];

    return (
        <div className={mapStyles.mapContainer}>
            <ResponsiveInterface></ResponsiveInterface>
        </div>
    );
}
