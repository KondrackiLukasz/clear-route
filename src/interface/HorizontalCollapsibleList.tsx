import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { StationDetails } from "../backend/useStationData";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

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
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (title === "O3") {
      setForecast(forecastingData?.forecast?.daily?.o3 || null);
    } else if (title === "PM2.5") {
      setForecast(forecastingData?.forecast.daily?.pm25 || null);
    } else if (title === "PM10") {
      setForecast(forecastingData?.forecast?.daily?.pm10 || null);
    }
  }, [title, forecastingData]);

  const toggleDrawer = (open:boolean) => () => {
    setOpen(open);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        variant="outlined"
        sx={{
          color: "yellow",
          backgroundColor: "blue",
          borderColor: "green",
        }}
      >
        {title}
      </Button>
      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <div>
          {forecast && <Typography variant="h5">{title}</Typography>}
          <div>
            {forecast &&
              forecast.map((item, index) => (
                <div key={index}>
                  <Typography>{item.day}</Typography>
                  <Typography>Avg: {item.avg}</Typography>
                </div>
              ))}
          </div>
          <Button onClick={toggleDrawer(false)}>Close</Button>
        </div>
      </Drawer>
    </div>
  );
}
