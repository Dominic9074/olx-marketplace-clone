import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authType";
import { loginUser, registerUser } from "./authThunk";
import { getStoredAuth } from "./authStorage";

const storedAuth=getStoredAuth();
const initialState : AuthState={
    user:storedAuth?.user ??null ,
    token:storedAuth?.token ??null,
    isAuthenticated:!!storedAuth?.token,
    loading:false,
    error:null
}


const saveAuthToken=(user:AuthState['user'],token:string | null)=>{
    localStorage.setItem('auth',JSON.stringify({user,token}))
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

            localStorage.removeItem('auth')
        },
    },
    extraReducers:(builder)=>{
        builder

            //LOGIN
            .addCase(loginUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading=false,
                state.user=action.payload.user;
                state.token=action.payload.token ?? null;
                state.isAuthenticated=true;
                state.error=null;
                //localstorage token save
                saveAuthToken(action.payload.user,action.payload.token ?? null)
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.error=action.payload ?? 'Login Failed'
            })

            //register
            .addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload.user;
                state.error=null;
                state.isAuthenticated=true;
                state.token=action.payload.token ?? null;
                //localstorage token save
                saveAuthToken(action.payload.user,action.payload.token ?? null)
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.error=action.payload ?? 'Signup Failed'
            })
    }
})


export const {logout}= authSlice.actions;
export default authSlice.reducer;

