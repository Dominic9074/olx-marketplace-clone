import bcrypt from 'bcryptjs'

const SALT_ROUND=10;

export const hashedPassword=async (password:string):Promise<string>=>{
    return bcrypt.hash(password,SALT_ROUND)
}

export const comparePassword=async (password:string,hashedPassword:string):Promise<boolean>=>{
    return bcrypt.compare(password,hashedPassword);
}
