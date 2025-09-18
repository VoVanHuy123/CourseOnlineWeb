import { Container } from "react-bootstrap";
import CreateUpdateCourseForm from "../Course/CourseForm";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TeacherUpdateCourse= ()=>{
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const {courseId} = useParams();
    const [course,setCourse] =useState({});

    const LoadCourse = async () => {
        const res = await fetchApi({
            url: endpoints['courses_details'](courseId)
        })
        if(res.status===200){
    
            setCourse(res.data);
        } 
      };
    const handleCreateCourse=async(formData)=>{
        formData.append("id", courseId);
        for (let [key, value] of formData.entries()) {
    console.log(key, ":", value);
}
        const res = await fetchApi({
            method: "PUT",
            url : endpoints['update_course'](course?.id),
            data : formData
        })
        if(res.status===200){
            console.log("Cap nha: ", res.data)
            nav("/teacher-home")
        }
    };
    useEffect(()=>{
        LoadCourse();
    },[])

    return(
        <Container>
            <CreateUpdateCourseForm onSubmit={(formData)=>handleCreateCourse(formData)} course={course}/>
        </Container>
    );
};
export default TeacherUpdateCourse;