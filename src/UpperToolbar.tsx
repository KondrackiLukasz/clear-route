import { Toolbar, TextField, Box } from '@mui/material';

type UpperToolbarProps = {
    toolbarVisible: boolean;
    currentLongitude: number;
    currentLatitude: number;
    children?: React.ReactNode;
  };

function UpperToolbar({ toolbarVisible, currentLongitude, currentLatitude, children  }: UpperToolbarProps) {

  return (
    <>
      {toolbarVisible && (
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="Current Longitude"
              value={currentLongitude}
              disabled
            />
            <TextField
              label="Current Latitude"
              value={currentLatitude}
              disabled
            />
              <TextField
              label="P1"
              value={currentLatitude}
              disabled
            />
              <TextField
              label="P1"
              value={currentLatitude}
              disabled
            />
          </Box>
        </Toolbar>
      )}
      {children}
    </>
  );
}

export default UpperToolbar;