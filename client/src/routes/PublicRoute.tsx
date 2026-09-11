import {Navigate,Outlet} from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"


export default function PublicRoute(){
    const {isAuthenticated}=useAppSelector(state=>state.auth);

    if(isAuthenticated){
        return <Navigate to='/' replace/>
    }

    return <Outlet />

}


