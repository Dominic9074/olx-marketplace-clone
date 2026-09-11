import {z} from 'zod'

const productSchema =z.object({
    title:z.string().min(3,'title Should Be At least 3 Character').max(30,'title should not contain more than 30 character'),
    description:z.string().min(15,'title Should Be At least 15 Character').max(200,'title should not contain more than 200 character'),
    price:z.number().min(10,'price should be at least 2 digit number'),
    category:z.string().min(1,'category is required'),
    imageUrl:z.string().url('invalid image url')
})

export default productSchema
