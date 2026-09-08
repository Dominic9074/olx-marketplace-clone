import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./productType";
import { getProducts } from "./productThunk";

interface initialStateInterface{
    products:Product[]|null;
    loading:boolean,
    error:string |null,
}

const initialState:initialStateInterface={
    products:null,
    loading:false,
    error:null
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
    }
})



export default productSlice.reducer;
