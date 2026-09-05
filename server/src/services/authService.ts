import { compare } from 'bcryptjs';
import User from '../models/user'
import { hashedPassword,comparePassword } from '../utils/password'

interface RegisterInterface{
    name:string,
    email:string,
    password:string;
}

interface LoginInterface{
    email:string,
    password:string;
}

//register
export const registerUser=async ({name,email,password}:RegisterInterface)=>{
    const existingUser=await User.findOne({email})

    if(existingUser){
        throw new Error('Email Already exist')
    }

    const hashPassword=await hashedPassword(password)

    const user=await User.create({
        name,
        email,
        password:hashPassword
    })

    return {
        id:user._id,
        email:user.email,
        name:user.name
    }

}


//login
export const loginUser=async ({email,password}:LoginInterface)=>{
    const existingUser=await User.findOne({email});

    if(!existingUser){
        throw new Error('Email or Password are Incorrect')
    }

    const passwordMatches=await comparePassword(password,existingUser.password)

    if(!passwordMatches){
        throw new Error('Email or Password are Incorrect')
    }   

    return {
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email
    }
}

