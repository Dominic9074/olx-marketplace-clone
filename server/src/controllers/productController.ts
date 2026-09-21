import { completePurchase, createProduct, deleteProductById, getProductById, getProducts, updateProduct } from "../services/productService";
import { Request,Response } from "express";
import productSchema from "../schemas/productSchema";
import { success } from "zod";

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
      console.log(result)

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
         success:false,
         message:error instanceof Error ? error.message :'Failed To Update Product'
      })
   }
}


//delete product

export const deleteProductController=async (req:Request,res:Response)=>{
   try{

      if(!req.userId){
         res.status(400).json({
            success:false,
            message:'Authentication Required'
         })
         return;
      }

      const {id}=req.params;

      await deleteProductById(id as string,req.userId);

      res.status(200).json({
         success:false,
         message:'Product Deleted Successfully'
      })


   }catch(error){
      res.status(400).json({
         success:false,
         message:error instanceof Error ? error.message :'Failed To delete Product'
      })

   }
}

//get product by id 
export const getProductByIdController=async (req:Request,res:Response)=>{
   try{
      const {id}=req.params;

      if(!id){
         res.status(400).json({
            success:false,
            message:'Product Id Is Required'
         })
         return
      }
      const product=await getProductById(id as string);

      if(!product){
         return res.status(404).json({
                success: false,
                message: "Product not found"
            });
      }

       return res.status(200).json({
            success: true,
            product
        });
   }catch(error){
      return res.status(400).json({
            success: false,
            message:error instanceof Error ? error.message : "Failed to fetch product"
        });
   }

}


//complete purchase controller 
export const completePurchaseController=async (req:Request,res:Response)=>{
   try{
      if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      res.status(400).json({
        success: false,
        message: "Product IDs are required",
      });
      return;
    }

    const result = await completePurchase(
      productIds
    );

    res.status(200).json({
      success: true,
      message: "Purchase completed successfully",
      result,
    });
   }catch(error){
      res.status(400).json({
         success: false,
         message: error instanceof Error
            ? error.message
            : "Failed to complete purchase",
      });
      }
}