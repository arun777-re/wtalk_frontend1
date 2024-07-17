import { Button, TextField,Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MessageForm = ({ chatId, recipientId,socket }) => {
  const [messageText, setMessageText] = useState("");
  const token = useSelector((state) => state.token);
  const sender = useSelector(state=> state?.user);
  const senderId = sender?._id;
  const pic = sender?.userPicture;
  let chatid;
  if (chatId) {
    chatid = chatId[0]?._id;
  }

  const user = chatId  && chatId[0].users.slice(0,-1);
  const userId = user && Array.isArray(user) && user[0]?._id;
  const user1 = recipientId && !chatId ? recipientId : userId;
  const chatIdUrl = `http://localhost:8000/message/sendmessage/${chatid}`;
  const recIdUrl = `http://localhost:8000/message/${recipientId}`;
  

  useEffect(()=>{
    socket.connect();

    socket.emit("join",678);

    return ()=>{
      socket.disconnect();
    }
  },[socket]);

  const sendMessage = async (e, messageText) => {
    e.preventDefault();

    try {
      const message = await fetch(
        recipientId && !chatId ? recIdUrl : chatIdUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: messageText }),
        }
      );
      const response = await message.json();
      const msg ={
        text:messageText,
        users:user1,
        sender:{
          _id: senderId,
          userPicture:pic,
        },
      }
     
      socket.emit("sendMessage",678,msg)
      console.log(response);
      setMessageText('')
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };
  return (
    <form onSubmit={(e) => sendMessage(e, messageText)}>
      <Box>

      <TextField
        fullWidth
        type="text"
        label="Enter message"
        name="text"
        value={messageText}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        send
      </Button>
      </Box>

    </form>
  );
};

export default MessageForm;
