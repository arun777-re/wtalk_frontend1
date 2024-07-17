import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, {useEffect, useRef, useState,useCallback} from "react";
import MessageForm from "../../component/Form/MessageForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const MessageBox = ({ recId, chatId, fetchAllChats }) => {
  const currentUser = useSelector(state => state.user);
  const token = useSelector(state =>state.token)
  const messageEndRef = useRef();

  const location = useLocation();
  const path = location.pathname;

  const isChat = path === "/chat";
  let chatid;
  if (chatId) {
    chatid = chatId[0]?._id;
  }
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:8000");

  // method to get messages using socket.io
  useEffect(() => {

    socket.on("message",(data)=>{
      alert("message recieved")
      console.warn("Message recieved",data);
      setMessages(prevMessage => [data,...prevMessage]);
    });

    // Clean up function to disconnect socket on unmount
    return () => {
    socket.disconnect();
    };
  }, [socket]);

 
// method to get messages stored in database

const chatIdUrl = `http://localhost:8000/message/allmessage/${chatid}`
const recIdUrl = `http://localhost:8000/message/fetchmessage/${recId}`

const url = recId && !chatId ? recIdUrl : chatIdUrl;

const fetchMessage = useCallback(async()=>{
  try{
  await fetch(url,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
       Authorization : `Bearer ${token}`
    }
  }).then(res=>res.json())
  .then(data=>setMessages(data))
  .catch(err=>console.error(err))
}

 catch (error) {
console.error(error)
}
},[token,url])
useEffect(()=>{
if(token){
  fetchMessage();
}

},[url,token,isChat,fetchMessage])

console.log(messages);

  return (
    <Stack sx={{ height: "90%", display: "flex",
    overflowY:"auto", flexDirection: "column-reverse",scrollBehavior:"smooth" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          {Array.isArray(messages) &&
            messages.map((message, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection:
                      currentUser?._id === message.sender?._id
                        ? "row-reverse"
                        : "row",
                    textAlign:
                      currentUser?._id === message?.sender?._id
                        ? "end"
                        : "start",
                    fontSize: "14px",
                  }}
                >
                  {currentUser?._id !== message?.sender?._id && (
                    <Avatar src={message.sender?.userPicture} />
                  )}

                  <Box
                    sx={{
                      borderRadius: 4,
                      backgroundColor:
                        currentUser?._id === message.sender?._id
                          ? "#DCF8C6"
                          : "#f0f0f0",
                      padding: 1,
                      marginLeft:
                        currentUser?._id === message.sender?._id ? 0 : 1,
                      marginRight:
                        currentUser?._id === message.sender?._id ? 1 : 0,
                    }}
                  >
                    <Typography>{message.text}</Typography>
                  </Box>
                </Box>
              );
            })}
            <div ref={messageEndRef}/>
        </Stack>
        <Box sx={{ flex: "1" }}></Box>
      </Box>
      <Box sx={{ width: "100%",position:"fixed",bottom:0 }}>
        <MessageForm
          chatId={chatId}
          fetchAllChats={fetchAllChats}
          recipientId={recId}
          socket={socket}
        />
      </Box>
    </Stack>
  );
};

export default MessageBox;
