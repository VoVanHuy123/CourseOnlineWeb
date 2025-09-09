import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useParams, useSearchParams } from "react-router-dom";


const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
//   const [loading, setLoading] = useState(false);
const [chaptersData,setChaptersData] = useState([]);
  const {loading,fetchApi}=useFetchApi();
  const {courseId} = useParams();

  const loadChapters = async () => {
    const res = await fetchApi({
        url: endpoints['courses_chaters'](courseId)
    })
    if(res.status===200){

        setChaptersData(res.data)
        console.log(res.data);
    } 
  };
  const handleLessonClick= async(lessonId)=>{
        const res = await fetchApi({
            url:endpoints['lesson_detail'](lessonId)
        })
        console.log(res.data)
        if(res.status===200) setSelectedLesson(res.data)

  };
useEffect(()=>{
    loadChapters();
},[])

  return (
    <div className="px-4">
    <Row className="">
      {/* Sidebar */}
      <Col md={3} style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <h5 className="p-3">Nội dung khóa học</h5>
        <Accordion defaultActiveKey="0" className="pl-4">
          {chaptersData.map((chapter, cIndex) => (
            <Accordion.Item eventKey={cIndex.toString()} key={chapter.id}>
              <Accordion.Header>
                {cIndex + 1}. {chapter.title}
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {chapter.lessons.map((lesson, lIndex) => (
                    <ListGroup.Item
                      key={lesson.id}
                      action
                      active={selectedLesson?.id === lesson.id}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      {cIndex + 1}.{lIndex + 1} {lesson.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>

      {/* Main content */}
      <Col md={9} className="p-4">
        {selectedLesson ? (
          <Card>
            <Card.Body>
              <h3>{selectedLesson.title}</h3>
              <p>{selectedLesson.description}</p>
              {selectedLesson.videoUrl ? (
                <video key={selectedLesson.videoUrl} width="100%" controls>
                  <source src={selectedLesson.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src="https://picsum.photos/800/400"
                  alt="lesson"
                  className="img-fluid rounded"
                />
              )}
            </Card.Body>
          </Card>
        ) : (
          <div className="text-center text-muted">
            <p>👉 Chọn một bài học để bắt đầu</p>
          </div>
        )}
      </Col>
    </Row>
    </div>
  );
};

export default CourseContent;
