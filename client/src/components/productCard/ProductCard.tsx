import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { deleteProduct } from "../../features/product/productThunk";
import { useAppDispatch } from "../../hooks/hooks";


interface ProductCardProps{
    isSeller?:boolean,
    title:string,
    description:string,
    category:string,
    imageUrl:string,
    price:number,
    createdAt:string,
    id?:string
}

export default function ProductCard({id,isSeller,title,description,price,imageUrl,createdAt,category}:ProductCardProps) {

   const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const navigate=useNavigate();
        const dispatch=useAppDispatch()

        //handle delete
        const handleDelete = async (id: string) => {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
          });

          if (!result.isConfirmed) {
            return;
          }

          const response = await dispatch(deleteProduct(id));

          if (deleteProduct.fulfilled.match(response)) {
            await Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted successfully.",
              icon: "success",
            });

            
          }
        };

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
                    onClick={()=>navigate(`/editProduct/${id}`)} > Edit</button>
                <button type="button" className="card-btn-action card-btn-delete"onClick={() => handleDelete(id as string)} >
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