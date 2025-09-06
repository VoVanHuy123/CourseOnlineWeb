import axios from "axios";
import cookie from 'react-cookies'

const BASE_URL = "http://localhost:8080/CourseOnline/api/";

export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/auth/register',
    'login': '/auth/login',
    'profile': 'secure/auth/profile',
    'pay': '/secure/cart',
    'courses':'/courses',
    'courses_details':(id)=>`/courses/${id}`,
    'courses_chaters':(id)=>`/secure/chapters?courseId=${id}`,
    'lesson_detail':(id)=>`/secure/lessons/${id}`,
    'check_enrollment':(courseId,userId)=>`/secure/check_enrollment?courseId=${courseId}&userId=${userId}`
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