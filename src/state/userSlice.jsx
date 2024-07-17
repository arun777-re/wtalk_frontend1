import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  user: [],
  token: null,
  post: [],
  searchUser: [],
  following: null,
  followers: null,
  notification: [],
  error: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {
    registerUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.followers = null;
      state.following = null;
      state.searchUser = null;
      state.isAuthenticated = false;
    },
    setPost: (state, action) => {
      state.post = action.payload.post;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = true;
    },
    setSearchUser: (state, action) => {
      state.searchUser = action.payload.searchUser;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = true;
    },
    setFollowing: (state, action) => {
      state.following = action.payload.following;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    addNotification: (state, action) => {
      state.notification.push(action.payload);
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerUserSuccess,
  loginUserSuccess,
  setLogout,
  setPost,
  setSearchUser,
  setFollowing,
  setFollowers,
  setUser,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
