import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { endpoints } from "../../Configs/Apis";
import useFetchApi from "../../Configs/FetchApi";
import defaultCourseImg from '../../assets/image/defaultCourseImg.jpg'
import CoursesList from "./CoursesList";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
  const [q] = useSearchParams();
  const {loading,fetchApi  }= useFetchApi();
  const nav = useNavigate();

  const loadCourses = async () => {
    try {
    //   setLoading(true);
      let url = `${endpoints["courses"]}?page=${page}&isPublic=true`;

      let cate = q.get("cateId");
      if (cate) url = `${url}&cateId=${cate}`;

      console.info("Fetch:", url);
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
  }, [page, q]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const loadMore = () => setPage(page + 1);

  return (
    <>
      
      <CoursesList courses={courses} loadMore={loadMore} page={page} loading={loading}/>
    </>
  );
};

export default Courses;
