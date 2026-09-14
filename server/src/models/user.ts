import {Schema,model,type Document} from 'mongoose'


export interface UserInterface extends Document {
    name:string,
    email:string;
    password:string;
}

const userSchema=new Schema<UserInterface>(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        }
    },{timestamps:true}
)

const User=model<UserInterface>('User',userSchema);

export default User;
