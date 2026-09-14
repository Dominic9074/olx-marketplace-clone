import { loginSchema, signUpSchema } from "../schemas/authSchema";
import { registerUser,loginUser } from "../services/authService";
import type { Request,Response } from "express";




export const register=async (req:Request,res:Response):Promise<void>=>{

    try{
        const {name,email,password}=req.body

        const result=signUpSchema.safeParse(req.body)

        if(!result.success){
             res.status(400).json({
                success:false,
                message:'authentication failed',
                error:result.error.issues
            })
            return;
        }

        const user=await registerUser({name,email,password})

        res.status(201).json({
            success:true,
            message:'User Created Successfully',
            user
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error instanceof Error ? error.message : 'Registration Failed'
        })
    } 

}

//login
export const login=async (req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password}=req.body;
        
        const result=loginSchema.safeParse(req.body);

        if(!result.success){
             res.status(400).json({
                success:false,
                message:'authentication failed',
                error:result.error.issues
            })
            return;
        }

        const {user,token}=await loginUser({email,password});

        res.status(200).json({
            success:true,
            message:'User LoggedIn Successfully',
            user,
            token
        })

    }catch(error){
        res.status(401).json({
            success:false,
            message:error instanceof Error ? error.message : 'Login Failed'
        })
    }
}
