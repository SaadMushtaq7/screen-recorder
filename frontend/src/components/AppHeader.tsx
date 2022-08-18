import React, { FC } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const AppHeader: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              Screen Recorder
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
