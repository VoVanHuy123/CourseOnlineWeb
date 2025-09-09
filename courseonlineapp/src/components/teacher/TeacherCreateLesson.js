import { Container } from "react-bootstrap";
import CreateUpdateCourseForm from "../Course/CourseForm";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import CreateUpdateLessonForm from "../Lesson/LessonForm";

const TeacherCreateLesson= ()=>{
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const {chapterId}=useParams();
    const handleCreateLesson=async(formData)=>{
       formData.set("chapterId", parseInt(chapterId));
        const res = await fetchApi({
            method: "POST",
            url : endpoints['lessons'],
            data : formData
        })
        if(res.status===201){
            nav(`/chapters/${chapterId}`)
        }
    };

    return(
        <Container>
            <CreateUpdateLessonForm onSubmit={(formData)=>handleCreateLesson(formData)}/>
        </Container>
    );
};
export default TeacherCreateLesson;