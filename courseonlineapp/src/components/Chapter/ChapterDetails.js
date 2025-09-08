import { useEffect, useState } from "react";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { useNavigate, useParams } from "react-router-dom";
import LessonList from "../Lesson/LessonList";
import { Badge, Button, Card, Container } from "react-bootstrap";

const ChapterDetail = () => {
    const [lessons, setLessons] = useState([]);
    const { loading, fetchApi } = useFetchApi();
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState({});
    const nav = useNavigate();
    const loadChapter = async () => {
        const res = await fetchApi({
            url: `${endpoints['chapters']}/${chapterId}`
        })
        
        if (res.status === 200) setChapter(res.data)
    };
    const loadLessons = async () => {
        const res = await fetchApi({
            url: `${endpoints['lessons']}?chapterId=${chapterId}`
        })
        if (res.status === 200) setLessons(res.data);
    }
    useEffect(() => {
        loadChapter();
        loadLessons();
    }, [])


    const Chapterinfo = ({ chapter }) => {

if (!chapter) {
  return <p>Không có thông tin chương.</p>;
}

return (
  <Card className="my-3 shadow-sm">
    <Card.Body className="d-flex justify-content-between">
      {/* Thông tin chapter */}
      <div className="flex-grow-1 me-3">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="fw-bold">{chapter.orderIndex}.</span>
          <h5 className="mb-0">{chapter.title}</h5>
          {chapter.courseTitle && (
            <Badge bg="info" className="ms-2">
              {chapter.courseTitle}
            </Badge>
          )}
        </div>

        {/* Mô tả */}
        <p
          className="text-muted mb-2"
          style={{
            maxWidth: "600px",        // giới hạn chiều rộng
            whiteSpace: "nowrap",     // không xuống dòng
            overflow: "hidden",       // ẩn phần dư
            textOverflow: "ellipsis", // thêm "..."
          }}
          title={chapter.description} // tooltip đầy đủ khi hover
        >
          {chapter.description || "Không có mô tả"}
        </p>

        {/* Ngày tạo & cập nhật */}
        <div className="text-muted small">
            <span>Thứ tự chương: {chapter?.orderIndex}</span>
          <span className="ms-3">
            Tạo:{" "}
            {chapter.createdAt
              ? new Date(chapter.createdAt).toLocaleDateString()
              : "-"}
          </span>
          <span className="ms-3">
            Cập nhật:{" "}
            {chapter.updatedAt
              ? new Date(chapter.updatedAt).toLocaleDateString()
              : "-"}
          </span>
        </div>
      </div>

      {/* Nút chỉnh sửa căn giữa bên phải */}
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="primary"
          onClick={() => nav(`/chapters/edit/${chapter.id}`)}
        >
          Chỉnh sửa
        </Button>
        <Button
          variant="success"
          onClick={() => nav(`/chapters/${chapter.id}/create-lesson`)}
        >
          Thêm Bài Học
        </Button>
      </div>
    </Card.Body>
  </Card>
);
    };






    return (<Container>
        <Chapterinfo chapter={chapter}/>
        <LessonList lessons={lessons} />
    </Container>);
}
export default ChapterDetail;