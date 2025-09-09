import { useEffect, useState } from "react";
import { endpoints } from "../../Configs/Apis";
import useFetchApi from "../../Configs/FetchApi";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import defaultCourseImg from '../../assets/image/defaultCourseImg.jpg'
import { useNavigate, useSearchParams } from "react-router-dom";
import '../../assets/css/style.css';

const CoursesList = ({api,params}) => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const {loading,fetchApi  }= useFetchApi();
  const nav = useNavigate();
  // const {q} =useSearchParams();
  const loadCourses = async () => {
    try {
    //   setLoading(true);
      let url = `${api}?page=${page}`;

      // let cate = q.get("cateId");
      // if (cate) url = `${url}&cateId=${cate}`;

      // param từ props
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
    }
    console.log(url)

      let res = await fetchApi({url:url});

      if (res.data.length > 0) {
        if (page === 1) setCourses(res.data);
        else setCourses([...courses, ...res.data]);
      } else {
        setPage(0);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
    }
  };

  useEffect(() => {
    if (page > 0) loadCourses();
  }, [page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [q]);

  const loadMore = () => setPage(page + 1);

  return (
    <>
      {courses.length === 0 && !loading && (
        <Alert variant="warning" className="mt-3 text-center shadow-sm">
          😥 Không có khóa học nào!
        </Alert>
      )}

      <Row className="g-4 mt-2 mb-4">
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
                <Card.Text className="text-muted small flex-grow-1 line-clamp-2">
                  {c.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="fw-bold text-danger">
                    {c.tuitionFee.toLocaleString()} VNĐ
                  </span>
                  
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
};

export default CoursesList;
