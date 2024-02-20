import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuthAdmin } from "../../context/AuthContextAdmin";
// import NavigationLink from "./shared/NavigationLink";
// import { Link } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const auth = useAuthAdmin();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      className="pt-4"
      sx={{
        bgcolor: "#1F2937",
        position: "static",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.admin?.name[0]}
          </Avatar>
          <ArrowDropDownIcon
            sx={{
              color: "white",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "rgb(17,29,39)",
              color: "white",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              auth?.logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
