import Navbar from "../components/navbar/Navbar";
import './SalesList.css'
import ProductCard from "../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";

export function SalesList(){
    const navigate=useNavigate()
    return (
        <>
            <Navbar/>
            <div className="my-products-container">
            {/* Header: Title on the left, Sell button on the right */}
            <div className="my-products-header">
                <h2 className="section-title">My Listed Products</h2>
                <button className="sell-product-btn" onClick={()=>navigate('/sell/product')} >+ Sell Product</button>
            </div>

            {/* Product Grid Area */}
            <div className="my-products-grid">
                <ProductCard isSeller={true} />
            </div>
            </div>
        </>
    )
}



