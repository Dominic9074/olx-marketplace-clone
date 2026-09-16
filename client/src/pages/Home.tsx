import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import ProductCard from "../components/productCard/ProductCard";
import "./Home.css";
import apiClient from "../api/apiClient";
import LoadingSpinner from "../components/spinloader/LoadingSpinner";
import { toast } from "react-toastify";
import type Product from "../types/productType";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />

      <div className="productSection">
        <div className="product-section-header">
          <h2 className="section-title">Fresh Recommendations</h2>

          <div className="category-select-wrapper">
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics & Appliances</option>
              <option value="mobiles">Mobile Phones</option>
              <option value="cars">Cars & Vehicles</option>
              <option value="bikes">Motorcycles & Scooters</option>
              <option value="furniture">Home & Furniture</option>
              <option value="fashion">Fashion & Lifestyle</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <h2>No Product Listed</h2>
        )}
      </div>
    </>
  );
}
