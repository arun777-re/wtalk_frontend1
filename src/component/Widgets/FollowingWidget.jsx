import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "../../state/userSlice";
import Loading from "../Loading";
import UserCard from '../Card/UserCard';

const FollowingWidget = () => {
  const token = useSelector((state) => state.token);
  const followee = useSelector((state) => state.following) || [];
  console.log(followee);

  const dispatch = useDispatch();
  const userFollowing = async () => {
    const followee = await fetch("http://localhost:8000/user/followee", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!followee.ok) {
      console.log("there are no following to show");
    }

    const response = await followee.json();
    console.log(response.followeeDetails);
    dispatch(
      setFollowing({
        following: response.followeeDetails,
      })
    );
  };

  useEffect(() => {
    userFollowing();
  }, [token]);

  return (
    <Box
      component={"div"}
      sx={{
        top: "40%",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "whitesmoke",
      }}
    >
      {followee.length === 0 && <Loading />}

      {followee &&
        followee.length > 0 &&
        followee?.map((followees) => {
          const friendId = followees?._id;
          return (
            <UserCard
              user={followees}
              friendId={friendId}
              update={userFollowing}
              key={followees?._id}
            />
          );
        })}
    </Box>
  );
};

export default FollowingWidget;
