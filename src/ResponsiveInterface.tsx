import * as React from "react";
import { MapComponent } from "./Map";
import BottomBar from "./interface/BottomBar";
import { useStationData } from "./backend/useStationData";
import { Station, useNearStations } from "./backend/useNearStations";
import IndicatorToolbar from "./interface/IndicatorToolbar";
import { fetchCoordinates } from "./backend/currentLocationProvider";
import AppBarComponent from "./interface/AppBarComponent";
import {useEffect, useState} from "react";
import {AirQualityData, interpolateData} from "./backend/interpolateData.ts";

const initialLonFrom = 54.3842;
const initialLatFrom = 18.5922;
const initialLonTo = 54.5189;
const initialLatTo = 18.5305;


export default function ResponsiveInterface() {
  const [lonFrom, setLonFrom] = React.useState(initialLonFrom);
  const [latFrom, setLatFrom] = React.useState(initialLatFrom);
  const [lonTo, setLonTo] = React.useState(initialLonTo);
  const [latTo, setLatTo] = React.useState(initialLatTo);
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const stations: Station[] = useNearStations([
    [lonFrom, latFrom],
    [lonTo, latTo],
  ]);
  const stationsData = useStationData(stations);

  const [interpolatedData, setInterpolatedData] = useState<AirQualityData>({
    iaqi: {
      co: -1,
      no2: -1,
      o3: -1,
      pm10: -1,
      pm25: -1,
      so2: -1
    }
  });


  console.log(stationsData);
  useEffect(() => {
    setInterpolatedData(interpolateData(stationsData, selectedDate, []));
  }, [stationsData, selectedDate]);


  const handleBottomBarClick = () => {
    setToolbarVisible(!toolbarVisible);
  };

  const handleSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSearchSubmit = async (value:string) => {
    console.log("Search value:", value);
    const coordinates = await fetchCoordinates(value);
    if (coordinates) {
      console.log("Coordinates:", coordinates);
      setLatTo(coordinates.longitude);
      setLonTo(coordinates.latitude);
    }
  };

  return (
    <div>
      <div>
        <AppBarComponent
          handleSearchSubmit={handleSearchSubmit}
        ></AppBarComponent>
        <MapComponent
          from={[lonFrom, latFrom]}
          to={[lonTo, latTo]}
          setFrom={(L) => {
            setLatFrom(L[0]);
            setLonFrom(L[1]);
          }}
          setTo={(L) => {
            setLatTo(L[0]);
            setLonTo(L[1]);
          }}
          stations={stations}
          stationsData={stationsData}
          toolbarVisible={toolbarVisible}
          selectedDate={selectedDate}
          interpolatedData={interpolatedData}
        />
        <IndicatorToolbar
          toolbarVisible={toolbarVisible}
          dataFrom={[lonFrom, latFrom]}
          stationsData={stationsData}
          selectedDate={selectedDate}
          handleSelectedDate={handleSelectedDate}
        />
      </div>
      <BottomBar onClick={handleBottomBarClick}></BottomBar>
    </div>
  );
}
