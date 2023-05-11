import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";

type Props ={
    items: Array<any>
    onCheckboxChange: (item: any,checked: any) => void,
}

export default function CollapsibleList({ items, onCheckboxChange}:Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (item: [], event: { target: { checked: any; }; }) => {
    onCheckboxChange(item, event.target.checked);
  };

  return (
    <Accordion expanded={isOpen} onChange={handleToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        VISIBLE PARAMETERS
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item, index) => (
          <div key={index} style={{ alignSelf: 'start' }} className="checkbox-item">
            <Checkbox
              className="checkbox-input"
              onChange={(event: { target: { checked: any; }; }) =>
                handleCheckboxChange(item, event)
              }
            />
            <span className="checkbox-label">{item?.name}</span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
