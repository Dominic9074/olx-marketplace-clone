import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { deleteProduct } from "../../features/product/productThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import type { Product } from "../../features/product/productType";
import { toast } from "react-toastify";


interface ProductCardProps {
    product: Product;
    isSeller?: boolean;
}


export default function ProductCard({product,isSeller}:ProductCardProps) {

   const formattedDate = new Date(product.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const navigate=useNavigate();
        const dispatch=useAppDispatch()
        const cart=useAppSelector(state=>state.cart)

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

        const handleAddToCart=(product:Product)=>{
          if(cart.items.some(item => item.product._id === product._id)){
            toast.error('Product Already in Cart');
            return;
          }
          dispatch(addToCart(product))
          toast.success("Product added to cart");
        }

  return (
    <article className="olx-product-card" onClick={()=>navigate(`/product/${product._id}`)} >
      <div className="card-image-wrapper">
        <img
          src={product.imageUrl}
          alt="Product preview"
          className="card-image"
        />
        <span className="card-category-badge">{product.category}</span>
      </div>

      <div className="card-content">
        <div className="card-main-info">
          <p className="card-price">₹ {product.price}</p>
          <h3 className="card-title">{product.title}</h3>
          <p className="card-description">
            {product.description}
          </p>
        </div>

        <div className="card-footer">
          <span className="card-date">{formattedDate}</span>
          {isSeller ? (<div className="card-actions-seller">
                <button type="button" className="card-btn-action card-btn-edit"
                    onClick={()=>navigate(`/editProduct/${product._id}`)} > Edit</button>
                <button type="button" className="card-btn-action card-btn-delete"onClick={() => handleDelete(product._id as string)} >
                    Delete</button>
            </div>
            ) : (
            <button
                type="button"
                className="card-cart-btn"
                onClick={(e) => {e.stopPropagation(); handleAddToCart(product)}}>
                Add to Cart
            </button>
            )}
        </div>
      </div>
    </article>
  );
}