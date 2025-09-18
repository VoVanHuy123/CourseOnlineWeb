import { Navbar, Nav, Container, Button, Dropdown, Image } from "react-bootstrap";
import { useContext } from "react";
import { MyUserContext } from "../../Configs/Context";
import { useNavigate } from "react-router-dom";
import defaultAvater from "../../assets/image/defaultAvatar.png"
import cookie from 'react-cookies'

const MainHeader = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const nav = useNavigate();

  const logout = () => {
    cookie.remove("token");
    dispatch({ type: "logout" });
    nav("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          onClick={()=>nav("/")}
          className="fw-bold text-success fs-4"
          style={{ letterSpacing: "1px" }}
        >
          CourseOnline
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user ? (
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
                <Dropdown.Item onClick={()=>nav("/info")}><i class="bi bi-info-circle-fill"></i> Thông tin người dùng</Dropdown.Item>
                <Dropdown.Item onClick={()=>nav("/my-courses")}><i class="bi bi-book-half"></i> Khóa học của tôi</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  <i class="bi bi-box-arrow-right"></i> Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

export default MainHeader;
