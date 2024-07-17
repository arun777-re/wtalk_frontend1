import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "../../state/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileWidget = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const getUser = location.pathname === "/"

  useEffect(() => {
    const Profile = async () => {
      try {
        const profile = await fetch(`http://localhost:8000/user/getuser`, {
          method: "GET",
          headers: { Authorization: `${token}` },
        });

        if (!profile.ok) {
          throw new Error({ Error: "No such profile exists" });
        }

        const response = await profile.json();
        dispatch(setUser({
          user : response.user
        }))
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      Profile();
    }
  }, [token,dispatch,getUser]);

  const handleLog = (e) => {
    e.preventDefault();
    dispatch(setLogout());
    history('/')
  };

  const profile = useSelector(state=>state.user) || [];
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        m: "18px 0px",
        height: "27rem",
        width: { xs: "280px", md: "350px" },
        marginTop: "40px",
        marginLeft: "12px",
        bgcolor: "#f5f5f5",
        borderRadius:"5px"
      }}
    >
      <Box>
        <CardMedia
          image={
            profile?.userPicture ||
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png"
          }
          sx={{
            bgcolor: "white",
            border: "2px solid #333",
            borderRadius: "50%",
            fontSize: "60px",
            color: "lightblue",
            height: "126px",
            width: "126px",
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "12px",
            fontSize: "19px",
            color: "#333",
          }}
        >
          {profile?.firstName} &nbsp; {profile?.lastName}
        </Typography>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "25px",
          color: "#333",
        }}
      >
        <Typography
          onClick={() =>
            profile.followers?.length !== 0 && history("/followers")
          }
          sx={{ fontSize: "17px",
          "&:hover": { color: "#ffcc00" }, color: "#333", cursor: "pointer" }}
        >
          Followers &nbsp; {profile?.followers?.length || 0}
        </Typography>
        <Typography
          onClick={() =>
            profile.following.length !== 0 && history("/following")
          }
          sx={{ fontSize: "17px", color: "#333",
          "&:hover": { color: "#ffcc00" }, cursor: "pointer" }}
        >
          Following &nbsp; {profile?.following?.length || 0}
        </Typography>
        <Typography
          onClick={()=> history('/post/create')}
          sx={{
            cursor: "pointer",
            textAlign: "left",
            "&:hover": { color: "#ffcc00" },
            color:"#333"
          }}
        >
          Add post
        </Typography>
        <Typography
          onClick={handleLog}
          sx={{
            cursor: "pointer",
            textAlign: "left",
            "&:hover": { color: "#ffcc00" },
          }}
        >
          Logout
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileWidget;
