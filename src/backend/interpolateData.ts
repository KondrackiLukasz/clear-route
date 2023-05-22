import {StationDetails} from "./useStationData.ts";

type LatLngTuple = [number, number];

export interface AirQualityData {
    iaqi: {
        co: number;
        no2: number;
        o3: number;
        pm10: number;
        so2: number;
        pm25: number;
    };

}
// forecast: {
//     daily: {
//         o3: Array<{
//             avg: number;
//             day: Date;
//             max: number;
//             min: number;
//         }>;
//         pm10: Array<{
//             avg: number;
//             day: Date;
//             max: number;
//             min: number;
//         }>;
//         pm25: Array<{
//             avg: number;
//             day: Date;
//             max: number;
//             min: number;
//         }>;
//     };
// };
export function distanceBetweenPoints(pointA: LatLngTuple, pointB: LatLngTuple): number {
    function toRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRadians(pointA[0]);
    const lon1 = toRadians(pointA[1]);
    const lat2 = toRadians(pointB[0]);
    const lon2 = toRadians(pointB[1]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function interpolateData(stations: StationDetails[], date: Date, routePoints: LatLngTuple[]): AirQualityData {
    const resultData = {
        iaqi: {
            co: stations.filter(s => s.iaqi.co !== null).map(s => s.iaqi.co?.v ?? 0),
            no2: stations.filter(s => s.iaqi.no2 !== null).map(s => s.iaqi.no2?.v ?? 0),
            o3: stations.filter(s => s.iaqi.o3 !== null).map(s => s.iaqi.o3?.v ?? 0),
            pm10: stations.filter(s => s.iaqi.pm10 !== null).map(s => s.iaqi.pm10?.v ?? 0),
            so2: stations.filter(s => s.iaqi.so2 !== null).map(s => s.iaqi.so2?.v ?? 0),
            pm25: stations.filter(s => s.iaqi.pm25 !== null).map(s => s.iaqi.pm25?.v ?? 0),
        }
    };
    const calculateAverage = (values: number[]) => {
        if (values.length === 0) return -1;

        const sum = values.reduce((a, b) => a + b, 0);
        return sum / values.length;
    }

    return {
        iaqi: {
            co: calculateAverage(resultData.iaqi.co),
            no2: calculateAverage(resultData.iaqi.no2),
            o3: calculateAverage(resultData.iaqi.o3),
            pm10: calculateAverage(resultData.iaqi.pm10),
            so2: calculateAverage(resultData.iaqi.so2),
            pm25: calculateAverage(resultData.iaqi.pm25),
        },
    };

}
