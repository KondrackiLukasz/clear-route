import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ForecastingToolbar from "./ForecastingToolbar";
import { fetchCheckedData } from "../backend/stationCalculations";
import "./IndicatorToolbarStyles.css";
import { AirQualityData } from "../backend/interpolateData";
import { createTheme, ThemeProvider,responsiveFontSizes } from "@mui/material/styles";
import { memo } from "react";

type IndicatorToolbarProps = {
  toolbarVisible: boolean;
  handleSelectedDate: (date: Date) => void;
  selectedDate: Date;
  interpolatedData: AirQualityData;
  children?: React.ReactNode;
};

function IndicatorToolbar({
  toolbarVisible,
  selectedDate,
  interpolatedData,
  handleSelectedDate,
}: IndicatorToolbarProps) {
  
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const stationData = fetchCheckedData(interpolatedData, selectedDate);

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
                gap: 1.5,
                width: "100%",
                bgcolor: "rgb(25, 118, 210)",
              }}
            >
              {stationData?.map((item, index) => (
                <div key={index} className={`checkbox-item`}>
                  {item.value && (
                    <div>
                      <ThemeProvider theme={theme}>
                        <Typography variant ="h6">{item.name}</Typography>
                        <Typography >{item.value}</Typography>
                      </ThemeProvider>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
      <ForecastingToolbar
        toolbarVisible={toolbarVisible}
        handleSelectedDate={handleSelectedDate}
      ></ForecastingToolbar>
    </>
  );
}
export default memo(IndicatorToolbar);
