import { Box, Typography } from "@mui/material";
import React from "react";
import './Loading.css'

const Loading = () => {
  return (
    <Box
      sx={{
        top:"30%",
        position: "relative",
        maxHeight: "500px",
        maxWidth: "200px",
        padding: "40px",
        textAlign: "center",
        bgcolor: "lightgrey",
        overflow: "hidden",
        backgroundImage: "linear-gradient(90deg, transparent 50%, lightblue 50%)",
        backgroundSize: "200% 100%", // Double the width for the linear gradient
        animation: "moveBackground 2s linear infinite",
      }}
    >
      <Typography sx={{}}>No Data/ Error</Typography>
    
    </Box>
  );
};

export default Loading;
