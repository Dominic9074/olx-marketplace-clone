import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { SalesList } from "../pages/SalesList";
import AddEditProduct from "../pages/AddEditProduct";
import ProtectedRoute from "./ProtectedRouter";
import PublicRoute from "./PublicRoute";
import CartPage from "../pages/Cart";
import ProductDetailsPage from "../pages/ProductDetails";
import CheckoutPage from "../pages/CheckOut";

export default function AppRouter(){
   return(
        <Routes>
            
            <Route path='/' element={<Home/>} />
            
            <Route element={<PublicRoute/>} >
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
            </Route>
            
            {/*protected route*/}

            <Route element={<ProtectedRoute/>} >
                <Route path='/sell' element={<SalesList/>} />
                <Route path='/sell/product' element={<AddEditProduct />} />
                <Route path='/editProduct/:id' element={<AddEditProduct />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
            </Route>

                <Route path='/product/:id' element={<ProductDetailsPage />} />
            


        </Routes>
   )
}


