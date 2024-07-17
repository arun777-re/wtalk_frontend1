import React,{useCallback, useState} from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { setError, setFollowers } from '../../state/userSlice';
import Loading from '../Loading';
import UserCard from '../Card/UserCard';

const FollowersWidget = () => {
  const dispatch = useDispatch();
  
  const token = useSelector(state=>state.token);
  console.log(token);
  const getFollowers = useCallback( async ()=>{
    try {
       const follower = await fetch('http://localhost:8000/user/followers',{
        method:"GET",
        headers:{Authorization:`${token}`},
       })
       
       if(!follower.ok){
           const errorData =await  follower.json();
           dispatch(setError(errorData));
           throw new Error("Error during fetching");
       }

       const response = await follower.json();
       
       console.log(response);
       dispatch(setFollowers({
        followers:response.followers
       }))
   
  } catch (error) {
      console.error(error);
      throw new Error("error during get followers:" + error)
  }
  },[token,dispatch]);

  useEffect(()=>{
    getFollowers();
  },[token,dispatch]);


  const followers = useSelector(state=>state.followers) || [];
  console.log(followers)
  return (
   
    <Box component={'div'}
    sx={{top:"40%",height:"80%",width:"100%",position:"relative",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  }}>

   {followers?.length === 0 && <Loading/>}
   {followers && followers?.length > 0 && 
   
   followers?.map((users)=>{
    const friendId = users?._id;
    return <UserCard key={friendId} user={users}
     friendId={friendId} update={getFollowers}/>
   })
   }
    </Box>
  )
}

export default FollowersWidget
