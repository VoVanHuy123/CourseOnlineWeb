import { Container } from "react-bootstrap";
import CreateUpdateCourseForm from "../Course/CourseForm";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate } from "react-router-dom";

const TeacherCreateCourse= ()=>{
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const handleCreateCourse=async(formData)=>{
        const res = await fetchApi({
            method: "POST",
            url : endpoints['create_course'],
            data : formData
        })
        if(res.status===201){
            nav("/teacher-home")
        }
    };

    return(
        <Container>
            <CreateUpdateCourseForm onSubmit={(formData)=>handleCreateCourse(formData)}/>
        </Container>
    );
};
export default TeacherCreateCourse;