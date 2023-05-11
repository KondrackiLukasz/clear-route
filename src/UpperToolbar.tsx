import { Toolbar, TextField, Box } from '@mui/material';
import { Key } from 'react';

type UpperToolbarProps = {
    toolbarVisible: boolean;
    checkedItems: Array<any>;
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
            <strong><span>
              {item.name}:
            </span>
            </strong>
            <br></br>
            <span>
              {item.value} 
            </span>
          </div>
        ))}
          </Box>
        </Toolbar>
      )}
      {children}
    </>
  );
}