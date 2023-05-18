import { Box, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { StationDetails } from "../backend/useStationData";
import HorizontalCollapsibleList from "./HorizontalCollapsibleList";
type ForecastingToolbarProps = {
  toolbarVisible: boolean;
  closestStation: StationDetails | null;
  children?: React.ReactNode;
};

export default function ForecastingToolbar({
  toolbarVisible,
  children,
  closestStation
}: ForecastingToolbarProps) {
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
                width: "100%",
                bgcolor: "#668cff",
              }}
            >
              <Typography variant="h4">FORECASTING DATA</Typography>
              <Divider />
              <br></br>
            </Box>
            <HorizontalCollapsibleList
              title={"PM10"}
              forecastingData={closestStation}
            ></HorizontalCollapsibleList>
            <HorizontalCollapsibleList
              title={"PM2.5"}
              forecastingData={closestStation}
            ></HorizontalCollapsibleList>
            <HorizontalCollapsibleList
              title={"O3"}
              forecastingData={closestStation}
            ></HorizontalCollapsibleList>
          </Grid>
        </Grid>
      )}
      {children}
    </>
  );
}
