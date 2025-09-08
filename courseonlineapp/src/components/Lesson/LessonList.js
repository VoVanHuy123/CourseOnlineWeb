import React from "react";
import { Accordion, ListGroup, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LessonList = ({ lessons }) => {
    const navigate = useNavigate();

    // lessons: mảng object {id, title, content, isPublic, createdAt, videoUrl, lessonOrder, chapterId, chapterTitle}

    // Nhóm lessons theo chapter
    const lessonsByChapter = lessons.reduce((acc, lesson) => {
        const chapterId = lesson.chapterId || 0;
        if (!acc[chapterId]) acc[chapterId] = { chapterTitle: lesson.chapterTitle, lessons: [] };
        acc[chapterId].lessons.push(lesson);
        return acc;
    }, {});

    return (
        <Accordion defaultActiveKey="0">
            {Object.entries(lessonsByChapter).map(([chapterId, chapterData], index) => (
                <Accordion.Item eventKey={index.toString()} key={chapterId}>
                    <Accordion.Header>
                        {chapterData.chapterTitle || `Chương ${chapterId}`}
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {chapterData.lessons
                                .sort((a, b) => a.lessonOrder - b.lessonOrder)
                                .map((lesson) => (
                                    <ListGroup.Item
                                        key={lesson.id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        {/* Phần thông tin chính */}
                                        <div className="d-flex align-items-center flex-grow-1 gap-3">
                                            {/* Thứ tự bài học + title */}
                                            <div className="me-2" style={{ minWidth: "120px" }}>
                                                <span className="fw-bold">Bài hoc {lesson.lessonOrder}.</span> {lesson.title}
                                            </div>

                                            {/* Nội dung bài học, chiếm phần lớn */}
                                            <div className="flex-grow-1 text-truncate" title={lesson.content} style={{ maxWidth: "400px" }}>
                                                {lesson.content}
                                            </div>

                                            {/* Ngày tạo và trạng thái, gần cuối */}
                                            <div className="d-flex align-items-center gap-2 ms-auto">
                                                <span className="text-muted" style={{ whiteSpace: "nowrap" }}>
                                                    {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : ""}
                                                </span>
                                                <Badge bg={lesson.isPublic ? "success" : "secondary"}>
                                                    {lesson.isPublic ? "Đã phát hành" : "Chưa phát hành"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Nút nằm ngoài cùng bên phải */}
                                        <div className="d-flex gap-2 ms-3">
                                            {lesson.videoUrl && (
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => window.open(lesson.videoUrl, "_blank")}
                                                >
                                                    Xem video
                                                </Button>
                                            )}
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => navigate(`/lessons/edit/${lesson.id}`)}
                                            >
                                                chỉnh sửa
                                            </Button>
                                        </div>
                                    </ListGroup.Item>


                                ))}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default LessonList;
