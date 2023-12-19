import axios from "axios"

const urlAPI = 'https://json-server-five-mu.vercel.app/cartDetails';
const cartService = {
    getAllCarts: async () => {
        return axios
            .get(urlAPI)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    createCart: async (obj) => {
        return axios
            .post(urlAPI, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    editCart: async (id, obj) => {
        return axios
            .patch(urlAPI + '/' + id, obj)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    deleteCart: async (id) => {
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

export default cartService;