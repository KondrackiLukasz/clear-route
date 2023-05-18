import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { StationDetails } from '../backend/useStationData';


type HorizontalAccordionProps = {
  title: string;
  forecastingData: StationDetails | null;
};

type ForecastItem = {
  avg: number;
  day: string;
  max: number;
  min: number;
};

export default function HorizontalAccordion({
  title,
  forecastingData,
}: HorizontalAccordionProps) {
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);

  useEffect(() => {
    if(title === "O3") { setForecast(forecastingData?.forecast?.daily?.o3 || null);}
    else if(title === "PM2.5") { setForecast(forecastingData?.forecast.daily?.pm25 || null);}
    else if(title === "PM10") { setForecast(forecastingData?.forecast?.daily?.pm10 || null);}
  }, [title, forecastingData]);

  return (
    <div>
      {forecast && <Typography variant="h5">{title}</Typography>}
      <div>
        {forecast && forecast.map((item, index) => (
          <div key={index}>
            <Typography>{item.day}</Typography>
            <Typography>Avg: {item.avg}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}