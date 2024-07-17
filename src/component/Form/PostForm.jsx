import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { resolvePath, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { TextField, Box, Button } from "@mui/material";
import { setPost } from "../../state/userSlice";

const initialPostValue = {
  description: "",
  imageUrl: "",
  videoUrl: "",
};

const postSchema = yup.object().shape({
  description: yup.string().required("required field"),
  imageUrl: yup.string().required("imageurl is required"),
  videoUrl: yup.string().required("field is required"),
});

const PostFormm = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("imageUrl", values.imageUrl);
      formData.append("videoUrl", values.videoUrl);
      const post = await fetch("http://localhost:8000/post/create", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      const response = await post.json();
      console.log(response);
      if (response) {
        navigate("/home");
        dispatch(
          setPost({
            post: response.newPost,
          })
        );
      }
    } catch (error) {
      console.error("Frontend Error:", error);
    }
  };
  const handleOnSubmit = async (values, onSubmitProps) => {
    await fetchPost(values, onSubmitProps);
  };
  return (
    <Formik
      initialValues={initialPostValue}
      validationSchema={postSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue,
      }) => (
        <form
          action="/uploads"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Box
          component={'div'}
            sx={{
              display:"grid",
              gridTemplateColumns:"2fr",
              gap:"20px",
              maxWidth:"400px",
              margin:"0 auto",
              padding:"20px",
              border:"1px solid #ccc",
              borderRadius:"5px"

            }}
            gap="1rem"
          >
            <TextField
              label="Description"
              type="text"
              name="description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
            />
          
              <Dropzone
                accept={[".png", ".jpg", ".jpeg"]}
                onDrop={(acceptedFile) =>
                  setFieldValue("imageUrl", acceptedFile[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    sx={{
                      cursor: "pointer",
                     padding:"15px",
                      border: "2px dashed #333",
                      color:"#888",
                      textAlign:"center"
                    }}
                  >
                    <input {...getInputProps()} />
                    {!values.imageUrl ? (
                      <p>Post any Image here</p>
                    ):(
                      <p>{values.imageUrl.name}</p>
                    )

                    }
                  </Box>
                )}
              </Dropzone>
     
              <Dropzone
                accept={".mp4"}
                onDrop={(acceptedFile) =>
                  setFieldValue("videoUrl", acceptedFile[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    sx={{
                      cursor: "pointer",
                     padding:"15px",
                      border: "2px dashed #333",
                      color:"#888",
                      textAlign:"center"
                    }}
                  >
                    <input {...getInputProps()} />
                    {!values.videoUrl ? (
                      <p>Post any video here</p>
                    ) : (
            <p>{values.videoUrl.name}</p>
                    )}
                  </Box>
                )}
              </Dropzone>

            <Button type="submit">Post</Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PostFormm;
