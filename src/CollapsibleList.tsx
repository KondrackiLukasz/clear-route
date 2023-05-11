import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";

export default function CollapsibleList({ items, onCheckboxChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (item, event) => {
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
              onChange={(event) =>
                handleCheckboxChange(item, event)
              }
            />
            <span className="checkbox-label">{item.name}</span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
