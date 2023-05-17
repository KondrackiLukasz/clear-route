import {MapComponent} from "./Map.tsx";
import * as React from "react";
import {Station} from "./backend/useAllStations.ts";
import {useNearStations} from "./backend/useNearStations.ts";
import {useStationData} from "./backend/useStationData.ts";

const initialLonFrom = 54.3842;
const initialLatFrom = 18.5922;
const initialLonTo = 54.5189;
const initialLatTo = 18.5305;

export function JustMap() {
    const [lonFrom, setLonFrom] = React.useState(initialLonFrom);
    const [latFrom, setLatFrom] = React.useState(initialLatFrom);
    const [lonTo, setLonTo] = React.useState(initialLonTo);
    const [latTo, setLatTo] = React.useState(initialLatTo);


    const stations: Station[] = useNearStations([[lonFrom, latFrom], [lonTo, latTo]]);
    const stationsData = useStationData(stations);

    return (
        <MapComponent
            from={[lonFrom, latFrom]}
            to={[lonTo, latTo]}
            setFrom={L => {
                setLatFrom(L[0]);
                setLonFrom(L[1]);
            }}
            setTo={L => {
                setLatTo(L[0]);
                setLonTo(L[1]);
            }}
            stations={stations}
            stationsData={stationsData}
        />
    )
}
