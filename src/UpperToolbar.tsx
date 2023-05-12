import { Toolbar, Box, Grid } from "@mui/material";
import { Key } from "react";

type UpperToolbarProps = {
  toolbarVisible: boolean;
  checkedItems: Array<any>;
  children?: React.ReactNode;
};

export default function UpperToolbar({
  checkedItems,
  toolbarVisible,
  children,
}: UpperToolbarProps) {
  const firstHalf = checkedItems.slice(0, Math.ceil(checkedItems.length / 2));
  const secondHalf = checkedItems.slice(Math.ceil(checkedItems.length / 2));
  return (
<>
      {toolbarVisible && (
        
          <Grid container spacing ={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {firstHalf.map((item, index) => (
                  <div key={index} className="checkbox-item">
                    <strong>
                      <span>{item.name}:</span>
                    </strong>
                    <br />
                    <span>{item.value}</span>
                  </div>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {secondHalf.map((item, index) => (
                  <div key={index} className="checkbox-item">
                    <strong>
                      <span>{item.name}:</span>
                    </strong>
                    <br />
                    <span>{item.value}</span>
                  </div>
                ))}
              </Box>
            </Grid>
          </Grid>
      )}
      {children}
    </>
  );
}
