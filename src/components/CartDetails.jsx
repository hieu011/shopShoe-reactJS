import React, { useEffect, useState } from "react";
import cartService from "../services/cartService";
import productService from "../services/productService";
import { toast } from "react-toastify";

const CartDetails = ({ cart, setCart, setStatusCart }) => {
    const [cartListDetails, setCartListDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const getAllCarts = async () => {
        const listCarts = await cartService.getAllCarts();
        setCart(listCarts);
    }

    const cartLists = async () => {
        const newData = [];
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            const item = await productService.getById(cart[i].id);
            const product = { ...item, quantity: cart[i].quantity }
            if (item) {
                newData.push(product);
            }
            total += parseInt(item.newPrice) * parseInt(cart[i].quantity);
        }
        setCartListDetails(newData);
        setTotalPrice(total);
    }

    const loadData = async () => {
        if (cart.length > 0) {
            await cartLists();
        } else {
            await getAllCarts();
            await cartLists();
        }
    }

    useEffect(() => {
        loadData();
    }, [cart])

    const handleRemoveProductInCart = async (id) => {
        const confirmDeleted = window.confirm('Are you sure delete product ' + id + ' ?');

        if (confirmDeleted) {

            await cartService.deleteCart(id);

            const index = cartListDetails.findIndex(item => item.id === id);

            const newCarts = [...cartListDetails];

            newCarts.splice(index, 1);

            setCartListDetails(newCarts);
            setStatusCart(true);

            toast.warn(`Deleted product with ID: ${id} from cart`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if (!id) {
            toast.error(`Cant find product with ID: ${id}`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <>
            <div id="product">
                <h3>Cart Details</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartListDetails.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            <img src={item.img} className="card-img-top" alt="..." style={{ height: 45, width: 85 }} />
                                        </td>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>
                                            {item.newPrice}
                                        </td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>
                                            {parseInt(item.quantity) * parseInt(item.newPrice)}
                                        </td>
                                        <td>
                                            <i className="fa-solid fa-trash" onClick={() => handleRemoveProductInCart(item.id)} ></i>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
                <div className="order-summary p-3">
                    <h3 className="border-bottom py-2">Order Summary</h3>
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between py-2">
                            <span>Subtotal</span>
                            <span className="fw-bolder">${totalPrice}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-2">
                            <span>Shipping</span>
                            <span className="fw-bolder">Free</span>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                        <span className="fs-6">Total</span>
                        <span className="fw-bolder fs-6">${totalPrice}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartDetails;