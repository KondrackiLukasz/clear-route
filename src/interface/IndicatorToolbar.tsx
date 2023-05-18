import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { StationDetails } from "../backend/useStationData";
import ForecastingToolbar from "./ForecastingToolbar";
import { getClosestStation, fetchCheckedData } from "../backend/stationCalculations";
import "./IndicatorToolbarStyles.css";

type IndicatorToolbarProps = {
  toolbarVisible: boolean;
  checkedItems: Array<any>;
  dataFrom: Array<number>;
  stationsData: Array<StationDetails>;
  children?: React.ReactNode;
};

export default function IndicatorToolbar({
  checkedItems,
  toolbarVisible,
  dataFrom,
  stationsData,
}: IndicatorToolbarProps) {
  const closestStation = getClosestStation(
    dataFrom[0],
    dataFrom[1],
    stationsData
  );

  const stationData = fetchCheckedData(closestStation, checkedItems);

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
                bgcolor:"#3366ff",
              }}
            >
              {stationData.map((item, index) => (
                <div key={index} className={`checkbox-item`}>
                  {item.value && (
                    <div>
                      <Typography variant="h5">{item.name}</Typography>
                      <Divider />
                      <Typography variant="h6">{item.value}</Typography>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      <ForecastingToolbar toolbarVisible={toolbarVisible} closestStation = {closestStation}></ForecastingToolbar>
    </>
  );
}


