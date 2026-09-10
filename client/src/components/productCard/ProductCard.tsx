import "./ProductCard.css";

interface ProductCardProps{
    isSeller?:boolean,
    title:string,
    description:string,
    category:string,
    imageUrl:string,
    price:number,
    createdAt:string
}

export default function ProductCard({isSeller,title,description,price,imageUrl,createdAt,category}:ProductCardProps) {

   const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

  return (
    <article className="olx-product-card">
      <div className="card-image-wrapper">
        <img
          src={imageUrl}
          alt="Product preview"
          className="card-image"
        />
        <span className="card-category-badge">{category}</span>
      </div>

      <div className="card-content">
        <div className="card-main-info">
          <p className="card-price">₹ {price}</p>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">
            {description}
          </p>
        </div>

        <div className="card-footer">
          <span className="card-date">{formattedDate}</span>
          {isSeller ? (<div className="card-actions-seller">
                <button type="button" className="card-btn-action card-btn-edit"
                    onClick={(e) => {e.stopPropagation()}}> Edit</button>
                <button type="button" className="card-btn-action card-btn-delete"onClick={(e) => { e.stopPropagation(); }} >
                    Delete</button>
            </div>
            ) : (
            <button
                type="button"
                className="card-cart-btn"
                onClick={(e) => {
                e.stopPropagation();
                
                }}
            >
                Add to Cart
            </button>
            )}
        </div>
      </div>
    </article>
  );
}