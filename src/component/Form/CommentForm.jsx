import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const initialValues = {
  text1: "",
};

const commentSchema = yup.object().shape({
  text1: yup.string().required("enter some text to comment"),
});

const CommentForm = ({ posts }) => {
  const token = useSelector((state) => state.token);
  const postId = posts?._id;
  const handleComment = async (values, onSubmitProps) => {
    const commentPost = await fetch(
      `http://localhost:8000/post/comment/${postId}`,
      {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
             Authorization: `${token}`,
        },
        body: JSON.stringify({text1:values.text1} ),
      }
    );

    if (!commentPost) {
      console.error("error during comment on a post");
    }
    const response = await commentPost.json();
    console.log(response);
    onSubmitProps.resetForm();
  };
  const handleOnSubmit = async (values, onSubmitProps) => {
    if (handleComment) await handleComment(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={commentSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        onSubmitProps,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              type="text"
              name="text1"
              label="Enter Comment"
              value={values.text1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.text1) && Boolean(touched.text1)}
              helperText={touched.text1 && errors.text1}
            />

            <Button sx={{ mb: "11px"}}  
            type="submit" endIcon={<SendIcon sx={{}} />}>
              
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CommentForm;
