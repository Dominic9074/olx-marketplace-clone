import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { removeFromCart } from "../features/cart/cartSlice";


export default function CartPage() {
  const navigate = useNavigate();
  const dispatch=useAppDispatch()

    const cart=useAppSelector(state=>state.cart)

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.product.price,
        0
    );


  return (
    <div className="cart-page-bg">
      <div className="cart-content-container">
        {/* Top Action Bar */}
        <div className="cart-top-bar">
          <button
            type="button"
            className="cart-back-btn"
            onClick={() => navigate(-1)}
          >
            <svg
              className="back-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to listings</span>
          </button>

          <div className="cart-header-title-box">
            <h1 className="cart-heading">My Cart</h1>
            <span className="cart-items-badge">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="cart-main-layout">
          {/* Left Column: Horizontal Item Cards */}
          <div className="cart-items-list">
            {cart.items.length === 0 ? (
              <div className="empty-cart-card">Your cart is empty.</div>
            ) : (
              cart.items.map((item) => (
                <div key={item.product._id} className="cart-item-card">
                  <div className="cart-item-img-box">
                    <img src={item.product.imageUrl} alt={item.product.title} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-text">
                      <h3 className="cart-item-title">{item.product.title}</h3>
                      <p className="cart-item-desc">{item.product.description}</p>
                    </div>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-items-list">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="summary-item-row">
                    <span className="summary-item-name">{item.product.title}</span>
                    <span className="summary-item-value">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              <div className="summary-total-row">
                <span className="summary-total-label">Total:</span>
                <span className="summary-total-value">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                disabled={cart.items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}