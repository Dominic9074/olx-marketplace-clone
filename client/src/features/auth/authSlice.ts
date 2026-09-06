import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authType";

const initialState : AuthState={
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false,
    error:null
}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null,
            state.token=null,
            state.isAuthenticated=false,
            state.error=null
        },
    }
})


export const {logout}= authSlice.actions;
export default authSlice.reducer;

