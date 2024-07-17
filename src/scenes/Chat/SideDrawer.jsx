import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupChatForm from "../../component/Form/GroupChatForm";
import UserAvatar from "../../component/Card/UserAvatar.jsx";

const SideDrawer = ({chats,onAvatarClick}) => {
  
  return (
    <Stack
      sx={{
        maxHeight: "600px",
        minWidth: "300px",
        bgcolor: "whitesmoke",
      }}
    >
      <Box sx={{m:"0 auto",mt:"20px"}}>
      <GroupChatForm />

      </Box>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          gap: "30px",
          ml:"18px",
          flexDirection: "column",
          my:"16px"
        }}
      >
        {chats.map((chat) => {
          const chatId = chat?._id
          return <UserAvatar key={chat?._id} 
          users={chat.users} chatId={chatId} onAvatarClick={onAvatarClick}/>;
        })}
      </Box>
    </Stack>
  );
};

export default SideDrawer;
