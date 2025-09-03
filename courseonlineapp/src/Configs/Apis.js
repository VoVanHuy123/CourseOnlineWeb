import axios from "axios";
import cookie from 'react-cookies'

const BASE_URL = "http://localhost:8080/CourseOnline/api/";

export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/users',
    'login': '/auth/login',
    'profile': '/auth/secure/profile',
    'pay': '/secure/cart'
}

export const authApis = () => {
    console.log("Token from cookie:", cookie.load('token'));

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})