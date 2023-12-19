import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SideBar } from "./Body";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import ListProduct from "./product/ListProduct";
import DashboardLayout from "./DashboardLayout";
import CreateProduct from "./product/CreateProduct";
import dataProduct from "../data/products.json";
import CartDetails from "./CartDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShoesRender() {

    const [data, setData] = useState(dataProduct);
    const [product, setProduct] = useState({
        quantity: 0,
        id: null
    });
    const [cart, setCart] = useState([]);
    const [statusCart, setStatusCart] = useState(false);

    return (
        <>
            <div className="container">
                <Header cart={cart} setCart={setCart} statusCart={statusCart} setStatusCart={setStatusCart} />
                <div className="col-md-12 row mt-5">
                    <Routes>
                        <Route path="/" element={<SideBar data={data} product={product} setProduct={setProduct} cart={cart} setCart={setCart} statusCart={statusCart} setStatusCart={setStatusCart} />} />
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route path="" element={<Dashboard />} />
                            <Route path="products" element={<ListProduct data={data} />} />
                            <Route path="products/create" element={<CreateProduct data={data} />} />
                        </Route>
                        <Route path="/cartDetails" element={<CartDetails cart={cart} setCart={setCart} setStatusCart={setStatusCart}/>}></Route>
                    </Routes>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ShoesRender;