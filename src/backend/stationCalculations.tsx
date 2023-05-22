import { getDayIndex } from "./dateTimeHelpers";
import { AirQualityData } from "./interpolateData";
import { StationDetails } from "./useStationData";

export function getClosestStation(
  latitude: number,
  longitude: number,
  stations: StationDetails[]
): StationDetails | null {
  var closestStation: StationDetails | null = null;
  var shortestDistance = Infinity;

  for (var station of stations) {
    var stationLat = station.city.geo[0];
    var stationLong = station.city.geo[1];

    var distance = haversineDistance(
      latitude,
      longitude,
      stationLat,
      stationLong
    );

    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestStation = station;
    }
  }

  return closestStation;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  let R = 6371;
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;

  return d;
}

function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}
export function fetchCheckedData(station: AirQualityData | null,selectedDate:Date) {

  const items = [
    { name: "PM10" },
    { name: "PM2.5" },
    { name: "NO2" },
    { name: "O3" },
    { name: "SO2" },
    { name: "CO" },
  ];
  const roundNum = 2;
  const forecastedDay = getDayIndex(selectedDate);
  if (forecastedDay == 0){
    return items.map((item) => {
      let value;
      switch (item.name) {
        case "PM10":
          value = station?.iaqi.pm10.toFixed(roundNum);
          break;
        case "PM2.5":
          value = station?.iaqi.pm25.toFixed(roundNum);
          break;
        case "NO2":
          value = station?.iaqi.no2.toFixed(roundNum);
          break;
        case "O3":
          value = station?.iaqi.o3.toFixed(roundNum);
          break;
        case "SO2":
          value = station?.iaqi.so2.toFixed(roundNum);
          break;
        case "CO":
          value = station?.iaqi.co.toFixed(roundNum);
          break;
        default:
          value = null;
      }
      return { name: item.name, value: value };
    });
  }
  else{
    return items.map((item) => {
      let value;
      switch (item.name) {
        case "PM2.5":
          value = station?.forecast.daily.pm25[forecastedDay]['avg'].toFixed(roundNum);
          break;
        case "PM10":
          value = station?.forecast.daily.pm10[forecastedDay]['avg'].toFixed(roundNum);
          break;
        case "O3":
          value = station?.forecast.daily.o3[forecastedDay]['avg'].toFixed(roundNum);
          break;
        default:
          value = null;
      }
      return { name: item.name, value: value };
    });
  }
    
}
