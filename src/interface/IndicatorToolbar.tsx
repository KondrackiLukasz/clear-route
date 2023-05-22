import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { StationDetails } from "../backend/useStationData";
import ForecastingToolbar from "./ForecastingToolbar";
import { getClosestStation, fetchCheckedData } from "../backend/stationCalculations";
import "./IndicatorToolbarStyles.css";
import { isToday } from "../backend/dateTimeHelpers";

type IndicatorToolbarProps = {
  toolbarVisible: boolean;
  dataFrom: Array<number>;
  stationsData: Array<StationDetails>;
  handleSelectedDate: (date: Date) => void;
  selectedDate: Date;
  children?: React.ReactNode;
};

export default function IndicatorToolbar({
  toolbarVisible,
  dataFrom,
  stationsData,
  selectedDate,
  handleSelectedDate,
}: IndicatorToolbarProps) {
  const closestStation = getClosestStation(
    dataFrom[0],
    dataFrom[1],
    stationsData
  );

  const stationData = fetchCheckedData(closestStation);
  
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
              {isToday(selectedDate) && stationData.map((item, index) => (
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
      <ForecastingToolbar toolbarVisible={toolbarVisible} closestStation = {closestStation} handleSelectedDate = {handleSelectedDate}></ForecastingToolbar>
    </>
  );
}


