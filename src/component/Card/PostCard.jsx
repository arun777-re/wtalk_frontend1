import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, Divider, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useSelector } from "react-redux";
import CommentForm from "../Form/CommentForm";
const PostCard = ({ posts, postId, update }) => {
  const [liked, setLiked] = useState(false);
  const [unlike, setUnlike] = useState(false);

  const token = useSelector((state) => state.token);
  console.log(postId);
  const handleLike = async () => {
    try {
      const likePost = await fetch(
        `http://localhost:8000/post/like/${postId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!likePost) {
        console.error("There is an error during like Post");
      }

      const response = await likePost.json();
      console.log(response);
      update();
      setLiked(true);
    } catch (error) {}
  };
  const handleUnlike = async () => {
    try {
      const unlikePost = await fetch(
        `http://localhost:8000/post/dislike/${postId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (!unlikePost) {
        console.error("error during unlike post");
      }
      const response = await unlikePost.json();
      console.log(response);
      setUnlike(true);
      update();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      key={posts._id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "400px",
        width: "60%",
        bgcolor: "white",
      }}
    >
       <CardContent
    
     >
        <img
          style={{
            height: "100%",
            maxWidth: "350px",
            objectFit:"cover"
          }}
          src={posts?.imageUrl[0]}
          alt="postImage"
        />

        </CardContent>
        <Divider sx={{bgcolor:"#333"}}/>
        <CardActions sx={{display:"flex",flexDirection:"column"}}>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection:"row",
            justifyContent: "space-between",
            pt:"8px",
            gap:"68px"
          }}
        >
          <IconButton
            sx={{ color: liked ? "B2EBF2" : "inherit" }}
            onClick={handleLike}
          >
            <ThumbUpOffAltIcon
              style={{ cursor: "pointer" }}
              sx={{ fontSize: "24px" }}
            />
            {posts?.likes.length}
          </IconButton>
          <IconButton
            sx={{ color: unlike ? "B2EBF2" : "inherit" }}
            onClick={handleUnlike}
          >
            <ThumbDownOffAltIcon
              style={{ cursor: "pointer" }}
              sx={{ fontSize: "24px" }}
            />
            {posts?.dislike?.length}
          </IconButton>
        </Box>

          <Box sx={{display:"flex",
            flexDirection:"column",
            alignItems:"flex-end",
            mt:"3rem"
          }}>
            <CommentForm posts={posts} />
            <Typography sx={{color: "#ccc",p:"30px"}}>
              Comments :&nbsp;{posts?.comments?.length}
            </Typography>
          </Box>
          
     
        <Typography
          variant="h5"
          sx={{
            pt:"20px",
            fontSize: "17px",
            color: "#ccc",
            
          }}
        >
          {posts?.description}
        </Typography>
        </CardActions>

    </Card>
  );
};

export default PostCard;
