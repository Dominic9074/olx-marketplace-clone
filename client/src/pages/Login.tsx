import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../features/auth/authThunk";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

interface userFormInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormInterface>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const handleLogin = async (data: userFormInterface) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successful");
      navigate("/");
    }
  };

  const lastError = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== lastError.current) {
      toast.error(error);
      lastError.current = error;
    }
  }, [error]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-heading">Welcome to OLX</h2>
        <p className="login-subtext">
          The trusted community of buyers and sellers.
        </p>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="input-field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>
            )}
          </div>

          <div className="input-field-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password should contain at least 6 character",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red", margin: 0 }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="login-submit-btn">
            Log In
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <a href="/signup" className="create-account-link">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
