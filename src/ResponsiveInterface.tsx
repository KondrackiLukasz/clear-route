import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MapComponent } from "./Map";
import { TextField } from "@mui/material";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveInterface(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const initialLonFrom = 54.3842;
  const initialLatFrom = 18.5922;
  const initialLonTo = 54.5189;
  const initialLatTo = 18.5305;
  const [lonFrom, setLonFrom] = React.useState(initialLonFrom);
  const [latFrom, setLatFrom] = React.useState(initialLatFrom);
  const [lonTo, setLonTo] = React.useState(initialLonTo);
  const [latTo, setLatTo] = React.useState(initialLatTo);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleResetClick = () => {
    setLonFrom(initialLonFrom);
    setLatFrom(initialLatFrom);
    setLonTo(initialLonTo);
    setLatTo(initialLatTo);
  };

  const styles = {
    input: {
      padding: "8px",
    },
    button: {
      backgroundColor: "#1976d2",
      color: "white",
      padding: "8px",
    },
    stripe: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      backgroundColor: "#1976d2",
      color: "white",
    },
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <Box style={styles.stripe}>
        <Typography variant="h6" style={{ marginRight: "16px" }}>From:</Typography>
      </Box>
        <TextField id="from-lon" label="Longitude" variant="outlined" value={lonFrom} onChange={(event) => setLonFrom(event.target.value)} style={styles.input} />
        <TextField id="from-lat" label="Latitude" variant="outlined" value={latFrom} onChange={(event) => setLatFrom(event.target.value)} style={styles.input} />
      <Divider />
      <Box style={styles.stripe}>
        <Typography variant="h6" style={{ marginRight: "16px" }}>To:</Typography>
      </Box>
        <TextField id="to-lon" label="Longitude" variant="outlined" value={lonTo} onChange={(event) => setLonTo(event.target.value)} style={styles.input} />
        <TextField id="to-lat" label="Latitude" variant="outlined" value={latTo} onChange={(event) => setLatTo(event.target.value)} style={styles.input} />
      <Button onClick={handleResetClick} style={styles.button}>Reset</Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GeoApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <MapComponent from={[lonFrom,latFrom]} to={[lonFrom,latTo]} />
      </Box>

    </Box>
  );
}