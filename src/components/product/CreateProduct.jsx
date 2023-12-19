import React, { useState } from "react";
import productService from "../../services/productService";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// const schema = yup.object({
//     title: yup.string().required('Please fill product title !'),
//     prevPrice: yup.number().required('Please provide previous price !').typeError('Please enter Numbers !')
// })

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const CreateProduct = ({ data }) => {
    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });

    const [product, setProduct] = useState({
        title: "",
        prevPrice: "",
        newPrice: ""
    });

    // ----------------------------------vvv Upload Image vvv---------------------------------------------
    const defaultImage = 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg';
    const [fileDataURL, setFileDataURL] = useState(defaultImage);

    const uploadAvatar = async (e) => {

        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }

        let fileReader, isCancel = false;

        if (!file) {
            return;
        }

        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }

        const CLOUD_NAME = "dw3x98oui";
        const UNSIGNED_UPLOAD_PRESET = "ml_default";

        const POST_URL =
            "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/auto/upload";

        var formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", CLOUD_NAME);
        formData.append("upload_preset", UNSIGNED_UPLOAD_PRESET);

        const uploadedImage = await axios({
            method: 'post',
            url: POST_URL,
            data: formData
        }).then((data) => {
            return data.data;
        });

        setProduct({
            ...product,
            img: uploadedImage.url
        });
    };

    const handleClickImage = () => {
        document.getElementById('img').click();
    }

    // ----------------------------------^^^ Upload Image ^^^ ---------------------------------------------

    const handleChangeProduct = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    const handleCreate = async () => {
        await productService.createProduct(product);

        alert('Add new product successfully!');

        handleClear();
        setFileDataURL(defaultImage);
    }

    const handleClear = () => {
        setProduct({
            // ...product,
            title: "",
            company: "",
            prevPrice: "",
            newPrice: "",
            color: "",
            category: "",
            img: ""
        })
    }


    return (
        <>
            <h2>Create new Product</h2>
            {/* onSubmit={handleSubmit(handleCreate)} */}
            <form action="" >
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Title</label>
                        <input type="text" name="title" value={product.title} className="form-control" onChange={handleChangeProduct} />
                        {/* <span className="text-danger">{errors?.title?.message}</span> */}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="">Company</label>
                        <select name="company"
                            className="form-control"
                            value={product.company}
                            onChange={handleChangeProduct}>
                            <option disabled>--- Please choose one ---</option>
                            {
                                (data.companies).map((company) => (
                                    <option key={company.id} >{company.title}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Prev Price</label>
                        <input type="text" name="prevPrice" value={product.prevPrice} className="form-control" onChange={handleChangeProduct} />
                        {/* <span className="text-danger">{errors?.prevPrice?.message}</span> */}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="">New Price</label>
                        <input type="text" name="newPrice" value={product.newPrice} className="form-control" onChange={handleChangeProduct} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="">Color</label>
                        <select name="color"
                            className="form-control"
                            value={product.color}
                            onChange={handleChangeProduct}>
                            <option disabled>--- Please choose one ---</option>
                            {
                                (data.colors).map((color) => (
                                    <option key={color.id} >{color.title}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="">Category</label>
                        <select name="category"
                            className="form-control"
                            value={product.category}
                            onChange={handleChangeProduct}>
                            <option disabled>--- Please choose one ---</option>
                            {
                                (data.categories).map((category) => (
                                    <option key={category.id} >{category.title}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <label htmlFor="">Image</label>
                        <div>
                            <input type="file" id="img" name="img" className="form-control" onChange={uploadAvatar} hidden />
                            <img src={fileDataURL} alt="" width={"200px"} height={"150px"} onClick={handleClickImage} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mt-4">
                        <button type="button" className="btn btn-outline-primary" onClick={() => handleCreate()}><i className="fa-solid fa-square-plus"></i> Add new Product</button>
                        <button type="button" className="btn btn-outline-secondary ms-3" onClick={() => handleClear()}><i className="fa-solid fa-xmark"></i> Clear</button>
                    </div>
                </div>
            </form>
        </>
    )
}


export default CreateProduct;