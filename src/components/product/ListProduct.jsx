import React, { useEffect, useState } from "react";
import ModalUpdateProduct from "./ModalUpdateProduct";
import productService from "../../services/productService";


const ListProduct = ({ data }) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});


    const getAllProducts = async () => {
        const data = await productService.getAllProducts();
        setProducts(data);
    }


    const handleUpdateProducts = async (obj) => {

        const updateProduct = await productService.editProduct(obj.id, obj);
        console.log(updateProduct);
        
        const index = products.findIndex(item => item.id === updateProduct.id);
        const newProducts = [...products];

        newProducts[index] = updateProduct;

        setProducts(newProducts);
    }

    const handleShowModalUpdate = async (id) => {
        const product = await productService.getById(id);

        if (Object.keys(product).length) {
            setProduct(product);
            setShowModalUpdate(true);
        } else {
            alert('Cant find product with id: ' + id);
        }
    }

    const handleDelete = async (id) => {
        const confirmDeleted = window.confirm('Are you sure delete product ' + id + ' ?');

        if (confirmDeleted) {
            await productService.deleteProduct(id);

            const index = products.findIndex(item => item.id === id);

            const newProducts = [...products];

            newProducts.splice(index, 1);

            setProducts(newProducts);

            alert('Deleled product successfully!');

            // await productService.deleteProduct(id);
            // const deleteProduct = products.filter(item => item.id !== id);
            // setProducts(deleteProduct);
            // alert('Deleled product successfully!');
        } else {
            alert('Cant find product with that ID');
        }
    }



    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
    }

    const sortProducts = array => {
        if (array && array.length) {
            array.sort((a, b) => { return b.id - a.id });
        }
        return array;
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    
    return (
        <>
            <div id="product">
                <h3>Products</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Title</th>
                            <th>Prev Price</th>
                            <th>New Price</th>
                            <th>Company</th>
                            <th>Color</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortProducts(products).map(shoe => {
                                return (
                                    <tr key={shoe.id}>
                                        <td>
                                            {shoe.id}
                                        </td>
                                        <td>
                                            <img src={shoe.img} className="card-img-top" alt="..." style={{ height: 45, width: 85 }} />
                                        </td>
                                        <td>
                                            {shoe.title}
                                        </td>
                                        <td>
                                            {shoe.prevPrice}
                                        </td>
                                        <td>
                                            {shoe.newPrice}
                                        </td>
                                        <td>
                                            {shoe.company}
                                        </td>
                                        <td>
                                            {shoe.color}
                                        </td>
                                        <td>
                                            {shoe.category}
                                        </td>
                                        <td>
                                            <i className="fas fa-edit me-2" onClick={() => handleShowModalUpdate(shoe.id)}></i>
                                            <i className="fa-solid fa-trash" onClick={() => handleDelete(shoe.id)}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ModalUpdateProduct show={showModalUpdate} handleCloseModalUpdate={handleCloseModalUpdate} product={product} handleUpdateProducts={handleUpdateProducts} data={data} />
        </>
    )
}

export default ListProduct;