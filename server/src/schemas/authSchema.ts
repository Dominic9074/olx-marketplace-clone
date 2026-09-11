import {z} from 'zod'


export const loginSchema=z.object({
    email:z.email({error:'invalid email'}),
    password:z.string().min(6,{error:'password should contain at least 6 character'})
})

export const signUpSchema=z.object({
    name: z.string().min(3,{error: "Name should be at least 3 characters"}),

    email:z.email({error:'invalid email'}),
    password: z.string().min(6,{error: "Password should be at least 6 characters"}),
    })

