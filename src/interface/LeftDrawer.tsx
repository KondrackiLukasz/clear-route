import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CollapsibleList from "./CollapsibleList";
import CollapsibleListCheckboxes from "./CollapsibleListCheckboxes";
import CollapsibleListForecasting from "./CollapsibleListForecasting";

export default function LeftDrawer(props: { lonFrom: any; setLonFrom: (arg0: number) => any; latFrom: any; setLatFrom: (arg0: number) => any; lonTo: any; setLonTo: (arg0: number) => any; latTo: any; setLatTo: (arg0: number) => any; handleResetClick: any; items: any[]; handleCheckboxChange: (item: any, checked: any) => void; handleRangeChange: (value: any) => void; }) {

    const styles = {
        input: {
          padding: "8px",
        },
        button: {
          backgroundColor: "#1976d2",
          color: "white",
          padding: "8px",
        },
        stripe: {
          display: "flex",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "#1976d2",
          color: "white",
        },
        typography: {
            color: '#1976d2',
            textAlign: 'center',
        }
    };

    return (
    <div>
    <Box>
        <Typography variant="h6" >From:</Typography>
    </Box>
    <br></br>
    <TextField
        id="from-lon"
        label="Longitude"
        variant="outlined"
        value={props.lonFrom}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setLonFrom(Number(event.target.value))
        }
        style={styles.input}
    />
    <br></br>
    <TextField
        id="from-lat"
        label="Latitude"
        variant="outlined"
        value={props.latFrom}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setLatFrom(Number(event.target.value))
        }
        style={styles.input}
    />
    <Divider />
    <br></br>
    <Box>
        <Typography variant="h6" >To:</Typography>
    </Box>
    <br></br>
    <div style={{backgroundColor:""}}>
    <TextField
        id="to-lon"
        label="Longitude"
        variant="outlined"
        value={props.lonTo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setLonTo(Number(event.target.value))
        }
        style={styles.input}
    />
    </div>
    <br></br>
    <TextField
        id="to-lat"
        label="Latitude"
        variant="outlined"
        value={props.latTo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setLatTo(Number(event.target.value))
        }
        style={styles.input}
    />
    <Box textAlign="center">
        <Button variant="contained" onClick={props.handleResetClick} style= {styles.button}>
        Reset
        </Button>
        <br></br>
        <br></br>
        <CollapsibleList
        title="Visible parameters"
        children={
            <CollapsibleListCheckboxes
            items={props.items}
            onCheckboxChange={props.handleCheckboxChange}
            ></CollapsibleListCheckboxes>
        }
        />
        <CollapsibleList
        title="Forecasting period"
        children={
            <CollapsibleListForecasting
            onRangeChange={props.handleRangeChange}
            ></CollapsibleListForecasting>
        }
        />
    </Box>
    </div>
);
}