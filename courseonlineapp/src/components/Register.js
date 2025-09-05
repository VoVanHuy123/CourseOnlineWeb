import React, { useRef, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
} from "react-bootstrap";
import axios from "axios";
import DynamicFormControl from "./Form/DynamicFormControl";
import useFetchApi from "../Configs/FetchApi";
import { endpoints } from "../Configs/Apis";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);
    // const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const {loading,fetchApi} = useFetchApi();
    const avatar = useRef();

    const info1 = [
        { field: "firstName", title: "Họ", type: "text" },
        { field: "lastName", title: "Tên", type: "text" },
        { field: "email", title: "Email", type: "email" },
        { field: "username", title: "Tên đăng nhập", type: "text" },
        
    ];
    const info2 = [
        { field: "phoneNumber", title: "Số điện thoại", type: "text" },
        { field: "password", title: "Mật khẩu", type: "password" },
        { field: "confirm", title: "Xác nhận mật khẩu", type: "password" },
        {
            field: "role",
            title: "Vai trò",
            type: "select",
            options: [
                { label: "Học sinh", value: "student" },
    { label: "Giáo viên", value: "teacher" },
            ],
        },
    ]
    const info3 = [
        { field: "avatarFile", title: "Ảnh đại diện", type: "file" },
    ]
    const validate = () => {
        console.log("password:", user.password,)
        console.log("confirm:", user.confirm,)
        if (user.password == null || user.password != user.confirm) {
            setErr("Mật khẩu không khớp!");
            return false;
        }

        return true;
    }

    const register = async (e) => {
        e.preventDefault();
        setErr(null);
        setSuccess(null);
        // setLoading(true);

            if (validate()) {
                let formData = new FormData();
                for (let key in user) {
                    if (key !== 'confirm')
                        formData.append(key, user[key]);
                }

                if (avatar)
                    formData.append("avatarFile", avatar.current.files[0]);

                // 👉 In ra tất cả dữ liệu trong formData
                // for (let [key, value] of formData.entries()) {
                //     console.log(key,": ", value);
                // }

                const res = await fetchApi({
                    method:"POST",
                    url: endpoints['register'],
                    data: formData
                })
                if(res.status===201){
                    nav("/")
                }else {
                setErr(res.error)
            }
                console.log(endpoints['register'])
            }
       
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f1f8e9, #ffffff)",
            }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={{ span: 9, offset: 1.5 }} lg={{ span: 9, offset: 1.5 }}>
                    <Card className="shadow-lg rounded-4 border-0">
                        <Card.Body className="p-4">
                            <h2 className="text-center text-primary mb-4 fw-bold">
                                ĐĂNG KÝ NGƯỜI DÙNG
                            </h2>

                            {err && (
                                <Alert variant="danger" className="text-center">
                                    {err}
                                </Alert>
                            )}
                            {success && (
                                <Alert variant="success" className="text-center">
                                    {success}
                                </Alert>
                            )}

                            <Form onSubmit={register}>
                                <Row>
                                    <Col md={6}>
                                        {DynamicFormControl(info1, user, setUser )}
                                    </Col>
                                    <Col md={6}>
                                        {DynamicFormControl(info2, user, setUser)}
                                    </Col>
                                </Row>
                                {DynamicFormControl(info3, user, setUser, { avatarFile: avatar })}

                                <div className="d-grid">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                        className="rounded-3 fw-semibold"
                                    >
                                        {loading ? "Đang xử lý..." : "Đăng ký"}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
