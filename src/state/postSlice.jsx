import {createSlice} from '@reduxjs/toolkit';
import userSlice from './userSlice';


const initialState = {
    post:[],
    error:null,
    loading:false,
    isAuthenticated:false

}


const postSlice = createSlice({
    name:"post",
      initialState:initialState,
      reducers:{
        registerPost:(state,action)=>{
            const {post,user} = action.payload;
            state.post = post;
            state.error = null;
            state.isAuthenticated = true;
            state.loading = false;
        }
      }
});


export const {registerPost} = postSlice.actions;

export default postSlice.reducer;