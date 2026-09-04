import  express from "express";
import cors from 'cors'
import 'dotenv/config'

import { connectDB } from "./config/db";


const app =express()

app.use(cors());
app.use(express.json())


app.get('/',(_req,res)=>[
    res.json({
        success:true,
        message:'OLX API is running'
    })
])

const PORT=process.env.PORT || 5000

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on https://localhost:${PORT}`)
    })
})


