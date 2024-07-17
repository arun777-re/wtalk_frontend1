import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const NotificationWidget = () => {
  const user = useSelector((state) => state.user) || [];
  const notification = user?.notifications;
  console.log(user?.notifications);
  return (
    <Box sx={{m:"0 auto",height:"100%",width:"100%",
      top:"3rem"
    }}>

    <Card
      sx={{
        height: "400px",
        width: "290px",
        color: "#333",
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography sx={{lineHeight:"20px",letterSpacing:"1px",
        fontSize:"19px",fontSmooth:"smooth"
      }}>Notifications</Typography>
      <CardContent>
        {notification && notification.length > 0 ? (
          notification.map((notify, index) => {
            console.log(notify);
            return (
              <ol
                key={index}
                style={{
                  fontSize: "14px",
                  mt: "18px",
                  color: "#333",
                  fontFamily: "sans-serif",
                }}
              >
                  <li>

                {notify.type.charAt(0).toUpperCase() + notify.type.slice(1, 7)}{" "}
                : &nbsp;{" "}
                {notify.message.charAt(0).toUpperCase() +
                  notify.message.slice(1).toLowerCase()}
                  </li>

              </ol>
            );
          })
        ) : (
          <>
            <CircularProgress color="#333" />
            <p>No notifications to show</p>
          </>
        )}
      </CardContent>
    </Card>
    </Box>

  );
};

export default NotificationWidget;
