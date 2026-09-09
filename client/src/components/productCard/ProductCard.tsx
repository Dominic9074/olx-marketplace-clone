import "./ProductCard.css";

export default function ProductCard() {
  return (
    <article className="olx-product-card">
      <div className="card-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
          alt="Product preview"
          className="card-image"
        />
        <span className="card-category-badge">Electronics</span>
      </div>

      <div className="card-content">
        <div className="card-main-info">
          <p className="card-price">₹ 24,999</p>
          <h3 className="card-title">iPhone 12 - 128 GB Mint Condition</h3>
          <p className="card-description">
            Well maintained and in excellent working condition. All original accessories and bill available.
          </p>
        </div>

        <div className="card-footer">
          <span className="card-date">2 days ago</span>
          <button type="button" className="card-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}