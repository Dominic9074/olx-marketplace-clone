import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./productType";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./productThunk";

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
    reducers:{
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
        }
    },
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
                state.product=null
            })
            .addCase(getProductById.fulfilled,(state,action)=>{
                state.loading=false,
                state.error=null;
                state.product=action.payload
            })
            .addCase(getProductById.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload ?? 'Failed to Fetch Product'
                state.product=null
            })
            //edit product 
            .addCase(updateProduct.pending, (state) => {
                    state.loading = true;
                    state.error = null;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                    state.loading = false;
                    state.product = action.payload.product;
                    state.error = null;
            })

            .addCase(updateProduct.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload ?? "Failed to update product";
            })
                
            //delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state,action) => {
                state.loading = false;
                if (state.products) {
                    state.products = state.products.filter(
                        product => product._id !== action.meta.arg
                    );
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to delete product";
            })
    }
})



export default productSlice.reducer;
export const { clearProduct } = productSlice.actions;
