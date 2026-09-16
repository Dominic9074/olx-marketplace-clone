import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { cartState } from "./cartTypes";
import type { Product } from "../product/productType";
import { getStoredCart,storeCart } from "./cartStorage";


const storedCart=getStoredCart()

const initialState:cartState={
    items:storedCart
}


const cartSlice=createSlice({
    name:'cart',
    initialState,
    
    reducers:{
        addToCart:(state,action:PayloadAction<Product>)=>{

            const existingItem=state.items.find(item=>item.product._id ===action.payload._id);

            if(existingItem){
                existingItem.quantity+=1;
            }else{
                state.items.push({
                    product:action.payload,
                    quantity:1
                })
            }
            storeCart(state.items)
        },
        
        removeFromCart:(state,action:PayloadAction<string>)=>{
            state.items=state.items.filter(item=>item.product._id!==action.payload)

            storeCart(state.items);
        }
    }
})

export const {addToCart,removeFromCart}=cartSlice.actions;

export default cartSlice.reducer;
