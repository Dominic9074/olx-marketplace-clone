import { model,Schema,type Document } from "mongoose";


interface ProductInterface extends Document{
    title:string,
    description:string;
    price:number;
    category:string;
    sellerId:string;
    imageUrl:string;
    isSold:boolean;
}


const productSchema = new Schema<ProductInterface>({
    title:{
        required:true,
        type:String,
        trim:true
    },
    description:{
         required:true,
         type:String,
         trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    sellerId:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    imageUrl:{
        type:String,
        required:true,
        trim:true
    },
    isSold:{
        type:Boolean,
        default:false
    }
})


const Product=model<ProductInterface>('Product',productSchema)

export default Product;

