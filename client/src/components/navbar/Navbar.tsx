import { useAppSelector } from "../../hooks/hooks";
import "./Navbar.css";

export default function Navbar() {

  const {isAuthenticated}=useAppSelector(state=>state.auth)

  return (
    <nav className="olx-navbar">
      <div className="navbar-container">
        {/* Left: OLX Logo */}
        <div className="navbar-logo">
          <h2>OLX</h2>
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          {/* Wishlist */}
          <button className="nav-item-btn">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="nav-label">Wishlist</span>
          </button>

          {/* Login */}
          {isAuthenticated ? (
            <button className="nav-item-btn" >
              <svg
                className="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="nav-label">Logout</span>
            </button>
          ) : (
            <button className="nav-item-btn">
              <svg
                className="nav-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="nav-label">Login</span>
            </button>
          )}

          {/* Sell Button with Multi-Color Border */}
          <button className="sell-btn">
            <span className="sell-icon">+</span>
            <span className="sell-text">SELL</span>
          </button>
        </div>
      </div>
    </nav>
  );
}