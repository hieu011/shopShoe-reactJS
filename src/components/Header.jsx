import React, { useEffect, useState } from "react";
import '../components/header.css';
import { Link } from 'react-router-dom';
import cartService from "../services/cartService";

function Header({ cart, setCart, statusCart, setStatusCart }) {

    const quantityInCart = async () => {
        const listCarts = await cartService.getAllCarts();
        setCart(listCarts);
    }

    useEffect(() => {
        if (statusCart) {
            quantityInCart();
            setStatusCart(false);
        }
    }, [statusCart]);


    return (
        <div className="container d-flex header">
            <div className="col-md-3 d-flex">
                <i className="fa-solid fa-cart-shopping me-2"></i>
                <h5><Link className="dropdown-item" to="/">Shoes Shop</Link></h5>
            </div>
            <div className="col-md-5">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search shoes" aria-label="Search" />
                </form>
            </div>
            <div className="col-md-4 icon d-flex">
                <div className="dropdown">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user"></i>
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/">Home</Link></li>
                    </ul>
                </div>
                <Link to="/cartDetails" className="cart-link">
                    <i className="fa-solid fa-cart-shopping" data-count={cart.length}></i>
                </Link>
            </div>
        </div>
    )
}
export default Header;