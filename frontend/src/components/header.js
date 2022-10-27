import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "All Sprints",
      link: "/sprints",
    },
    {
      title: "All Tickets",
      link: "/tickets",
    },
  ];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClick={handleClose}
            onClose={handleClose}
            onBlur={handleClose}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.title}>
                <Link
                  onClick={() => navigate(item.link)}
                  variant="h6"
                  underline="hover"
                >
                  {item.title}
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
