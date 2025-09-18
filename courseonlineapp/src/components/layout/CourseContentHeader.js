import { Navbar, Nav, Container, Button, Dropdown, Image } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CurrentCourseContext, MyUserContext } from "../../Configs/Context";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvater from "../../assets/image/defaultAvatar.png"
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";

const CourseContentHeader = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();
    // const [courseId, courseIdDispatch] = useContext(CurrentCourseContext);
    const {courseId} = useParams();
    const [result, setResult] = useState(null);
    const { fetchApi } = useFetchApi();

    const logout = () => {
        dispatch({ type: "logout" });
        nav("/login");
    };
    useEffect(() => {
        const loadResult = async () => {
            const res = await fetchApi({
                url: endpoints['get_course_progress'](courseId)
            })
            if (res.status == 200) setResult(res.data)
            // console.log("REsdata: ", res.data)
        };
        loadResult();
    }, [])

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                {/* Logo */}
                <Navbar.Brand
                    onClick={() => nav("/")}
                    className="fw-bold text-success fs-4"
                    style={{ letterSpacing: "1px" }}
                >
                    CourseOnline
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {user ? (
                        <>
                            <div className="w-50 d-flex flex-row-reverse">
                                <div className=""></div>
                                <div className="progress  w-50" role="progressbar" aria-label="Success example" aria-valuenow={result ? (result.totalCompleteLessons / result.totalLessons * 100).toFixed(0) : 0} aria-valuemin="0" aria-valuemax="100">
                                    <div
                                        className="progress-bar text-bg-success"
                                        style={{
                                            width: result ? `${(result.totalCompleteLessons / result.totalLessons * 100).toFixed(0)}%` : "0%"
                                        }}
                                    >
                                        {result ? `${(result.totalCompleteLessons / result.totalLessons * 100).toFixed(0)}%` : "0%"}
                                    </div>
                                </div>
                            </div>
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="light"
                                    className="d-flex align-items-center border-0 shadow-sm rounded-pill"
                                >
                                    <Image
                                        src={user.avatar || defaultAvater}
                                        roundedCircle
                                        width="40"
                                        height="40"
                                        className="me-2"
                                    />
                                    <span className="fw-semibold">{user.username}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => nav("/")}>thông tin người dùng</Dropdown.Item>
                                    <Dropdown.Item onClick={() => nav("/my-courses")}>📘 Khóa học của tôi</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logout} className="text-danger">
                                        🚪 Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>

                    ) : (
                        <Nav>
                            <Button
                                variant="outline-success"
                                className="me-2"
                                onClick={() => nav("/login")}
                            >
                                Đăng nhập
                            </Button>
                            <Button variant="success" onClick={() => nav("/register")}>
                                Đăng ký
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CourseContentHeader;
