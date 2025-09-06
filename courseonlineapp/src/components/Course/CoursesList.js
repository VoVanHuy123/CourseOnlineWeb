

import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { endpoints } from "../../Configs/Apis";
import useFetchApi from "../../Configs/FetchApi";
import defaultCourseImg from '../../assets/image/defaultCourseImg.jpg'
const CoursesList=({courses,loading,loadMore,page})=>{
    const nav = useNavigate();
    return (
    <>
      {courses.length === 0 && !loading && (
        <Alert variant="warning" className="mt-3 text-center shadow-sm">
          😥 Không có khóa học nào!
        </Alert>
      )}

      <Row className="g-4 mt-2">
        {courses.map((c) => (
          <Col md={3} sm={6} xs={12} key={c.id}>
            <Card onClick={()=>nav(`/courses/${c?.id}`)} className="h-100 shadow-sm rounded-3 course-card border border-light-subtle ">
              <div className="ratio ratio-16x9">
                <Card.Img
                  src={c.imageUrl || defaultCourseImg}
                  alt={c.title}
                  className="object-fit-cover rounded-top-3"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 text-truncate" title={c.title}>
                  {c.title}
                </Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {c.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="fw-bold text-danger">
                    {c.tuitionFee.toLocaleString()} VNĐ
                  </span>
                  <Button variant="primary" size="sm">
                    Xem chi tiết
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && <MySpinner />}

      {page > 0 && courses.length > 0 && !loading && (
        <div className="text-center mt-3 mb-4">
          <Button variant="outline-info" onClick={loadMore}>
            Xem thêm...
          </Button>
        </div>
      )}
    </>
  );
}
export default CoursesList;