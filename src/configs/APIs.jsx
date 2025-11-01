import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:8088/api/v1";

export const endpoints ={
    "login": "/auth/token",
    "register": "/users/registration",
    "my-profile": "/users/my-info",
    "products": "/products/get-all-products",
    "type-products": "/type-product/get-all-type-products",
    "product/create": "/products/create",
    "product-details": id => `/products/details/${id}`,

    "get-all-color": "/color-products/get-all",
    "get-all-size": "/size-products/get-all-size-products",

    "delete-product": id => `/products/delete/${id}`,
}

export const authApis = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }

    });

}
export default axios.create({
    baseURL: BASE_URL,
})

