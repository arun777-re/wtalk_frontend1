import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box} from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserCard from "../../component/Card/UserCard";
import Loading from "../../component/Loading";
import { setSearchUser } from "../../state/userSlice";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const handleSearch = useCallback( async () => {
    if (!searchTerm){
      return;
    }
    try {
      const SearchUser = await fetch(
        `http://localhost:8000/user/searchuser?search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!SearchUser.ok) {
        console.log("error occured during fetch");
      }

      const response = await SearchUser.json();
      if (!Array.isArray(response)) {
        console.log("No user to show");
      } else {
        dispatch(
          setSearchUser({
            searchUser: response,
          })
        );
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  },[dispatch,searchTerm,token]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  const user = useSelector((state) => state.searchUser) || [];
  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {user.length === 0 && <Loading />}

      {user &&
        user.length > 0 &&
        user?.map((users) => {
          const friendId = users?._id;
          return <UserCard key={users._id} 
          term={searchTerm}
          friendId={friendId} update={handleSearch} user={users} />;
        })}
    </Box>
  );
};

export default SearchFeed;
