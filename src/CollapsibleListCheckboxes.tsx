import {Checkbox } from "@mui/material";
import { Key } from "react";



type Props ={
    items: Array<any>,
    onCheckboxChange: (item: any,checked: any) => void,
}

export default  function CollapsibleListCheckboxes({items, onCheckboxChange}:Props){
 const handleCheckboxChange = (item: [], event: { target: { checked: any; }; }) => {
        onCheckboxChange(item, event.target.checked);
      };
    
  return (
      <div>
    {items.map((item: any, index: Key | null | undefined) => (
        <div key={index} className="checkbox-item">
          <Checkbox
            className="checkbox-input"
            onChange={(event: { target: { checked: any; }; }) =>
              handleCheckboxChange(item, event)
            }
          />
          <span className="checkbox-label">{item?.name}</span>
        </div>
      ))}
      </div>
  );
        }