import { Avatar, Box } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

const UserAvatar = ({users,chatId,onAvatarClick}) => {
console.log(chatId)
  const [pic,setPic] = useState('')
    const [name,setName] = useState('');

      const extractUserInfo = useCallback(()=>{
  
        const userInfo = users.slice(0,-1).map((user)=>({
          firstName:user.firstName,
          userPicture:user.userPicture,
        }));
        const info = userInfo.forEach(element=> {
    
          setName(element.firstName);
          setPic(element.userPicture)
        });
      },[users])

      useEffect(()=>{
        extractUserInfo();

      },[extractUserInfo])
     
 const handleClick = ()=>{
     if(onAvatarClick){
      onAvatarClick(chatId)
     }
 }
  return (
    <Box sx={{
      display:"flex",flexDirection:"row",alignItems:"center",gap:"10px"
    }}>
    <Avatar src={pic} alt={name} style={{
      cursor:"pointer"
    }} onClick={handleClick}/>
    {name}
    </Box>

  )
}

export default UserAvatar
