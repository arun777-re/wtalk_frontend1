import React from "react";
import { Box, Typography } from "@mui/material";
import logo from '../logo.png'
import LoginFormForm from "../component/Form/LoginFormForm";
const LoginPage = () => {
  return (
    <Box
      component={"div"}
      sx={{ display: "flex", 
      gap: "20px", m: "12px 0px",
      bgcolor:"#f5f5f5",
      height: "100vh",
      overflowY:"visible",
      flexDirection:{xs:"column",md:"row",sm:"row"} }}
    >
      <Box
          sx={{
          flex: 1,
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component={'h4'} sx={{
          fontSize:"20px",color:"#333"
        }}>
          <img src={logo} alt="logo"/>
    WeTalK
        </Typography>
        <Typography
          variant="h3"
          sx={{
            width: "70%",
            mt:"10px",
            textAlign: "center",
            fontSize:{xs:"22px",md:"20px",sm:"25px"},
            color: "#333",
            letterSpacing: "3px",
          }}
        >
          SignUp / Login
        </Typography>
      </Box>

      <Box component={"div"} m={"5px 30px"} sx={{ flex: 1, 
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
        }}>
        <LoginFormForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
