import { useForm } from "react-hook-form";
import "./Signup.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { registerUser } from "../features/auth/authThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface SignUpFormInterface{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export default function Signup() {

    const {register,handleSubmit,watch,formState:{errors}}=useForm<SignUpFormInterface>()

    const {loading,error}=useAppSelector(state=>state.auth);
    const dispatch=useAppDispatch()
    const navigate=useNavigate()

    const handleSignUp=async (data:SignUpFormInterface)=>{
        const result=await dispatch(registerUser(data));

        if(registerUser.fulfilled.match(result)){
            console.log('SignUp Successful')
            toast.success('Account Created Successfully')
            navigate('/')
        }
    }

    if(error){
        console.log(error)
    }
  

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        <h2 className="signup-heading">Create Account</h2>
        <p className="signup-subtext">Join our community to start buying and selling.</p>

        {/* Signup Form */}
        <form className="signup-form" onSubmit={handleSubmit(handleSignUp)} >
          <div className="input-field-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register('name',{
                required:'name is required',
                minLength:{value:3,message:'at least 3 character are required'}
              })}
            />
            {errors.name && <p style={{ color: "red",margin:0 }}>{errors.name.message}</p>}
          </div>

          <div className="input-field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email',{
                required:'email is required',
              })}
            />
            {errors.email && <p style={{ color: "red",margin:0 }}>{errors.email.message}</p>}
          </div>

          <div className="input-field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register('password',{
                required:'password is required',
                minLength:{value:6,message:'at least 6 character are required'}
              })}
            />
            {errors.password && <p style={{ color: "red",margin:0 }}>{errors.password.message}</p>}
          </div>

          <div className="input-field-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword',{
                required:'confirm Password is required',
                validate:(value)=>value===watch('password') || 'Password Does Not Match'
              })}
            />
            {errors.confirmPassword && <p style={{ color: "red",margin:0 }}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="signup-submit-btn">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-footer">
          <span>Already have an account?</span>
          <a href="/login" className="login-account-link">Log in</a>
        </div>
      </div>
    </div>
  );
}