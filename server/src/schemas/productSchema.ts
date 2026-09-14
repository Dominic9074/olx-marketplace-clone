import {z} from 'zod'

const productSchema =z.object({
    title:z.string().min(3,'title Should Be At least 3 Character').max(30,{error:'title should not contain more than 30 character'}),
    description:z.string().min(15,'title Should Be At least 15 Character').max(200,{error:'title should not contain more than 200 character'}),
    price:z.number().min(10,{error:'price should be at least 2 digit number'}),
    category:z.string().min(1,{error:'category is required'}),
    imageUrl:z.url({error:'invalid image url'})
})

export default productSchema
