import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="d-flex">
            <div className="col-md-2">
                <h3>Product Management</h3>
                <ul className="list-group">
                    <Link className="list-group-item" to='/dashboard/products'>List Products</Link>
                    <Link className="list-group-item" to='/dashboard/products/create'>Create</Link>
                </ul>
            </div>
            <div className="col-md-10">
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayout;