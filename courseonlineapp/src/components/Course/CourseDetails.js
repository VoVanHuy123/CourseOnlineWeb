import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import defaultCourseImage from "../../assets/image/defaultCourseImg.jpg"

const CourseDetails = () => {
  const { id } = useParams(); // 👈 lấy id từ URL
  const [course, setCourse] = useState(null);
  const {loading,fetchApi}= useFetchApi();

  const loadCourse=async ()=>{
    const res =await fetchApi({
        url: endpoints['courses_details'](id)
    })
    if(res.status===200) setCourse(res.data)
  };
  useEffect(()=>{
    loadCourse();
  },[])
  if (!course) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <Row>
        {/* Thông tin khóa học bên trái */}
        <Col md={8}>
          <h2 className="fw-bold">{course.title}</h2>
          <p>{course.description}</p>
          <p className="text-muted">
            {course.lessonsCount || 0} bài học •{" "}
            {course.duration ? `${course.duration} giờ` : "Chưa cập nhật"}
          </p>

          <h5 className="mt-4">Nội dung khóa học</h5>
          <Accordion defaultActiveKey="0" alwaysOpen>
            {course.chapters &&
              course.chapters.map((chapter, index) => (
                <Accordion.Item eventKey={index.toString()} key={chapter.id}>
                  <Accordion.Header>
                    {chapter.orderIndex}. {chapter.title}
                  </Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <em>Mô tả:</em> {chapter.description}
                      </ListGroup.Item>
                      {/* Nếu sau này có lessons thì map ở đây */}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </Col>

        {/* Phần video + đăng ký bên phải */}
        <Col md={4}>
          <Card className="shadow-sm">
            {course.introVideoUrl ? (
              <div className="ratio ratio-16x9">
                <iframe
                  src={course.introVideoUrl}
                  title="Intro video"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <Card.Img variant="top" src={course.imageUrl || defaultCourseImage} />
            )}
            <Card.Body className="text-center">
              <h5 className="text-danger fw-bold">{course.tuitionFee.toLocaleString()} VNĐ</h5>
              <Button variant="primary" className="w-100 mb-3">
                ĐĂNG KÝ HỌC
              </Button>
              <ul className="list-unstyled text-start small">
                <li>📌 Trình độ cơ bản</li>
                <li>📚 Tổng số {course.chapters?.length || 0} chương</li>
                <li>⏳ Thời lượng {course.duration || "Chưa cập nhật"}</li>
                <li>💻 Học mọi lúc, mọi nơi</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
