import { createProduct, getProducts, updateProduct } from "../services/productService";
import { Request,Response } from "express";
import productSchema from "../schemas/productSchema";

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

     const result=productSchema.safeParse(req.body)

     if(!result.success){
         return res.status(400).json({
            success:false,
            message:'validation Failed',
            error:result.error.issues 
         })
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
        message:'Products fetched Successfully',
        products
     })

   }catch(error){
    res.status(500).json({
        success:false,
        message:error instanceof Error ? error.message : 'Product Fetch failed'
    })
   }
    

}


export const updateProductController=async (req:Request,res:Response)=>{
   try{

      if(!req.userId){
         res.status(401).json({
            success:false,
            message:'authentication required'
         })
         return
      }

      const {id}=req.params;

      const result=productSchema.safeParse(req.body)

      if(!result.success){
         res.status(400).json({
            success:false,
            message:'validation failed'
         })
         return;
      }

      const product=await updateProduct({productId:id as string,...req.body},req.userId);

      res.status(200).json({
         success:true,
         message:'product updated successfully',
         product
      })

   }catch(error){
      res.status(400).json({
         success:"false",
         message:error instanceof Error ? error.message :'failed to update product'
      })
   }
}
