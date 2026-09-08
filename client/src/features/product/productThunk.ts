import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "./productType";
import apiClient from "../../api/apiClient";


interface ProductResponse{
    success:boolean,
    message:string,
    products:Product[];
}



export const getProducts=createAsyncThunk<Product[],void,{rejectValue:string}>(
    '/products/fetchAll',
    async(_,{rejectWithValue})=>{
        try{
            const  response=await apiClient.get<ProductResponse>('/products');

            return response.data.products
        }catch(error){
            return rejectWithValue(error instanceof Error ? error.message : 'Failed To Fetch Products')
        }
    }
)

