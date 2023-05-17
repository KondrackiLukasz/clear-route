import {TextField } from "@mui/material"

type Props ={
    onRangeChange: (value:any) => void,
}

export default  function CollapsibleListForecasting({onRangeChange}:Props){
 const handleInputChange = (event: { target: { value: any; }; }) => {
        onRangeChange(event.target.value);
      };
    
  return (
      <div style={{width:"11vw"}}>
            <TextField id="filled-basic" label="Days to forecast" variant="filled" onChange={handleInputChange}/>
      </div>
  );
}