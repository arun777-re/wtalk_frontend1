import React, { useState, useCallback, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

const initialValues = {
  chatName: "",
  users: [],
};

const chatSchema = yup.object().shape({
  chatName: yup.string().required("Chat name is required"),
  users: yup.array().min(2, "Please Select atleast one user"),
});
const GroupChatForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([]);
const url = `http://localhost:8000`;

  console.log(searchTerm);
  const token = useSelector((state) => state.token);
  console.log(token);

  const SearchUsers = useCallback(async () => {
    try {
      if (!searchTerm || !token) {
        return;
      }
      const allUsers = await fetch(
        `${url}/user/searchuser?${searchTerm}`,
        {
          method: "GET",
          headers: { Authorization: `${token}` },
        }
      );
      console.log(allUsers);
      if (!allUsers.ok) {
        console.log("errors during fetch searchfeed");
      }
      const response = await allUsers.json();
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  }, [token, searchTerm]);

  useEffect(() => {
    SearchUsers();
  }, [token, searchTerm]);

// create chat room

const createChatRoom = useCallback(async(values,onSubmitProps)=>{
  try {
   
      
    const chatRoom = await fetch(`${url}/chat/groupchat`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`${token}`
      },
      body:JSON.stringify({
        name:values.chatName,
        users:values.users
      }),
    });

    if(!chatRoom.ok){
      console.log("error comes during create group chat room")
      return;
    }
    
    const response = await chatRoom.json();
    console.log(response);

  } catch (error) {
    console.error(error)
  }
},[token]);

const handleOnSubmit = async(values,onSubmitProps)=>{
    await createChatRoom(values,onSubmitProps);
    onSubmitProps.resetForm();
}

  return (
    <Formik initialValues={initialValues}
     validationSchema={chatSchema}
     onSubmit={handleOnSubmit}>
      {({
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        values,
      }) => (
        <form onSubmit={handleSubmit} 
        method="POST" 
        >
          <Box component={'div'}
          display={"grid"}
          margin={"0 auto"}
          >
            <TextField
              label="ChatName"
              fullWidth
              name="chatName"
              value={values.chatName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.chatName) && Boolean(errors.chatName)}
              helperText={touched.chatName && errors.chatName}
            />
            <TextField
              label="Search Users"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {user &&
              Array.isArray(user) &&
              user.length > 0 &&
              user?.map((searchvalue) => {
                return (
                  <FormControlLabel sx={{
                    maxHeight:"inherit"
                  }}
                    key={searchvalue?._id}
                    control={
                      <Checkbox
                        checked={values.users.includes(searchvalue?._id)}
                        onChange={(e) => {
                          const selectedUserId = searchvalue?._id;
                          const isChecked = e.target.checked;
                          handleChange({
                            target: {
                              name: "users",
                              value: isChecked
                                ? [...values.users, selectedUserId]
                                : values.users.filter(
                                    (id) => id !== selectedUserId
                                  ),
                            },
                          });
                        }}
                      />
                    }
                    label={searchvalue.firstName}
                  />
                );
              })}

            <Button type="submit"
       
            variant="contained" color="primary">
              Create Chat
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default GroupChatForm;
