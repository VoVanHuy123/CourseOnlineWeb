import React, { useEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import useFetchApi from "../../Configs/FetchApi";
import { useParams } from "react-router-dom";
import { endpoints } from "../../Configs/Apis";
import MySpinner from "../layout/MySpinner";

const CourseEnrolledStudents = () => {
    const { loading, fetchApi } = useFetchApi();
    const [students, setStudents] = useState([])
    const {courseId} = useParams();
    const loadStudents = async () =>{
        const res = await fetchApi({
            url : endpoints['get_students_of_courses'](courseId)
        })
        if(res.status===200) setStudents(res.data);
    };
    useEffect(()=>{
        loadStudents();
    },[])

    if(loading) return (<MySpinner/>);

    if (!students || students.length === 0) {
        return <p className="text-center mt-3 text-muted">Chưa có học viên nào đăng ký khóa học.</p>;
    }

    return (
        <div className="container mt-4">
            <h5 className="fw-bold mb-3">Danh sách học viên đã đăng ký</h5>
            <div className="row g-3">
                {students.map((item) => {
                    const { user, totalCompleteLessons, totalLessons } = item;
                    const progress = totalLessons > 0
                        ? Math.round((totalCompleteLessons / totalLessons) * 100)
                        : 0;

                    return (
                        <div className="col-md-6 col-lg-4" key={user.id}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Body>
                                    {/* Avatar + Name */}
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            src={user.avatar}
                                            alt={user.fullName}
                                            className="rounded-circle me-3"
                                            width="50"
                                            height="50"
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div>
                                            <h6 className="mb-0 fw-bold">{user.fullName}</h6>
                                            <small className="text-muted">{user.username}</small>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <p className="mb-1">
                                        📧 <span className="text-muted">{user.email}</span>
                                    </p>
                                    <p className="mb-3">
                                        📱 <span className="text-muted">{user.phoneNumber}</span>
                                    </p>

                                    {/* Progress Bar */}
                                    <ProgressBar
                                        now={progress}
                                        label={`${totalCompleteLessons}/${totalLessons}`}
                                        className="mb-1"
                                        variant="success"
                                    />
                                    <small className="text-muted">
                                        Hoàn thành {progress}%
                                    </small>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseEnrolledStudents;
