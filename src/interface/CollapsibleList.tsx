import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {Box} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../index.css";

type Props ={
    title:string,
    children?: React.ReactNode;
}

export default function CollapsibleList({title, children}:Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className = "CollapsibleList" style={{display:"flex"}}>
    <Accordion expanded={isOpen} onChange={handleToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex">
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
    
    </div>
  );
}
