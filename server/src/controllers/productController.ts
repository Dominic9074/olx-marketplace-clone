import { createProduct, getProducts } from "../services/productService";
import { Request,Response } from "express";

export const createProductController=async (req:Request,res:Response)=>{
   try{
     const {title,description,price,category,imageUrl}=req.body

     if(!req.userId){
        res.status(401).json({
            success:false,
            message:'Authentication Required'
        });
        return;
     }

     const product=await createProduct({title,description,price,category,imageUrl,sellerId:req.userId});

     res.status(201).json({
        success:true,
        message:'Product Created Successfully',
        product
     })

   }catch(error){
     res.status(400).json({
        success:false,
        message:error instanceof Error ? error.message : 'Failed to create Product'
     })
   }
}

export const getProductsController=async (req:Request,res:Response)=>{

   try{
     const products=await getProducts();

     res.status(200).json({
        success:true,
        message:'Products fetched Successfully'
     })

   }catch(error){
    res.status(500).json({
        success:false,
        message:error instanceof Error ? error.message : 'Product Fetch failed'
    })
   }
    

}

