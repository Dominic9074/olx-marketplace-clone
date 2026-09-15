import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "./productType";
import apiClient from "../../api/apiClient";


interface ProductResponse{
    success:boolean,
    message:string,
    products:Product[];
}

interface createProductResponse{
    success:boolean,
    message:string,
    product:Product;
}

interface createProductData{
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

//get all products
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


//create a product

export const createProduct=createAsyncThunk<Product,createProductData,{rejectValue:string}>(
    '/addProduct',
    async (productData,{rejectWithValue})=>{
        try{
            const response=await apiClient.post<createProductResponse>('/addProduct',productData);

            return response.data.product
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message || 'Failed to Create Product')
        }
    }
)

//get product by id
export const getProductById=createAsyncThunk<Product,string,{rejectValue:string}>(
    '/getProductById',
    async (productId,{rejectWithValue})=>{
      try{
          const response =await apiClient.get(`/products/${productId}`)

          return response.data.product
      }catch(error:any){
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Product')
      }
    }
)

