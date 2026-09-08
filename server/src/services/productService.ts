import Product from "../models/Product";

interface createProductInterface{
    title:string,
    description:string;
    price:number;
    category:string;
    sellerId:string;
    imageUrl:string;
}

export const createProduct=async ({title,description,price,sellerId,category,imageUrl}:createProductInterface)=>{
    const product=await Product.create({title,description,price,sellerId,category,imageUrl});

    return product;
}




