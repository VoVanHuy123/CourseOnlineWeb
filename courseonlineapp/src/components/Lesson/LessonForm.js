import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import DynamicFormControl from "../Form/DynamicFormControl";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import DeleteConfirmModal from "../modal/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";

const CreateUpdateLessonForm = ({ onSubmit, lesson }) => {
    const {loading,fetchApi} = useFetchApi();
    const nav = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const handleDelete = async (lesson) => {
        const res = await fetchApi({
            method : "DELETE",
            url : `${endpoints['lessons']}/${lesson?.id}`
        })
        if(res.status == 204){
            setShowDelete(false);
            nav(`/chapters/${lesson?.id}`)
        }
        // console.log("url: ",`${endpoints['lessons']}/${lesson?.id}`)
    };

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        isPublic: false,
        lessonOrder: 1,
        chapterId: "",
    });

    const refs = {
        videoFile: useRef(),
    };

    const fields = [
        { field: "title", title: "Tiêu đề", type: "text" },
        { field: "content", title: "Nội dung", type: "textArea" },
        {
            field: "isPublic",
            title: "Trạng thái",
            type: "select",
            options: [
                { value: true, label: "Đã phát hành" },
                { value: false, label: "Chưa phát hành" },
            ],
        },
        { field: "lessonOrder", title: "Thứ tự bài học", type: "number", },
        { field: "videoFile", title: "Video bài học", type: "file", accept: "video/*" },
    ];

    // Fill dữ liệu nếu có lesson (update)
    useEffect(() => {
        if (lesson) {
            
                setFormData({
                title: lesson.title || "",
                content: lesson.content || "",
                isPublic: lesson.isPublic ?? false,
                lessonOrder: lesson.lessonOrder || 1,
                chapterId: lesson.chapterId || "",
            });
            
        }
    }, [lesson]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = new FormData();

        Object.keys(formData).forEach((key) => {
            payload.append(key, formData[key]);
        });

        if (refs.videoFile.current?.files[0]) {
            payload.append("videoFile", refs.videoFile.current.files[0]);
        }

        onSubmit(payload);
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">{lesson ? "Cập nhật bài học" : "Tạo bài học"}</h2>
            <Form onSubmit={handleSubmit}>
                {DynamicFormControl(fields, formData, setFormData, refs)}

                <Button type="submit" variant="success" className="rounded-3">
                    {lesson ? "Cập nhật" : "Tạo mới"}
                </Button>
                {lesson && <Button variant="danger" onClick={()=>{setShowDelete(true)}} className="rounded-3 ms-2">
                    xóa
                </Button>}
            </Form>

            <DeleteConfirmModal
                show={showDelete}
                object={lesson}
                onConfirm={handleDelete}
                onCancel={() => setShowDelete(false)}
            />
        </Container>
    );
};

export default CreateUpdateLessonForm;
