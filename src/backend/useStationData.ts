import {useEffect, useState} from 'react';
import {Station} from './useNearStations';

interface AirQualityData {
    iaqi: {
        co?: {
            v: number;
        };
        no2?: {
            v: number;
        };
        o3?: {
            v: number;
        };
        pm10?: {
            v: number;
        };
        so2?: {
            v: number;
        };
        pm25?: {
            v: number;
        };
    };
    forecast: {
        daily: {
            o3: Array<{
                avg: number;
                day: string;
                max: number;
                min: number;
            }>;
            pm10: Array<{
                avg: number;
                day: string;
                max: number;
                min: number;
            }>;
            pm25: Array<{
                avg: number;
                day: string;
                max: number;
                min: number;
            }>;
        };
    };
}

export type StationDetails = AirQualityData & {
    idx: number;
    aqi: number;
    attributions: Array<{
        url: string;
        name: string;
        logo?: string;
    }>;
    city: {
        geo: number[];
        name: string;
        url: string;
        location: string;
    };
    dominentpol: string;
    time: {
        s: string;
        tz: string;
        v: number;
        iso: string;
    };
    debug: {
        sync: string;
    };
}

export function useStationData(stations: Station[]) {
    const [stationData, setStationData] = useState<StationDetails[]>([]);

    useEffect(() => {
        const fetchStationData = async () => {
            const fetchPromises = stations.map(async (station) => {
                const url = `https://api.waqi.info/feed/@${station.idx}/?token=9249e672bc03b2494df5a83bb22f9c17cff4b4f9`;
                const response = await fetch(url);
                const stationData = await response.json();
                if (stationData.status === 'ok') {
                    return stationData.data;
                }
            });

            const data = await Promise.all(fetchPromises);
            const filteredData = data.filter(Boolean); // Remove undefined values
            setStationData(filteredData);
        };

        fetchStationData();
    }, [stations]);

    return stationData;
}
