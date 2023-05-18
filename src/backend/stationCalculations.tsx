import { StationDetails } from "./useStationData";

export function getClosestStation(
  latitude: number,
  longitude: number,
  stations: StationDetails[]): StationDetails | null {
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

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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
export function fetchCheckedData(
  station: StationDetails | null,
  items: { name: string; }[]) {
  return items.map((item) => {
    let value;
    switch (item.name) {
      case "Latitude":
        value = station?.city.geo[0]?.toFixed(3);
        break;
      case "Longitude":
        value = station?.city.geo[1]?.toFixed(3);
        break;
      case "P10":
        value = station?.iaqi.pm10?.v;
        break;
      case "P2.5":
        value = station?.iaqi.pm25?.v;
        break;
      case "NO2":
        value = station?.iaqi.no2?.v;
        break;
      case "O3":
        value = station?.iaqi.o3?.v;
        break;
      case "SO2":
        value = station?.iaqi.so2?.v;
        break;
      case "CO":
        value = station?.iaqi.co?.v;
        break;
      case "AQI":
        value = station?.aqi;
        break;
      default:
        value = null;
    }
    return { name: item.name, value: value };
  });
}
