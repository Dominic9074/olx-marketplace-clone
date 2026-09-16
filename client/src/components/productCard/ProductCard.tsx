import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import apiClient from "../../api/apiClient";
import type Product from "../../types/productType";

interface ProductCardProps {
  product: Product;
  isSeller?: boolean;
}

export default function ProductCard({ product, isSeller }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/deleteProduct/${id}`);

      await Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted successfully.",
        icon: "success",
      });

      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleAddToCart = (product: Product) => {
    if (cart.items.some((item) => item.product._id === product._id)) {
      toast.error("Product Already in Cart");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  return (
    <article
      className="olx-product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="card-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="card-image"
        />

        <span className="card-category-badge">{product.category}</span>
      </div>

      <div className="card-content">
        <div className="card-main-info">
          <p className="card-price">
            ₹ {product.price.toLocaleString("en-IN")}
          </p>

          <h3 className="card-title">{product.title}</h3>

          <p className="card-description">{product.description}</p>
        </div>

        <div className="card-footer">
          <span className="card-date">{formattedDate}</span>

          {isSeller ? (
            <div className="card-actions-seller">
              <button
                type="button"
                className="card-btn-action card-btn-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/editProduct/${product._id}`);
                }}
              >
                Edit
              </button>

              <button
                type="button"
                className="card-btn-action card-btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="card-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
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
