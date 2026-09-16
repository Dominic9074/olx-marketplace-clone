import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LoadingSpinner from "../components/spinloader/LoadingSpinner";
import { toast } from "react-toastify";
import { addToCart } from "../features/cart/cartSlice";
import apiClient from "../api/apiClient";
import type Product from "../types/productType";

export default function ProductDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);

                const response = await apiClient.get(`/products/${id}`);

                setProduct(response.data.product);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch product"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const alreadyInCart = cart.items.some(
            (item) => item.product._id === product._id
        );

        if (alreadyInCart) {
            toast.error("Product Already in Cart");
            return;
        }

        dispatch(addToCart(product));
        toast.success("Product added to cart");
    };

    return (
        <>
            {loading && (
                <LoadingSpinner
                    fullScreen
                    size="medium"
                />
            )}

            <Navbar />

            <div className="product-details-container">

                <button
                    type="button"
                    className="details-back-link"
                    onClick={() => navigate(-1)}
                >
                    <svg
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

                {product && (
                    <div className="details-layout">

                        <div className="details-image-side">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                            />
                        </div>

                        <div className="details-info-side">

                            <div className="details-meta-row">
                                <span className="details-badge">
                                    {product.category}
                                </span>

                                <span className="details-date">
                                    Posted on {product.createdAt}
                                </span>
                            </div>

                            <h1 className="details-title">
                                {product.title}
                            </h1>

                            <div className="details-price">
                                ₹{product.price.toLocaleString("en-IN")}
                            </div>

                            <div className="details-description-box">
                                <h4>Overview & Description</h4>
                                <p>{product.description}</p>
                            </div>

                            <button
                                type="button"
                                className="details-add-btn"
                                onClick={handleAddToCart}
                            >
                                <span>Add to Cart</span>
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
}