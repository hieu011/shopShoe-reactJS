import axios from "axios"

const urlAPI = 'https://json-server-five-mu.vercel.app/products';
const productService = {
    getAllProducts: async () => {
        return axios
            .get(urlAPI)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createProduct: async (obj) => {
        return axios
            .post(urlAPI, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editProduct: async (id, obj) => {
        return axios
            .patch(urlAPI + '/' + id, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteProduct: async (id) => {
        return axios
            .delete(urlAPI + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getById: async (id) => {
        return axios
            .get(urlAPI + '/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default productService;