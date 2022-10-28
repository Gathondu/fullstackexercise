import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItemButton,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ArticleOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

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
    <Box sx={{ flexGrow: 1, mx: "10rem" }}>
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
                <ListItemButton
                  onClick={() => navigate(item.link)}
                  variant="h6"
                  underline="hover"
                >
                  <ListItemIcon>
                    <ArticleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
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
