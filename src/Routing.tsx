import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L, {LatLngTuple} from "leaflet";
import {AirQualityData} from "./backend/interpolateData.ts";

export interface RoutingComponentProps {
    from: LatLngTuple;
    to: LatLngTuple;
    setRouteCoordinates: (Plan: LatLngTuple[]) => void;
    setFrom: (from: LatLngTuple) => void;
    setTo: (to: LatLngTuple) => void;
    interpolatedData: AirQualityData
}

const getColor = (aq: AirQualityData) => {
    const isEmpty = Object.values(aq.iaqi).every(value => value === -1);

    if (isEmpty) {
        return "rgb(128, 128, 128)"; // Return grey color
    }
    // Define the maximum acceptable values for each pollutant (replace with actual values)
    const maxValues = {
        co: 70,
        no2: 200,
        o3: 120,
        pm10: 300,
        so2: 20,
        pm25: 55,
    };

    // Calculate the Air Quality Index as the average ratio of each pollutant to its maximum acceptable value
    const aqi = Math.max(...Object.keys(aq.iaqi).map(key => aq.iaqi[key as keyof AirQualityData['iaqi']] / maxValues[key as keyof typeof maxValues]));

    // Define the RGB values for green and red
    const green = [0, 255, 0];
    const red = [255, 0, 0];

    // Linear scale interpolation between green and red based on the AQI
    const aqiLinear = aqi; // No exponentiation

    // Linear interpolation between green and red based on the AQI
    const color = green.map((value, i) => Math.round((1 - aqiLinear) * value + aqiLinear * red[i]));

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};


export function Routing({
                            from,
                            to,
                            setRouteCoordinates,
                            setFrom,
                            setTo,
                            interpolatedData,
                        }: RoutingComponentProps) {
    const map = useMap();

    // Determine the color based on air quality
    // const color = ((aq: AirQualityData) => {
    //     if (aq.iaqi.pm10 === -1) return 'grey';
    //     if (aq.iaqi.pm10 <= 4) return 'green';
    //     if (aq.iaqi.pm10 <= 8) return 'yellow';
    //     return 'red';
    // })(interpolatedData);
    // Determine the color based on air quality
    const color = getColor(interpolatedData);

    useEffect(() => {
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            showAlternatives: false,
            fitSelectedRoutes: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
            createMarker: function (i, start) {
                const marker = L.marker(start.latLng, {
                    draggable: true,
                });
                marker.on('dragend', function () {
                    const newLatLng = [marker.getLatLng().lng, marker.getLatLng().lat] as LatLngTuple;
                    if (i === 0) {
                        setFrom(newLatLng);
                    } else {
                        setTo(newLatLng);
                    }
                    const newWaypoint = L.Routing.waypoint(L.latLng(newLatLng[0], newLatLng[1]));
                    routingControl.spliceWaypoints(i, 1, newWaypoint);
                    routingControl.route();
                });
                return marker;
            },
            lineOptions: {
                extendToWaypoints: true,
                addWaypoints: false,
                missingRouteTolerance: 0.0,
                styles: [
                    {color: color, opacity: 0.8, weight: 6},
                ],
            },
        }).addTo(map);

        routingControl.on('routeselected', function (e) {
            const coordinates = e.route.coordinates as LatLngTuple[];
            setRouteCoordinates(coordinates);
        });

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to, color]);
    return null;
}

