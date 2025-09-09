import { Container } from "react-bootstrap";
import CreateUpdateCourseForm from "../Course/CourseForm";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChapterForm from "../Chapter/ChapterForm";

const TeacherUpdateChapter = () => {
    const { loading, fetchApi } = useFetchApi();
    const nav = useNavigate();
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState({});

    const LoadChapter = async () => {
        const res = await fetchApi({
            url: `${endpoints['chapters']}/${chapterId}`
        })
        if (res.status === 200) {

            setChapter(res.data);
        }
    };
    const handleCreateChapter = async (formData) => {
        //         formData.append("id", courseId);
        //         for (let [key, value] of formData.entries()) {
        //     console.log(key, ":", value);
        // }
        formData = {
            ...formData,
            id: chapterId
        }
        const res = await fetchApi({
            method: "PUT",
            url: endpoints['chapters'],
            data: formData
        })
        if (res.status === 200) {
            console.log("Cap nha: ", res.data)
            nav(`/chapters/${chapterId}`)
        }
    };
    useEffect(() => {
        LoadChapter();
    }, [])

    return (
        <Container>
            <ChapterForm onSubmit={(formData) => handleCreateChapter(formData)}  chapter={chapter}/>
        </Container>
    );
};
export default TeacherUpdateChapter;