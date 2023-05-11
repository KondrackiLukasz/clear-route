import { Toolbar, TextField, Box } from '@mui/material';
import { Key } from 'react';

type UpperToolbarProps = {
    toolbarVisible: boolean;
    checkedItems: never[]
    children?: React.ReactNode;
  };

export default function UpperToolbar({ checkedItems, toolbarVisible, children  }: UpperToolbarProps) {
  return (
    <>
      {toolbarVisible && (
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {checkedItems.map((item: { name: any; value: any; }, index: Key | null | undefined) => (
          <div key={index} className="checkbox-item">
            <TextField
              label = {item.name}
              value = {item.value}
              disabled
            />
          </div>
        ))}
          </Box>
        </Toolbar>
      )}
      {children}
    </>
  );
}