import  type {Product} from '../product/productType'


export interface cartItem{
    product:Product,
}

export interface cartState{
    items:cartItem[];
}
