import Product from "../models/product";

interface createProductInterface{
    productId?:string;
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

export const getProducts=async ()=>{
    const products=await Product.find({isSold:false}).sort({createdAt:-1})

    return products;
}

//update product by id
export const updateProduct=async ({productId,title,description,price,sellerId,category,imageUrl}:createProductInterface,userId:string)=>{


    const  product=await Product.findOne({_id:productId,sellerId});

    if(!product){
        throw new Error('Product Not Found')
    }

    if(sellerId!==userId){
        throw new Error('Not Authenticated User')
    }

    product.title=title;
    product.description=description,
    product.price=price,
    product.category=category;
    product.imageUrl=imageUrl

    return product.save()

}

//Delete product by id
export const deleteProductById=async (productId:string,sellerId:string)=>{
    const product=await Product.findOneAndDelete({_id:productId,sellerId});

    if(!product){
        throw new Error('Product Not Found')
    }

    return product;

}

//get product by id 
export const getProductById=async (id:string)=>{
    const product=await Product.findById(id);

    if(!product){
        throw new Error('Product Not Found')
    }

    return product
}
