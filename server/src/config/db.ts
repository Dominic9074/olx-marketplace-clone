import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB=async ():Promise<void>=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('mongodb connected')
    }catch(error){
        console.error('mongodb connection failed', error);
        process.exit(1)
    }
}


