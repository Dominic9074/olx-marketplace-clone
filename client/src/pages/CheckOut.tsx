import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useAppSelector } from "../hooks/hooks";
import Swal from "sweetalert2";
import apiClient from "../api/apiClient";
import { clearCart } from "../features/cart/cartSlice";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price,
    0,
  );

  const handlePurchase = async () => {
    const result = await Swal.fire({
      title: "Complete Purchase?",
      text: "Are you sure you want to purchase these products?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, complete purchase",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const productIds = cart.items.map((item) => item.product._id);

      await apiClient.patch("/product/purchase", {
        productIds,
      });

      clearCart();

      await Swal.fire({
        title: "Purchase Complete!",
        text: "Your purchase was completed successfully.",
        icon: "success",
      });

      navigate("/");
    } catch (error: any) {
      Swal.fire({
        title: "Purchase Failed",
        text: error.response?.data?.message || "Failed to complete purchase",
        icon: "error",
      });
    }
  };

  return (
    <div className="cart-page-bg">
      <div className="cart-content-container">
        <div className="cart-top-bar">
          <button
            type="button"
            className="cart-back-btn"
            onClick={() => navigate(-1)}
          >
            Back to Cart
          </button>

          <div className="cart-header-title-box">
            <h1 className="cart-heading">My Checkout</h1>

            <span className="cart-items-badge">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="cart-main-layout">
          <div className="cart-items-list">
            {cart.items.length === 0 ? (
              <div className="empty-cart-card">Your checkout is empty.</div>
            ) : (
              cart.items.map((item) => (
                <div key={item.product._id} className="cart-item-card">
                  <div className="cart-item-img-box">
                    <img src={item.product.imageUrl} alt={item.product.title} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-text">
                      <h3 className="cart-item-title">{item.product.title}</h3>

                      <p className="cart-item-desc">
                        {item.product.description}
                      </p>
                    </div>

                    <div className="cart-item-bottom">
                      <span className="cart-item-price">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-items-list">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="summary-item-row">
                    <span className="summary-item-name">
                      {item.product.title}
                    </span>

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
                onClick={handlePurchase}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
