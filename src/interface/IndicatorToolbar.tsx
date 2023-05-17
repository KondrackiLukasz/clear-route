import { Box, Grid } from "@mui/material";
import { useState } from "react";
import "./IndicatorToolbarStyles.css";

type IndicatorToolbarProps = {
  toolbarVisible: boolean;
  checkedItems: Array<any>;
  children?: React.ReactNode;
};

export default function IndicatorToolbar({
  checkedItems,
  toolbarVisible,
  children,
}: IndicatorToolbarProps) {
  const firstHalf = checkedItems.slice(0, Math.ceil(checkedItems.length / 2));
  const secondHalf = checkedItems.slice(Math.ceil(checkedItems.length / 2));
  const [selected, setSelected] = useState(Array<number>());

  const handleItemClick = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(item => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  }

  return (
    <>
      {toolbarVisible && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              {firstHalf.map((item, index) => (
                <div 
                  key={index} 
                  className={`checkbox-item ${selected.includes(index) ? 'selected' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <strong>
                    <span>{item.name}</span>
                  </strong>
                  <br />
                  {selected.includes(index) && (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              {secondHalf.map((item, index) => {
                const adjustedIndex = firstHalf.length + index;
                return (
                  <div 
                    key={adjustedIndex} 
                    className={`checkbox-item ${selected.includes(adjustedIndex) ? 'selected' : ''}`}
                    onClick={() => handleItemClick(adjustedIndex)}
                  >
                    <strong>
                      <span>{item.name}</span>
                    </strong>
                    <br />
                    {selected.includes(adjustedIndex) && (
                      <span>{item.value}</span>
                    )}
                  </div>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      )}
      {children}
    </>
  );
}