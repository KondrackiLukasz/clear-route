import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ForecastingToolbar from "./ForecastingToolbar";
import { fetchCheckedData } from "../backend/stationCalculations";
import "./IndicatorToolbarStyles.css";
import { AirQualityData } from "../backend/interpolateData";

type IndicatorToolbarProps = {
  toolbarVisible: boolean;
  handleSelectedDate: (date: Date) => void;
  selectedDate: Date;
  interpolatedData: AirQualityData
  children?: React.ReactNode;
};

export default function IndicatorToolbar({
  toolbarVisible,
  selectedDate,
  interpolatedData,
  handleSelectedDate,
}: IndicatorToolbarProps) {
  
  const stationData = fetchCheckedData(interpolatedData,selectedDate);
  
  return (
    <>
      {toolbarVisible && (
        <Grid container>
          <Grid container item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                width: "100%",
                bgcolor:"rgb(25, 118, 210)",
              }}
            >
              {stationData?.map((item, index) => (
                <div key={index} className={`checkbox-item`}>
                  {item.value && (
                    <div>
                      <Typography variant="h5">{item.name}</Typography>
                      <Typography variant="h6">{item.value}</Typography>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      <ForecastingToolbar toolbarVisible={toolbarVisible} handleSelectedDate = {handleSelectedDate}></ForecastingToolbar>
    </>
  );
}


