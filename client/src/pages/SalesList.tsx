import Navbar from "../components/navbar/Navbar";
import './SalesList.css'
import ProductCard from "../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useMemo } from "react";
import { getProducts } from "../features/product/productThunk";
import LoadingSpinner from "../components/spinloader/LoadingSpinner";
import { toast } from "react-toastify";

export function SalesList(){
    const navigate=useNavigate()
    const dispatch=useAppDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const {products,loading,error}=useAppSelector(state=>state.product);
    const {user}=useAppSelector(state=>state.auth)

    const filteredProduct=useMemo(()=>{
        return products?.filter((product)=>product.sellerId===user!.id)
    },[products])

    if(error){
        toast.error(error)
    }

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
                {loading && (
                    <LoadingSpinner
                    fullScreen={true}
                    size="medium"
                    />
                )}
                {filteredProduct && filteredProduct.map((product)=>
                   <ProductCard product={product} isSeller={true} />
                   )}
            </div>
            </div>
        </>
    )
}



