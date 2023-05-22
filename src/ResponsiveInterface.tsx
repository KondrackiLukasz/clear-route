import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { MapComponent } from "./Map";
import BottomBar from "./interface/BottomBar";
import LeftDrawer from "./interface/LeftDrawer";
import { useStationData } from "./backend/useStationData";
import { Station, useNearStations } from "./backend/useNearStations";
import IndicatorToolbar from "./interface/IndicatorToolbar";

const initialLonFrom = 54.3842;
const initialLatFrom = 18.5922;
const initialLonTo = 54.5189;
const initialLatTo = 18.5305;

export default function ResponsiveInterface() {
  const [range, setRange] = React.useState(1);
  range;
  const [lonFrom, setLonFrom] = React.useState(initialLonFrom);
  const [latFrom, setLatFrom] = React.useState(initialLatFrom);
  const [lonTo, setLonTo] = React.useState(initialLonTo);
  const [latTo, setLatTo] = React.useState(initialLatTo);
  const [toolbarVisible, setToolbarVisible] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState(Array<any>());
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const stations: Station[] = useNearStations([
    [lonFrom, latFrom],
    [lonTo, latTo],
  ]);
  const stationsData = useStationData(stations);
  const items = [
    { name: "P10" },
    { name: "P2.5" },
    { name: "NO2" },
    { name: "O3" },
    { name: "SO2" },
    { name: "CO" },
  ];

  const handleBottomBarClick = () => {
    if (checkedItems.length !== 0) {
      setToolbarVisible(!toolbarVisible);
      return;
    }
    if (checkedItems.length === 0 && toolbarVisible) {
      setToolbarVisible(!toolbarVisible);
      return;
    }
  };

  //left toolbar
  const handleResetClick = () => {
    setLonFrom(initialLonFrom);
    setLatFrom(initialLatFrom);
    setLonTo(initialLonTo);
    setLatTo(initialLatTo);
    setCheckedItems(Array<any>([]));
  };

  const handleCheckboxChange = (item: { name: any }, checked: any) => {
    if (
      checked &&
      !checkedItems.some((checkedItem) => checkedItem.name === item.name)
    ) {
      setCheckedItems([...checkedItems, item]);
    } else if (!checked) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem?.name !== item.name)
      );
    }
  };

  const handleRangeChange = (value: number) => {
    setRange(value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const drawer = (
    <LeftDrawer
      lonFrom={lonFrom}
      setLonFrom={setLonFrom}
      latFrom={latFrom}
      setLatFrom={setLatFrom}
      lonTo={lonTo}
      setLonTo={setLonTo}
      latTo={latTo}
      setLatTo={setLatTo}
      handleResetClick={handleResetClick}
      items={items}
      handleCheckboxChange={handleCheckboxChange}
      handleRangeChange={handleRangeChange}
    ></LeftDrawer>
  );

  return (
    <div>
      <div>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">GeoApp</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={handleMenuToggle}
          PaperProps={{
            sx: {
              maxWidth: "40vw",
            },
          }}
        >
          {drawer}
        </Drawer>
        <MapComponent
          from={[lonFrom, latFrom]}
          to={[lonTo, latTo]}
          setFrom={(L) => {
            setLatFrom(L[0]);
            setLonFrom(L[1]);
          }}
          setTo={(L) => {
            setLatTo(L[0]);
            setLonTo(L[1]);
          }}
          stations={stations}
          stationsData={stationsData}
          toolbarVisible={toolbarVisible}
          selectedDate={selectedDate}
        />
        <IndicatorToolbar
          toolbarVisible={toolbarVisible}
          dataFrom={[lonFrom, latFrom]}
          stationsData={stationsData}
          checkedItems={checkedItems}
        />
      </div>
      <BottomBar onClick={handleBottomBarClick}></BottomBar>
    </div>
  );
}
