import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "./authType";
import apiClient from "../../api/apiClient";

interface LoginCredential{
    email:string,
    password:string;
}

interface AuthResponse{
    success:boolean,
    user:User;
    token?:string;
}

interface registerCredential{
    name:string,
    email:string,
    password:string,
}

export const loginUser=createAsyncThunk<AuthResponse,LoginCredential,{rejectValue:string}>(
    '/login',
    async (Credentials,{rejectWithValue})=>{
        try{
            const response =await apiClient.post<AuthResponse>('/login',Credentials)

            return response.data
        }catch(error :any){
            return rejectWithValue(
                error.response?.data?.message || 'Login Failed'
            )
        }
    }
)

export const registerUser=createAsyncThunk<AuthResponse,registerCredential,{rejectValue:string}>(
    '/signup',
    async (userData,{rejectWithValue})=>{
         try{
            const response=await apiClient.post<AuthResponse>('/signup',userData);
            return response.data;
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message || 'SignUp Failed')
        }
    }
)

