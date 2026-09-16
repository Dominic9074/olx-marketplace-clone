import type { cartItem } from "./cartTypes";


export const getStoredCart=():cartItem[]=>{
    const storedCart=localStorage.getItem('cart');

    if(!storedCart){
        return[]
    };

    return JSON.parse(storedCart)
}

export const storeCart=(items:cartItem[])=>{
    localStorage.setItem('cart',JSON.stringify(items))
}

