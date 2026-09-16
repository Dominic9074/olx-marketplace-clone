import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    title: "Hyundai Creta 2020",
    description:
      "Hyundai Creta in excellent condition with comfortable interiors, good mileage and complete service history.",
    price: 1050000,
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Mahindra Thar 2022",
    description:
      "Mahindra Thar in excellent condition with powerful performance and stylish design. Very well maintained.",
    price: 1375000,
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80",
  },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

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
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="cart-main-layout">
          {/* Left Column: Horizontal Item Cards */}
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <div className="empty-cart-card">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img-box">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-text">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p className="cart-item-desc">{item.description}</p>
                    </div>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => handleRemove(item.id)}
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
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item-row">
                    <span className="summary-item-name">{item.title}</span>
                    <span className="summary-item-value">
                      ₹{item.price.toLocaleString("en-IN")}
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
                disabled={cartItems.length === 0}
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