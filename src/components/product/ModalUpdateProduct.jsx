import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ModalUpdateProduct = ({ show, handleCloseModalUpdate, product, handleUpdateProducts, data }) => {
    const [newProduct, setNewProduct] = useState({});
    const [fileDataURL, setFileDataURL] = useState(null);
    const defaultImage = 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg';

    const handleChangeProduct = (e) => {
        if (Object.keys(newProduct).length) {
            setNewProduct({
                ...newProduct,
                [e.target.name]: e.target.value
            });
        } else {
            setNewProduct({
                ...product,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleUpdateAndAlert = () => {
        if (!newProduct.img) {
            alert("Please upload an image");
            return;
        } else {
            alert('Edit Product successfully');
            handleUpdateProducts(newProduct);
            handleCloseModalUpdate();
        }
    }

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

        setNewProduct({
            ...newProduct,
            id: product.id,
            img: uploadedImage.url
        });
    };

    const handleClickImage = () => {
        document.getElementById('img').click();
    }

    useEffect(() => {
        setFileDataURL(product.img || defaultImage);
    }, [product.img, show]);

    return (
        <Modal show={show} onHide={handleCloseModalUpdate} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="">
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="">Title</label>
                            <input type="text" name="title" className="form-control" defaultValue={product.title} onChange={handleChangeProduct} />
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="">Company</label>
                            <select name="company"
                                className="form-control"
                                defaultValue={product.company}
                                onChange={handleChangeProduct}>
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
                            <input type="text" name="prevPrice" className="form-control" defaultValue={product.prevPrice} onChange={handleChangeProduct} />
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="">New Price</label>
                            <input type="text" name="newPrice" className="form-control" defaultValue={product.newPrice} onChange={handleChangeProduct} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="">Color</label>
                            <select name="color"
                                className="form-control"
                                defaultValue={product.color}
                                onChange={handleChangeProduct}>
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
                                defaultValue={product.category}
                                onChange={handleChangeProduct}>
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
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalUpdate}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdateAndAlert()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdateProduct;