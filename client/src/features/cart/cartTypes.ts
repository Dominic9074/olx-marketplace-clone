import  type {Product} from '../product/productType'


export interface cartItem{
    product:Product,
    quantity:number
}

export interface cartState{
    items:cartItem[];
}
