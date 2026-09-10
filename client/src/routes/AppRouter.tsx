import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { SalesList } from "../pages/SalesList";
import AddEditProduct from "../pages/AddEditProduct";

export default function AppRouter(){
   return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/sell' element={<SalesList/>} />
            <Route path='/sell/product' element={<AddEditProduct />} />
        </Routes>
   )
}


