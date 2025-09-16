import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import MySpinner from "./layout/MySpinner";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { endpoints } from "../Configs/Apis"
import cookie from 'react-cookies'
import { MyUserContext } from "../Configs/Context";
import useFetchApi from "../Configs/FetchApi";

const Login = () => {
    const info = [{
        title: "Tên đăng nhập",
        field: "username",
        type: "text"
    }, {
        title: "Mật khẩu",
        field: "password",
        type: "password"
    }];

    const [user, setUser] = useState({});
    // const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();
    const nav = useNavigate();
    const [, dispatch] = useContext(MyUserContext);
    const [q] = useSearchParams();
    const { loading, fetchApi } = useFetchApi();

    const validate = () => {
        if (user.username === '' || user.password === '') {
            setErr("Vui lòng nhập username và password!");
            return false;
        }

        return true;
    }

    const login = async (e) => {
        e.preventDefault();
        if (validate()) {

            const res = await fetchApi({
                method: "POST",
                url: endpoints['login'],
                data: {
                    ...user
                }
            })
            if (res.status === 200) {
                cookie.save('token', res.data.token);
                const u = await fetchApi({
                    method: "POST",
                    url: endpoints["profile"],
                })
                if (u.status === 200) {
                    console.log(u.data)
                    if (u.data.isVerify == true) {
                        
                        dispatch({
                            "type": "login",
                            "payload": u.data
                        });

                        let next = q.get('next')
                        if (next) {

                            nav(next);
                        } else {
                            if (u.data.role == "teacher") {
                                nav("/teacher-home")
                            }
                            else {
                                nav("/")
                            }
                        }
                    }
                    else {
                        setErr("Người dùng chưa được xác thực")
                    }
                }

            }else {
            setErr(res.error)
        }


        }
        

    }

    return (

        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0f7fa, #ffffff)" }}
        >
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Card className="shadow-lg rounded-4 border-0 p-4">
                        <Card.Body className="p-4">
                            <h4 className="text-center text-success mb-4 fw-bold">
                                ĐĂNG NHẬP NGƯỜI DÙNG
                            </h4>

                            {err && (
                                <Alert variant="danger" className="text-center">
                                    {err}
                                </Alert>
                            )}

                            <Form onSubmit={login}>
                                {info.map((i) => (
                                    <Form.Group key={i.field} className="mb-3" controlId={i.field}>
                                        <Form.Label className="fw-semibold">{i.title}</Form.Label>
                                        <Form.Control
                                            value={user[i.field] || ""}
                                            onChange={(e) =>
                                                setUser({ ...user, [i.field]: e.target.value })
                                            }
                                            type={i.type}
                                            placeholder={i.title}
                                            required
                                            className="rounded-3"
                                        />
                                    </Form.Group>
                                ))}

                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <MySpinner />
                                    </div>
                                ) : (
                                    <div className="d-grid">
                                        <Button variant="success" type="submit" className="rounded-3 fw-semibold">
                                            Đăng nhập
                                        </Button>
                                    </div>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;