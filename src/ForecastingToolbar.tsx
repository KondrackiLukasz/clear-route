import { Toolbar, Box, Grid } from "@mui/material";
import CollapsibleList from "./CollapsibleList";

type ForecastingToolbarProps = {
  toolbarVisible: boolean;
  children?: React.ReactNode;
};

export default function ForecastingToolbar({
  toolbarVisible,
  children,
}: ForecastingToolbarProps) {
  return (
    <>
      {toolbarVisible && (
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CollapsibleList
                  title={"P10"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
                <CollapsibleList
                  title={"P2.5"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
                <CollapsibleList
                  title={"AQI"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CollapsibleList
                  title={"NO2"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
                <CollapsibleList
                  title={"O3"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
                <CollapsibleList
                  title={"SO2"}
                  children={
                    <ul>
                      <li>1 day: 2.5mg</li>
                      <li>2 days: 2.5mg</li>
                      <li>3 days: 2.5mg</li>
                    </ul>
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      )}
      {children}
    </>
  );
}
