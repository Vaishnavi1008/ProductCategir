import {  Route, Routes } from "react-router-dom";
import Category from '../Pages/User/CategoryDashBoard';
import CategoryEdit from "../Pages/User/CategoryEdit";
import  Product from "../Pages/Product/ProductDashBoard";
import  ProductEdit from "../Pages/Product/ProductEdit";
import Home from "../Pages/HomePage/Homepage";



const Router = () =>{

    return(<>
 
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Category" element={<Category/>} />
        <Route path="/CategoryEdit" element={<CategoryEdit/>} />
        <Route path="/Product" element={<Product/>} />
        <Route path="/ProductEdit" element={<ProductEdit/>} />
    </Routes>
        
    
    </>)
}
export default Router;