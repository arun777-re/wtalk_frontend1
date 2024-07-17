import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
CircularProgress
} from "@mui/material";

import { setPost } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import PostCard from "../../component/Card/PostCard.jsx";

const Home = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    // api to get all the posts related to user and his followings
    const posts = await fetch("http://localhost:8000/post/posts", {
      method: "GET",
      headers: { Authorization: `${token}` },
    });

    if (!posts.ok) {
      throw new Error("error during fetch posts");
    }
    const response = await posts.json();
    console.log(response);
    dispatch(
      setPost({
        post: response,
      })
    );
    setLoading(false)
  };
  useState(() => {
    getAllPosts();
  }, []);
  const post = useSelector((state) => state.post);
  console.log(post);
  return (
    <Box
      sx={{
        display: "flex",
        top: "40px",
        height:"auto",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        overflowY:"auto",
        scrollBehavior:"smooth",
        padding:"20px"
      }}
    >
      {loading && (
        <CircularProgress sx={{color:"#888"}}/>
      )}
      {post &&
        Array.isArray(post) &&
        post?.map((posts) => {
          const postId = posts._id;
          return <PostCard key={posts?._id} update={getAllPosts} postId={postId} posts={posts} />;
        })}
    </Box>
  );
};

export default Home;
