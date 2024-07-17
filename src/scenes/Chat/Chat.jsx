import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { Box, Stack } from "@mui/material";
import SideDrawer from "./SideDrawer";
import MessageBox from "./MessageBox";
import { useLocation } from "react-router-dom";

const Chat = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [filteredchatId, setFilteredchatId] = useState(null);

  const token = useSelector((state) => state.token);
  const location = useLocation();
  const recipientId = location.state;
  const recId = recipientId?.user._id;
  const chatroute = location.pathname === "/chat";

  const fetchAllChats = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/chat/fetchchat`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        console.log("errors during fetch chat");
      }

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  },[token]);

  useEffect(() => {
    if (token) {
      fetchAllChats();
    }
  }, [token, chatroute]);

  // handle chatId when clicked on a user Avatar
  const handleAvatarClick = (chatId) => {
    const filtered = chats.filter((chat) => chat?._id === chatId);
    setFilteredchatId(filtered);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "90vh",
      }}
    >
      <Box sx={{height:"90%",bottom:"0"}}>

      <SideDrawer chats={chats} onAvatarClick={handleAvatarClick} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: "10px",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <MessageBox
          recId={recId}
          chatId={filteredchatId}
          fetchAllChats={fetchAllChats}
        />
      </Box>
    </Stack>
  );
};

export default Chat;
