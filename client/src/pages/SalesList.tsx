import Navbar from "../components/navbar/Navbar";
import "./SalesList.css";
import ProductCard from "../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinloader/LoadingSpinner";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type Product from "../types/productType";

export function SalesList() {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get("/products");

        setProducts(response.data.products);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.sellerId === user?.id,
  );

  return (
    <>
      <Navbar />

      <div className="my-products-container">
        <div className="my-products-header">
          <h2 className="section-title">My Listed Products</h2>

          <button
            className="sell-product-btn"
            onClick={() => navigate("/sell/product")}
          >
            + Sell Product
          </button>
        </div>

        <div className="my-products-grid">
          {loading ? (
            <LoadingSpinner fullScreen={true} size="medium" />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isSeller={true}
              />
            ))
          ) : (
            <h2>No Products Listed</h2>
          )}
        </div>
      </div>
    </>
  );
}
