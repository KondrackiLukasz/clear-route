import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

type ForecastingToolbarProps = {
  toolbarVisible: boolean;
  handleSelectedDate: (date: Date) => void;
  children?: React.ReactNode;
};

function ForecastingToolbar({
  toolbarVisible,
  children,
  handleSelectedDate,
}: ForecastingToolbarProps) {
  const [selectedButton, setSelectedButton] = useState<string>("today");

  const today = new Date();
  const handleTodayClick = () => {
    setSelectedButton("today");
    handleSelectedDate(today);
  };

  const handleTomorrowClick = () => {
    setSelectedButton("tomorrow");
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    handleSelectedDate(tomorrow);
  };

  const handleInTwoDaysClick = () => {
    setSelectedButton("inTwoDays");
    const inTwoDays = new Date(today);
    inTwoDays.setDate(today.getDate() + 2);
    handleSelectedDate(inTwoDays);
  };

  return (
    <>
      {toolbarVisible && (
        <Box textAlign="center" sx={{ "& button": { m: 1 } }}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={handleTodayClick}
              color={selectedButton === "today" ? 'warning' : 'info'}
            >
              TODAY
            </Button>
            <Button
              onClick={handleTomorrowClick}
              color={selectedButton === "tomorrow" ? 'warning' : 'info'}
            >
              TOMORROW
            </Button>
            <Button
              onClick={handleInTwoDaysClick}
              color={selectedButton === "inTwoDays" ? 'warning' : 'info'}
            >
              IN 2 DAYS
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {children}
    </>
  );
}

export default memo(ForecastingToolbar);