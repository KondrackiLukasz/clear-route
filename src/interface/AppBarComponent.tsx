import { memo, SetStateAction, useState } from "react";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";

function AppBarComponent(props: { label:string, handleSearchSubmit: (arg0: string) => void; }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => props.handleSearchSubmit(searchValue)}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder={props.label}
          inputProps={{
            "aria-label": "search",
          }}
          style={{
            marginLeft: "8px",
            flexGrow: 1,
            color: "inherit",
          }}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={(event: { key: string; }) => {
            if (event.key === "Enter") {
              props.handleSearchSubmit(searchValue);
            }
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default memo(AppBarComponent);