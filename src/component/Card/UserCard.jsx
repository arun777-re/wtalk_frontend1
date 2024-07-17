import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const UserCard = ({ user,update,friendId,term }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  console.log(friendId);
  const token = useSelector((state) => state.token);
  const handleFollow = async () => {
    try {
      const followUser = await fetch(
        `http://localhost:8000/user/${friendId}/follow`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (!followUser.ok) {
        throw new Error("Error during follow a user");
      }
console.log(followUser)
      update();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const handleUnFollow = async () => {
    try {
      const UnfollowUser = await fetch(
        `http://localhost:8000/user/${friendId}/unfollow`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (!UnfollowUser.ok) {
        throw new Error("Error during unfollow a user");
      }
console.log(UnfollowUser)
      update();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const handleButtonClick = ()=>{
    navigate('/chat',{
      state:{user:user}
    })
  }
  const location = useLocation();


  return (
    <Card
      sx={{
        mt: "19px",
        height: "20%",
        width:"70%",
        maxWidth:"90%",
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: "20px",
          ml: "10px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems:"center"
          }}
        >
          <CardMedia
            sx={{
              height: "100px",
              width: "100px",
              border: "1px solid #888",
              borderRadius: "50%",
            }}
            image={user?.userPicture}
          />
          <Typography sx={{ textAlign: "center", color: "#333" }}>
            {user?.firstName} &nbsp; {user?.lastName}
          </Typography>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            gap: "40px",
            float: "right",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#333" }}>
            Followers {user?.followers?.length}
          </Typography>
          <Typography sx={{ color: "#333" }}>
            Following {user?.following.length}
          </Typography>

          <Button
          type="button"
          variant="contained"
          sx={{color:"#fff",bgcolor:"#ffcc00",
          "&:hover":{
            color:"#ffcc00",bgcolor:"#fff"
          }
        }}
            onClick={
              location.pathname === "/followers" || location.pathname === `/user/searchuser/${term}` ? handleFollow : handleUnFollow
            }
          >
            {location.pathname === "/following" ? "UnFollow" :"Follow"}

          </Button>
          <Button onClick={handleButtonClick} 
           variant="contained"
          
          sx={{color:"#fff",bgcolor:"#ffcc00",
          "&:hover":{
            color:"#ffcc00",bgcolor:"#fff"
          }
        }}>
            Message
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserCard;
