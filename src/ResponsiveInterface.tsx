import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Button,TextField} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MapComponent } from "./Map";
import UpperToolbar from "./UpperToolbar";
import CollapsibleList from "./CollapsibleList";

const drawerWidth = 200;
  const initialLonFrom = 54.3842;
  const initialLatFrom = 18.5922;
  const initialLonTo = 54.5189;
  const initialLatTo = 18.5305;
interface Props {
  window?: () => Window;
}

export default function ResponsiveInterface(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //From, To on the left toolbar
  const [lonFrom, setLonFrom] = React.useState(initialLonFrom);
  const [latFrom, setLatFrom] = React.useState(initialLatFrom);
  const [lonTo, setLonTo] = React.useState(initialLonTo);
  const [latTo, setLatTo] = React.useState(initialLatTo);
  //UpperToolbar steering vars
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const [currentLatitude, setCurrentLatitude] = React.useState(0);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);
  const handleToggleToolbar = () => {
    if(checkedItems.length !== 0){
      setToolbarVisible(!toolbarVisible);
    }
  };
  const [checkedItems, setCheckedItems] = React.useState([]);
  //current location calculated every some time interval
  React.useEffect(() => {
    if (navigator.geolocation) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLatitude(position.coords.latitude);
          setCurrentLongitude(position.coords.longitude);
          try {
            console.log(checkedItems)
            for(let i=0;i<checkedItems.length;i++){
              if(checkedItems[i].name === 'Current Latitude'){
                  checkedItems[i].value = position.coords.latitude;
              }else if (checkedItems[i].name === 'Current Longitude'){
                  checkedItems[i].value = position.coords.longitude;
              }
            }
          } catch (error) {
            
          }
        }, (error) => {
          console.log(error);
        });
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, []);
  // mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //left toolbar
  const handleResetClick = () => {
    setLonFrom(initialLonFrom);
    setLatFrom(initialLatFrom);
    setLonTo(initialLonTo);
    setLatTo(initialLatTo);
  };

  const items = [
    { name: 'Current Latitude', value: currentLatitude },
    { name: 'Current Longitude', value: currentLongitude },
    { name: 'P10', value: 12 },
    { name: 'P2.5', value: 123 },
    { name: 'AQI', value: 1234 },
  ];

  const handleCheckboxChange = (item, checked) => {
    if (checked && !checkedItems.includes(item)) {
      setCheckedItems([...checkedItems, item]);
    } else if(!checked){
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem?.name !== item.name));
    }
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
      <Box style={styles.stripe}>
        <Typography variant="h7">From:</Typography>
      </Box>
      <br></br>
        <TextField id="from-lon" label="Longitude" variant="outlined" value={lonFrom} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLonFrom(Number(event.target.value))} style={styles.input} />
        <TextField id="from-lat" label="Latitude" variant="outlined" value={latFrom} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLatFrom(Number(event.target.value))} style={styles.input} />
      <Divider />
      <br></br>
      <Box style={styles.stripe} >
        <Typography variant="h7" >To:</Typography>
      </Box>
      <br></br>
        <TextField id="to-lon" label="Longitude" variant="outlined" sx={{ padding: 2 }} value={lonTo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLonTo(Number(event.target.value))} style={styles.input} />
        <TextField id="to-lat" label="Latitude" variant="outlined" value={latTo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLatTo(Number(event.target.value))} style={styles.input} />
        <Box textAlign='center'>
        <Button onClick={handleResetClick} style={styles.button}>Reset</Button>
        <br></br>
        <br></br>
        <Button onClick={handleToggleToolbar} variant="contained" color="primary">
         {toolbarVisible ? 'Hide Indicators' : 'Show Indicators'}
        </Button>
        <CollapsibleList items={items} onCheckboxChange={handleCheckboxChange} />
        </Box>
        
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
          <UpperToolbar toolbarVisible={toolbarVisible} checkedItems = {checkedItems} > </UpperToolbar>
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
