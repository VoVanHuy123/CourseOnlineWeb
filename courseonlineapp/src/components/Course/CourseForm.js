import React, { useState, useRef, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import DynamicFormControl from "../Form/DynamicFormControl";
import { MyUserContext } from '../../Configs/Context'
import DeleteConfirmModal from "../modal/DeleteConfirmModal";
import useFetchApi from "../../Configs/FetchApi";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../Configs/Apis";

const CreateUpdateCourseForm = ({ onSubmit, course }) => {
     const nav = useNavigate();
        const [showDelete, setShowDelete] = useState(false);
        const {loading,fetchApi} = useFetchApi();
        const handleDelete = async (course) => {
            const res = await fetchApi({
                method : "DELETE",
                url : `${endpoints['secure-courses']}/${course?.id}`
            })
            if(res.status == 204){
                setShowDelete(false);
                nav(`/teacher-home`)
            }
            // console.log("url: ",`${endpoints['lessons']}/${lesson?.id}`)
        };
    const [user,] = useContext(MyUserContext);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tuitionFee: "",
        duration: "",
        lessonsCount: "",
        isPublic: false,
    });

    const refs = {
        imageFile: useRef(),
        videoFile: useRef(),
    };

    const fields = [
        { field: "title", title: "Tiêu đề", type: "text" },
        { field: "description", title: "Mô tả", type: "textArea" },
        { field: "tuitionFee", title: "Học phí", type: "number" },
        // { field: "duration", title: "Thời lượng (giờ)", type: "number" },
        { field: "lessonsCount", title: "Số bài học", type: "number", readOnly: true },
        {
            field: "isPublic",
            title: "Trạng thái",
            type: "select",
            options: [
                { value: true, label: "Công bố" },
                { value: false, label: "Chưa công bố" },
            ],
        },
        { field: "imageFile", title: "Ảnh khóa học", type: "file", accept: "image/*" },
        { field: "videoFile", title: "Video giới thiệu", type: "file", accept: "video/*" },
    ];

    // Khi có course từ props thì fill dữ liệu vào form
    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || "",
                description: course.description || "",
                tuitionFee: course.tuitionFee || "",
                duration: course.duration || "",
                lessonsCount: course.lessonsCount || "",
                isPublic: course.isPublic ?? false,
            });
        }
    }, [course]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = new FormData();
        if (user?.id) {
            payload.append("teacherId", user?.id);
            // append các field thường
            Object.keys(formData).forEach((key) => {
                payload.append(key, formData[key]);
            });

            // append file nếu có
            if (refs.imageFile.current?.files[0]) {
                payload.append("imageFile", refs.imageFile.current.files[0]);
            }
            if (refs.videoFile.current?.files[0]) {
                payload.append("videoFile", refs.videoFile.current.files[0]);
            }
        }

        for (let [key, value] of payload.entries()) {
            if (value instanceof File) {
                console.log(key, value.name, value.size, value.type);
            } else {
                console.log(key, value);
            }
        }
        // Object.keys(payload).forEach((key) => {
        //         console.log(key, ":",payload[key] );
        //     });
        // console.log(payload instanceof FormData);
        onSubmit(payload);
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">{course ? "Cập nhật khóa học" : "Tạo khóa học"}</h2>
            <Form onSubmit={handleSubmit}>
                {DynamicFormControl(fields, formData, setFormData, refs)}
                <Button type="submit" variant="success" className="rounded-3">
                    {course ? "Cập nhật" : "Tạo mới"}
                </Button>
                {course && <Button variant="danger" onClick={()=>{setShowDelete(true)}} className="rounded-3 ms-2">
                                    xóa
                                </Button>}
            </Form>

            <DeleteConfirmModal
                show={showDelete}
                object={course}
                onConfirm={handleDelete}
                onCancel={() => setShowDelete(false)}
            />
        </Container>
    );
};

export default CreateUpdateCourseForm;
