import React, { useEffect, useMemo, useState } from "react";
import { Accordion, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useParams } from "react-router-dom";


const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonWithStatus, setSelectedLessonWithStatus] = useState(null)
  //   const [loading, setLoading] = useState(false);
  const [chaptersData, setChaptersData] = useState([]);
  const [lessonsData, setlessonsData] = useState([]);
  const { loading, fetchApi } = useFetchApi();
  const { courseId } = useParams();
  const [activeChapter, setActiveChapter] = useState("0");

  const loadChapters = async () => {
    const res = await fetchApi({
      url: endpoints['courses_chaters'](courseId)

    })
    if (res.status === 200) {
      console.log("loadlaij")
      setChaptersData(res.data)
    }
  };
  const loadLessons = async () => {
    const res = await fetchApi({
      url: endpoints['get_course_lessons'](courseId)
    })
    if (res.status === 200) {

      setlessonsData(res.data)
    }
  };
  const handleNext = async (lesson, nextLesson) => {
    if (!nextLesson.isCompleted) {
      const res = await fetchApi({
        method : "POST",
        url : endpoints['complete_lesson'](lesson?.id)
      })
      if(res.status===200){

        nextLesson.isLocked = false;
        lesson.isCompleted = true;
      }
      }
    handleLessonClick(nextLesson);
  };
  const handleLessonClick = async (lesson) => {
    setSelectedLessonWithStatus(lesson);
    // 🔑 mở đúng chapter
    const chapter = chaptersData.find((c) => c.id === lesson.chapterId);
    if (chapter) {
      const chapterIndex = chaptersData.findIndex((c) => c.id === chapter.id);
      setActiveChapter(chapterIndex.toString());
    }
    const res = await fetchApi({
      url: endpoints['lesson_detail'](lesson?.id)
    })
    console.log(res.data)
    if (res.status === 200) setSelectedLesson(res.data)

  };

  const handlePrevNext = async (direction) => {
    if (!selectedLesson) return;

    const currentIndex = lessonsData.findIndex((l) => l.id === selectedLesson.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= lessonsData.length) return;

    const nextLesson = lessonsData[nextIndex];

    if (direction === "next") {
      if (selectedLessonWithStatus.isCompleted) {

        handleLessonClick(nextLesson);
      } else {
        if (window.confirm("Bạn chưa hoàn thành bài này. Bạn có chắc muốn qua bài tiếp theo?")) {
          await handleNext(selectedLessonWithStatus, nextLesson); // tạo progress cho lesson mới
        }
      }
    } else {
      handleLessonClick(nextLesson);
    }
  };
  useEffect(() => {
    loadChapters();
    loadLessons();
  }, [])
  // userE

  const chaptersWithLessons = useMemo(() => {
    return chaptersData.map((chapter) => ({
      ...chapter,
      lessons: lessonsData.filter((lesson) => lesson.chapterId === chapter.id),
    }));
  }, [chaptersData, lessonsData]);


  return (
    <div className="px-4">
      <Row className="">
        {/* Sidebar */}
        <Col md={3} style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <h5 className="p-3">Nội dung khóa học</h5>
          <Accordion activeKey={activeChapter} onSelect={(key) => setActiveChapter(key)} className="pl-4">
            {chaptersWithLessons.map((chapter, cIndex) => (
              <Accordion.Item eventKey={cIndex.toString()} key={chapter.id}>
                <Accordion.Header>
                  {cIndex + 1}. {chapter.title}
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {chapter.lessons.length > 0 ? (
                      chapter.lessons.map((lesson, lIndex) => (
                        <ListGroup.Item
                          key={lesson.id}
                          action={!lesson.isLocked} // chỉ cho click nếu không bị khóa
                          active={selectedLesson?.id === lesson.id}
                          onClick={() => !lesson.isLocked && handleLessonClick(lesson)}
                          className={`d-flex align-items-center justify-content-between 
      ${lesson.isLocked ? "bg-light text-muted" : "fw-bold"} 
      rounded-3 my-1`}
                          style={{
                            cursor: lesson.isLocked ? "not-allowed" : "pointer",
                            opacity: lesson.isLocked ? 0.6 : 1,
                          }}
                        >
                          <span>
                            {cIndex + 1}.{lIndex + 1} {lesson.title}
                          </span>
                          {lesson.isCompleted && (
                            <span style={{ color: "green", marginLeft: 8 }}>✓</span>
                          )}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div className="text-muted">Chưa có bài học</div>
                    )}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>

        {/* Main content */}
        <Col md={9} className="p-4">
          {selectedLesson ? (
            <>
              <Card>
                <Card.Body>
                  <h3>{selectedLesson.title}</h3>
                  <p>{selectedLesson.description}</p>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9", // Giữ khung 16:9 cố định
                      backgroundColor: "#000", // nền đen khi chưa có video
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    {selectedLesson.videoUrl ? (
                      <video
                        key={selectedLesson.videoUrl}
                        width="100%"
                        height="100%"
                        controls
                        style={{ objectFit: "contain" }}
                      >
                        <source src={selectedLesson.videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div
                        style={{
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        Không có video
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>

              <div className="d-flex justify-content-between mt-3 border-top pt-3">
                <Button
                  variant="secondary"
                  disabled={
                    lessonsData.findIndex((l) => l.id === selectedLesson.id) === 0
                  }
                  onClick={() => handlePrevNext("prev")}
                >
                  ⬅ Bài trước
                </Button>

                <Button
                  variant="primary"
                  disabled={
                    lessonsData.findIndex((l) => l.id === selectedLesson.id) ===
                    lessonsData.length - 1
                  }
                  onClick={() => handlePrevNext("next")}
                >
                  Bài tiếp theo ➡
                </Button>
              </div></>
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
