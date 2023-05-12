import {TextField } from "@mui/material"

type Props ={
    onRangeChange: (value:number) => void,
}

export default  function CollapsibleListForecasting({onRangeChange}:Props){
 const handleInputChange = (event: { target: { value: number; }; }) => {
        onRangeChange(Number(event.target.value));
      };
    
  return (
      <div>
            <TextField id="filled-basic" label="Days to forecast" variant="filled" onChange={handleInputChange}/>
      </div>
  );
}