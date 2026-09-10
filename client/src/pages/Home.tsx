import { useEffect } from "react"
import Navbar from "../components/navbar/Navbar"
import ProductCard from "../components/productCard/ProductCard"
import './Home.css'
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { getProducts } from "../features/product/productThunk"
import LoadingSpinner from "../components/spinloader/LoadingSpinner"
import { toast } from "react-toastify"

export default function Home(){

    const dispatch=useAppDispatch();

    const {products,loading,error}=useAppSelector(state=>state.product)

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    if (error){
        toast.error(error)
    }
    return (
        <>
            <Navbar />
            <div className="productSection">
            
            <div className="product-section-header">
                <h2 className="section-title">Fresh Recommendations</h2>

                <div className="category-select-wrapper">
                <select className="category-select" defaultValue="all">
                    <option value="all">All Categories</option>
                    <option value="cars">Cars</option>
                    <option value="motorcycles">Motorcycles</option>
                    <option value="mobile-phones">Mobile Phones</option>
                    <option value="electronics">Electronics & Appliances</option>
                    <option value="commercial-vehicles">Commercial Vehicles</option>
                    <option value="furniture">Furniture</option>
                </select>
                </div>
            </div>

            {/* Product Grid / List */}
            {loading ? (
                <LoadingSpinner/>
            ) : products && products.length > 0 ? (
                <div className="product-grid">
                <ProductCard />
                </div>
            ) : (
                <h2>No Product Listed</h2>
            )}
            </div>
        </>
    )
}


