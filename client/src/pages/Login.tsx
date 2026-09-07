
import "./Login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="login-heading">Welcome to OLX</h2>
        <p className="login-subtext">The trusted community of buyers and sellers.</p>

        {/* Login Form */}
        <form className="login-form">
          <div className="input-field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-field-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Log In
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <a href="#register" className="create-account-link">Sign up</a>
        </div>
      </div>
    </div>
  );
}