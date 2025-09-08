import { Container } from "react-bootstrap";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import ChapterForm from "../Chapter/ChapterForm";

const TeacherCreateChapter= ()=>{
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const {courseId} = useParams();
    const handleCreateChapter=async(formData)=>{
        formData = {
            ...formData,
            courseId: parseInt(courseId)
        }
        console.log(formData)
        const res = await fetchApi({
            method: "POST",
            url : endpoints['chapters'],
            data : formData
        })
        if(res.status===201){
            nav(`/courses/${courseId}`)
        }
    };

    return(
        <Container>
            <ChapterForm onSubmit={(formData)=>handleCreateChapter(formData)} courseId={courseId}/>
        </Container>
    );
};
export default TeacherCreateChapter;