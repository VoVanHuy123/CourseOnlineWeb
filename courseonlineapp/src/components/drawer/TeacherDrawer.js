import React, { useContext, useState } from "react";
import { Button, Offcanvas, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyUserContext } from "../../Configs/Context";

const TeacherDrawerMenu = () => {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user,] = useContext(MyUserContext);
  
  return (
    <>
      {!show && (
  <Button
    variant="primary"
    onClick={handleShow}
    style={{
      position: "fixed",
      top: "50%",
      left: "0px",
      zIndex: 1050
    }}
  >
    Menu
  </Button>
)}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Quản lý khóa học</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {user?.isVerify == false ? <Link className="nav-link"  onClick={()=>setShow(false)}>Cần được xác thực để tạo khóa học</Link>:<Link className="nav-link" to="/create-course" onClick={()=>setShow(false)}>Tạo khóa học</Link>}
              
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/teacher-home" onClick={()=>setShow(false)}>Khóa học của tôi</Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TeacherDrawerMenu;
