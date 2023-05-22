import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { StationDetails } from "../backend/useStationData";
type ForecastingToolbarProps = {
  toolbarVisible: boolean;
  closestStation: StationDetails | null;
  handleSelectedDate: (date: Date) => void;
  children?: React.ReactNode;
};

export default function ForecastingToolbar({
  toolbarVisible,
  children,
  closestStation,
  handleSelectedDate,
}: ForecastingToolbarProps) {
  const today = new Date();
  closestStation
  const handleTodayClick = () => {
    handleSelectedDate(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    handleSelectedDate(tomorrow);
  };

  const handleInTwoDaysClick = () => {
    const inTwoDays = new Date(today);
    inTwoDays.setDate(today.getDate() + 2);
    handleSelectedDate(inTwoDays);
  };
  return (
    <>
      {toolbarVisible && (
        <Box textAlign='center' sx={{ "& button": { m: 1 } }}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleTodayClick}>TODAY</Button>
            <Button onClick={handleTomorrowClick}>TOMORROW</Button>
            <Button onClick={handleInTwoDaysClick}>IN 2 DAYS</Button>
          </ButtonGroup>
        </Box>
      )}
      {children}
    </>
  );
}
