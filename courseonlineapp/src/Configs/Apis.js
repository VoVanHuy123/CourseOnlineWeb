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
    'check_enrollment':(courseId,userId)=>`/secure/check_enrollment?courseId=${courseId}&userId=${userId}&status=success`,
    'my-course':(id)=>`/secure/my-course/${id}`,
    'create_course':`/secure/courses`,
    'update_course':(id)=>`/secure/courses/${id}`,
    'delete_course':(id)=>`/secure/courses/${id}`,
    "chapters":`/secure/chapters`,
    "lessons":'/secure/lessons',
    'create_payment': '/secure/payments',
    'create_enrollment': '/secure/enrollments',
    "get_course_lessons":(id)=>`/secure/getcourse/${id}/getlessons`,
    "complete_lesson":(id)=>`/secure/lessons/${id}/complete`,
    "get_course_progress":(id)=>`/secure/courses/${id}/get_progress`,
    "get_students_of_courses":(id)=>`/secure/get_ussers_of_course/${id}`,
    "get_users":`/secure/auth/users`,
    "update_user":(id)=>`/secure/auth/users/${id}`,
    "delete_user":(id)=>`/secure/auth/users/${id}`,
    "delete_user":(id)=>`/secure/auth/users/${id}`,
    "get_teacher_course_create":`/secure/stats/teacher-courses-create`,
    "get_teacher_public_and_not_courses":`/secure/stats/teacher-courses`,
    "get_course_reviews":(id)=>`/courses/${id}/reviews`,
    "create_review":`/secure/reviews`,
    "update_delete_review":(id)=>`/secure/reviews/${id}`

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