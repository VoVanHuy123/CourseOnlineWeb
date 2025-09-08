import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import DynamicFormControl from "../Form/DynamicFormControl";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirmModal from "../modal/DeleteConfirmModal";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";

const ChapterForm = ({ onSubmit, chapter, courseId }) => {
        const nav = useNavigate();
        const [showDelete, setShowDelete] = useState(false);
        const {loading,fetchApi} = useFetchApi();
        const handleDelete = async (chapter) => {
            const res = await fetchApi({
                method : "DELETE",
                url : `${endpoints['chapters']}/${chapter?.id}`
            })
            if(res.status == 204){
                setShowDelete(false);
                nav(`/courses/${chapter?.courseId}`)
            }
            // console.log("url: ",`${endpoints['lessons']}/${lesson?.id}`)
        };
    // const {courseId,chapterId} = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        orderIndex: "",
        courseId: "",
    });

    // Fields definition
    const fields = [
        { field: "title", title: "Tiêu đề", type: "text" },
        { field: "description", title: "Mô tả", type: "textArea" },
        { field: "orderIndex", title: "Thứ tự chương", type: "number" },
        // {
        //     field: "courseId",
        //     title: "Khóa học",
        //     type: "select",
        //     options: courses?.map(c => ({ value: c.id, label: c.title })) || [],
        // },
    ];

    // Fill form if chapter is passed
    useEffect(() => {
        if (chapter) {
            setFormData({
                title: chapter.title || "",
                description: chapter.description || "",
                orderIndex: chapter.orderIndex || "",
                courseId: chapter.courseId || courseId,
            });
        }
    }, [chapter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Can be a JSON object, no files here
        onSubmit(formData);
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">{chapter ? "Cập nhật chương" : "Tạo chương mới"}</h2>
            <Form onSubmit={handleSubmit}>
                {DynamicFormControl(fields, formData, setFormData)}
                <Button type="submit" variant="success" className="rounded-3">
                    {chapter ? "Cập nhật" : "Tạo mới"}
                </Button>
                {chapter && <Button variant="danger" onClick={()=>{setShowDelete(true)}} className="rounded-3 ms-2">
                                    xóa
                                </Button>}
            </Form>

            <DeleteConfirmModal
                show={showDelete}
                object={chapter}
                onConfirm={handleDelete}
                onCancel={() => setShowDelete(false)}
            />
        </Container>
    );
};

export default ChapterForm;
