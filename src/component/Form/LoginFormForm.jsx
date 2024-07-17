import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserSuccess, registerUserSuccess } from "../../state/userSlice";

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  file: "",
  bio: "",
};
const initialLoginValue = {
  email: "",
  password: "",
};

const registerSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("please enter valid email")
    .required("email required"),
  password: yup.string().required("password required"),
  bio: yup.string().required("bio required"),
  userPicture: yup.string(),
});
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("enter valid email type ")
    .required("email required"),
  password: yup.string().required("please enter password"),
});

const FormComponent = () => {
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const history = useNavigate();
  const dispatch = useDispatch();

  const register = async (values, onSubmitProps) => {
    try {
      // appending key values pairs from values to formData
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      // fetching api
      const registerUser = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: formData,
      });
      // handling success request
      const response = await registerUser.json();
      console.log(response);

      if (response) {
        setPageType("login");

        dispatch(
          registerUserSuccess({
            user: response.newUser,
          })
        );
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      // Extract email and password rom values that we can send only these two fields
      const { email, password } = values;

      const loginUser = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!loginUser.ok) {
        throw new Error("Failed to login .Please try again");
      }
      const response = await loginUser.json();
      onSubmitProps.resetForm();
      if (response) {
        dispatch(
          loginUserSuccess({
            token: response?.token,
          })
        );
        history("/home");
      }

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      if (isRegister) {
        await register(values, onSubmitProps);
      } else {
        await login(values, onSubmitProps);
      }
    } catch (error) {
      console.error("Error occured during form submission:", error);
    }
  };

  return (
    <Formik
      initialValues={isRegister ? initialRegisterValue : initialLoginValue}
      validationSchema={isRegister ? registerSchema : loginSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        onSubmitProps,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        resetForm,
      }) => (
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          target="http://localhost:8000/auth/register"
        >
          <Box
            sx={{display:"grid",
             margin:"0 auto",maxWidth:"500px",
             border:"2px solid #ccc",borderRadius:"6px",p:"20px","& > div": 
            { gridTemplateColumns: "100px 100px" } }}
            gap={"1rem"}
          >
            {isRegister && (
              <>
                <TextField
                  label="FirstName"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="lastName"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    border: "2px solid #888",
                    borderRadius: "12px",
                  }}
                >
                  <Dropzone
                    acceptedFiles={[".jpg,.jpeg,.png"]}
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      // update form field value with the dropped file
                      setFieldValue("file", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} sx={{ textAlign: "center" }}>
                        <input {...getInputProps()} />
                        {!values.file ? (
                          <p>Drag And drop some file</p>
                        ) : (
                          <p>{values.file.name}</p>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  value={values.bio}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                />
              </>
            )}

            <TextField
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Box sx={{ m: "4px 0px", p: "1rem" }}>
              <Button type="submit" fullWidth>
                {isRegister ? "Register" : "Login"}
              </Button>
            </Box>

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: "lightblue",
                "&:hover": {
                  cursor: "pointer",
                  color: "red",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormComponent;
