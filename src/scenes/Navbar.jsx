import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import ProfileWidget from "../component/Widgets/ProfileWidget";
import logo from '../logo.png'
import { useLocation, useNavigate } from "react-router-dom";
import SearchTerm from "../component/SearchBar";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state=>state?.user);

  // adding a event listener to navbar dom manipulation

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      const nav = document.getElementById("navbar");
      nav.classList.add("sticky-top");
      nav.style.borderBottom = "whitesmoke";
    }
  });

  return (
    <Box
      id="navbar"
      className="sticky-top"
      component={"nav"}
      sx={{
        padding: "19px",
        display: location.pathname !== "/" ? "flex" : "none",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "0px 20px",
        position:"sticky",
        top:0,
        zIndex:"1000",
        width:"100%",
      }}
    >
      <Box sx={{ flex: "1",flexDirection:"row",display:"flex" }} component={"div"}>
        <Box
          component={"div"}
          onClick={()=>navigate('/home')}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="logo" style={{
            height:"50px", width:"50px",color:"#00ff66",

          }}/>
          <Typography sx={{ml:"8px",mt:"3px",fontSize:"16px",
            color:"#ffcc00",letterSpacing:"1px",fontSmooth:"auto",
            lineHeight:"30px",fontFamily:"sans-serif",fontStyle:"normal"
          }}>wTalK</Typography>
        </Box>

      </Box>
      <SearchTerm />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          float: "right",
          position: "relative",
          flexDirection: "row",
          flex: "1",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
      <IconButton>

          <NotificationsNoneIcon
            onClick={() => navigate('/notification')}
            sx={{ color: "#00ff66", cursor: "pointer" }}
       />
      </IconButton>
         <IconButton>

        <MessageIcon onClick={()=>navigate('/chat')}
         sx={{ color: "#00ff66", cursor: "pointer" }} />
        </IconButton>

        {!profile ? (
          <Avatar src={user?.userPicture}
            onClick={() => setProfile(true)}
            sx={{ color: "#00ff66", cursor: "pointer", fontSize: "40px" }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: 7,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "auto",
              width: "180px",
            }}
          >
            <CloseIcon
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: 0,
                top: 0,
                color: "#35654d",
              }}
              onClick={() => setProfile(false)}
            />
            <ProfileWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
