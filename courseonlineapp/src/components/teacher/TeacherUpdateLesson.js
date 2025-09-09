import { Container } from "react-bootstrap";
import CreateUpdateCourseForm from "../Course/CourseForm";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateUpdateLessonForm from "../Lesson/LessonForm";

const TeacherUpdateLesson= ()=>{
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const {lessonId} = useParams();
    const [lesson,setLesson] =useState({});

    const LoadLesson = async () => {
        const res = await fetchApi({
            url: endpoints['lesson_detail'](lessonId)
        })
        if(res.status===200){
    
            setLesson(res.data);
            console.log("lessons: ",res.data)
        } 
      };
    const handleUpdateLesson=async(formData)=>{
        formData.append("id", lessonId);
    //     for (let [key, value] of formData.entries()) {
    // console.log(key, ":", value);
// }
        const res = await fetchApi({
            method: "PUT",
            url : endpoints['lessons'],
            data : formData
        })
        if(res.status===200){
            console.log("Cap nha: ", res.data)
            nav(`/chapters/${lesson?.chapterId}`)
        }
    };
    useEffect(()=>{
        LoadLesson();
    },[])

    return(
        <Container>
            <CreateUpdateLessonForm onSubmit={(formData)=>handleUpdateLesson(formData)} lesson={lesson}/>
        </Container>
    );
};
export default TeacherUpdateLesson;