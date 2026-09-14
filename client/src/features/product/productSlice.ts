import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./productType";
import { createProduct, getProductById, getProducts } from "./productThunk";

interface initialStateInterface{
    products:Product[]|null;
    loading:boolean,
    error:string |null,
    product:Product |null
}

const initialState:initialStateInterface={
    products:null,
    loading:false,
    error:null,
    product:null
}


const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProducts.pending,(state)=>{
                state.loading=true,
                state.error=null;
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
                state.loading=false,
                state.error=null;
                state.products=action.payload
            })
            .addCase(getProducts.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.payload ?? 'Failed to Fetch Products';
            })
            //createProduct
            .addCase(createProduct.pending,(state)=>{
                state.loading=true,
                state.error=null;
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.products?.unshift(action.payload);
                state.error=null;
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.payload ?? 'Failed to create Product'
            })
            //get product by id
            .addCase(getProductById.pending,(state)=>{
                state.loading=true,
                state.error=null;
            })
            .addCase(getProductById.fulfilled,(state,action)=>{
                state.loading=false,
                state.error=null;
                state.product=action.payload
            })
            .addCase(getProductById.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload ?? 'Failed to Fetch Product'
            })
    }
})



export default productSlice.reducer;
