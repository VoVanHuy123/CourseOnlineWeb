// import React, { useContext, useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button, Accordion, ListGroup } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import useFetchApi from "../../Configs/FetchApi";
// import { endpoints } from "../../Configs/Apis";
// import defaultCourseImage from "../../assets/image/defaultCourseImg.jpg"
// import { CurrentCourseContext, MyUserContext } from "../../Configs/Context";
// import defaultAvatar from "../../assets/image/defaultAvatar.png"
// import ChatDrawer from "../chat/ChatBox";
// import ChatDrawerFloat from "../chat/ChatBox";
// import { getOrCreateConversation } from "../../Configs/filrebaseFunc";

// const CourseDetails = () => {
//   const { id } = useParams(); // 👈 lấy id từ URL
//   const [course, setCourse] = useState(null);
//   const [teacher,setTeacher]=useState({});
//   const { loading, fetchApi } = useFetchApi();
//   const [user,] = useContext(MyUserContext);
//   const [isHaveEnrollment, setIsHaveEnrollment] = useState(false);
//   const nav = useNavigate();
//   const [courseId, courseIdDispatch] = useContext(CurrentCourseContext);
//   const [result, setResult] = useState(null);
//   // const [opentChat,setOpenChat] = useState(false)
//   const [chatDrawerFloatOpen, setChatDrawerFloatOpen] = useState(false);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [selectedReceiver, setSelectedReceiver] = useState(null);

//   const handleStartChat = async () => {
//     const convoId = await getOrCreateConversation(teacher.id, user?.id);
//     setSelectedConversation(convoId);
//     setSelectedReceiver(teacher);
//     setChatDrawerFloatOpen(true);
//   };
//   const loadCourse = async () => {
//     const res = await fetchApi({
//       url: endpoints['courses_details'](id)
//     })
//     if (res.status === 200){
//       setCourse(res.data)
//       setTeacher({
//       id: res.data.teacherId,        // cần backend trả về teacherId
//       fullName: res.data.teacherName,
//       avatar: res.data.teacherAvatar,
//       role: "teacher"
//     });
//     }
//   };
//   const checkEnrollment = async () => {
//     if (user?.id) {
//       const res = await fetchApi({
//         url: `${endpoints['check_enrollment'](id, user.id)}`
//       })
//       if (res.status === 200) setIsHaveEnrollment(true);
//       console.log(endpoints['check_enrollment'](id, user.id))
//       console.log("data", res.data)
//     }

//   };

//   useEffect(() => {
//     loadCourse();
//     checkEnrollment();
//     const loadResult = async () => {
//       const res = await fetchApi({
//         url: endpoints['get_course_progress'](id)
//       })
//       if (res.status == 200) setResult(res.data)
//       // console.log("REsdata: ", res.data)
//     };
//     loadResult();
//   }, [])
//   if (!course) return <p>Loading...</p>;

//   return (
//     <Container className="my-4">
//       <Row>
//         {/* Thông tin khóa học bên trái */}
//         <Col md={8}>
//           <h2 className="fw-bold">{course.title}</h2>
//           <p>{course.description}</p>
//           <p className="text-muted">
//             {course.lessonsCount || 0} bài học •{" "}
//             {course.duration ? `${course.duration} giờ` : "Chưa cập nhật"}
//           </p>

//           <h5 className="mt-4">Nội dung khóa học</h5>
//           <Accordion defaultActiveKey="0" alwaysOpen>
//             {course.chapters &&
//               course.chapters.map((chapter, index) => (
//                 <Accordion.Item eventKey={index.toString()} key={chapter.id}>
//                   <Accordion.Header>
//                     {chapter.orderIndex}. {chapter.title}
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <ListGroup variant="flush">
//                       <ListGroup.Item>
//                         <em>Mô tả:</em> {chapter.description}
//                       </ListGroup.Item>
//                       {/* Nếu sau này có lessons thì map ở đây */}
//                     </ListGroup>
//                     {user?.role == "teacher" && <div className="d-flex justify-content-end mt-2">
//                       <Button
//                         variant="success"
//                         size="sm"
//                         onClick={() => nav(`/chapters/${chapter.id}`)}
//                       >
//                         Xem chi tiết
//                       </Button>
//                     </div>}

//                   </Accordion.Body>
//                 </Accordion.Item>
//               ))}
//           </Accordion>
//         </Col>

//         {/* Phần video + đăng ký bên phải */}
//         <Col md={4}>
//           <Card className="shadow-sm">
//             {course.introVideoUrl ? (
//               <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
//                 <iframe
//                   src={course.introVideoUrl}
//                   title="Intro video"
//                   allowFullScreen
//                   style={{
//                     border: 0,
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 ></iframe>
//               </div>

//             ) : (

//               <Card.Img
//                 src={course.imageUrl || defaultCourseImage}
//                 alt={course.title}
//                 className="object-fit-cover rounded-top-3"
//               />

//             )}


//             <Card.Body className="text-center">
//               <h5 className="text-danger fw-bold">{course.tuitionFee.toLocaleString()} VNĐ</h5>
//               {user?.role == "teacher" ?
//                 <>
//                   <div className="d-flex justify-content-center gap-2">

//                     <Button variant="success" className="w-100 mb-3" onClick={() => nav(`/courses/${course.id}/create-chapter`)}>
//                       Thêm chương
//                     </Button>
//                     <Button variant="success" className="w-100 mb-3" onClick={() => { nav(`/courses/${course.id}/students`) }}>
//                       Thông tin đăng kí
//                     </Button>
//                   </div>
//                   <Button variant="success" className="w-100 mb-3" onClick={() => nav(`/courses/update/${course.id}`)}>
//                     Chỉnh sửa
//                   </Button>

//                 </>
//                 :
//                 <>
//                   {!isHaveEnrollment ?
//                     <Button variant="primary" className="w-100 mb-3" onClick={() => nav(`/courses/${course.id}/payments`)}>
//                       ĐĂNG KÝ HỌC
//                     </Button> :
//                     <Button variant="success" className="w-100 mb-3" onClick={() => {
//                       courseIdDispatch({
//                         type: "update",
//                         payload: course.id
//                       });
//                       nav(`/courses/content/${course.id}`)
//                     }}>
//                       VÀO HỌC
//                     </Button>
//                   }
//                 </>
//               }


//               <ul className="list-unstyled text-start small">
//                 <li>📌 Trình độ cơ bản</li>
//                 <li>📚 Tổng số {course.chapters?.length || 0} chương</li>
//                 <li>⏳ Thời lượng {course.duration || "Chưa cập nhật"}</li>
//                 <li>💻 Học mọi lúc, mọi nơi</li>
//               </ul>
//               {user?.role == "student" && isHaveEnrollment &&
//                 <div className="w-full">
//                   <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow={result ? (result.totalCompleteLessons / result.totalLessons * 100).toFixed(0) : 0} aria-valuemin="0" aria-valuemax="100">
//                     <div
//                       className="progress-bar text-bg-success"
//                       style={{
//                         width: result ? `${(result.totalCompleteLessons / result.totalLessons * 100).toFixed(0)}%` : "0%"
//                       }}
//                     >
//                       {result ? `${(result.totalCompleteLessons / result.totalLessons * 100).toFixed(0)}%` : "0%"}
//                     </div>
//                   </div>
//                 </div>
//               }
//             </Card.Body>
//           </Card>
//           {user?.role == "student" && <Card className="mt-4">
//             <Card.Body className="d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center">
//                 <img
//                   src={course.teacherAvatar || defaultAvatar}
//                   alt={course.teacherName}
//                   className="rounded-circle me-3"
//                   style={{
//                     width: "50px",
//                     height: "50px",
//                     objectFit: "cover",
//                     border: "2px solid #ddd",
//                   }}
//                 />
//                 <div>
//                   <h6 className="mb-0 fw-bold">{course.teacherName}</h6>
//                   <small className="text-muted">{course.teacherEmail}</small>
//                   <br />
//                   <small>📞 {course.teacherNumber}</small>
//                 </div>
//               </div>
//               <div className="">
//                 <Button variant="success" onClick={() => setChatDrawerFloatOpen(true)}>Chat</Button>
//               </div>
//             </Card.Body>
//           </Card>}

//         </Col>
//       </Row>
//       <ChatDrawerFloat
//   currentUser={user}
//   conversationId={selectedConversation}
//   receiver={selectedReceiver}
//   open={chatDrawerFloatOpen}
//   setOpen={setChatDrawerFloatOpen}
// />

//     </Container>
//   );
// };

// export default CourseDetails;
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import defaultCourseImage from "../../assets/image/defaultCourseImg.jpg";
import { CurrentCourseContext, MyUserContext } from "../../Configs/Context";
import defaultAvatar from "../../assets/image/defaultAvatar.png";
import ChatDrawerFloat from "../chat/ChatBox";
import { getOrCreateConversation } from "../../Configs/filrebaseFunc";
import ChatBox from "../chat/ChatBox";

const CourseDetails = () => {
  const { id } = useParams(); // 👈 lấy id từ URL
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const { loading, fetchApi } = useFetchApi();
  const [user] = useContext(MyUserContext);
  const [isHaveEnrollment, setIsHaveEnrollment] = useState(false);
  const nav = useNavigate();
  const [courseId, courseIdDispatch] = useContext(CurrentCourseContext);
  const [result, setResult] = useState(null);

  const [chatDrawerFloatOpen, setChatDrawerFloatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  // ✅ Bắt đầu chat
  const handleStartChat = async () => {
    if (!teacher?.id || !user?.id) {
      console.warn("❌ Thiếu teacher.id hoặc user.id => Không thể tạo conversation");
      return;
    }

    try {
      console.log("🔎 Creating/Getting conversation with:", teacher, user);
      const convoId = await getOrCreateConversation(
        { id: teacher.id, name: teacher.fullName, avatar: teacher.avatar },
        { id: user.id, name: `${user.first_name} ${user.last_name}`, avatar: user.avatar }
      );

      console.log("✅ Conversation ID:", convoId);
      setSelectedConversation(convoId);
      setSelectedReceiver(teacher);
      setChatDrawerFloatOpen(true);
    } catch (err) {
      console.error("❌ Lỗi khi tạo hoặc lấy conversation:", err);
    }
  };

  const loadCourse = async () => {
    const res = await fetchApi({
      url: endpoints["courses_details"](id),
    });
    if (res.status === 200) {
      setCourse(res.data);

      // ✅ Tạo teacher object chuẩn
      setTeacher({
        id: res.data.teacherId, // cần backend trả teacherId
        fullName: res.data.teacherName,
        avatar: res.data.teacherAvatar,
        role: "teacher",
        email: res.data.teacherEmail,
        phone: res.data.teacherNumber,
      });
    }
  };

  const checkEnrollment = async () => {
    if (user?.id) {
      const res = await fetchApi({
        url: `${endpoints["check_enrollment"](id, user.id)}`,
      });
      if (res.status === 200) setIsHaveEnrollment(true);
    }
  };

  useEffect(() => {
    loadCourse();
    checkEnrollment();

    const loadResult = async () => {
      const res = await fetchApi({
        url: endpoints["get_course_progress"](id),
      });
      if (res.status === 200) setResult(res.data);
    };
    loadResult();
  }, [id]);

  if (!course) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" /> Đang tải...
      </Container>
    );
  }

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
                    </ListGroup>
                    {user?.role === "teacher" && (
                      <div className="d-flex justify-content-end mt-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => nav(`/chapters/${chapter.id}`)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </Col>

        {/* Phần video + đăng ký bên phải */}
        <Col md={4}>
          <Card className="shadow-sm">
            {course.introVideoUrl ? (
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                <iframe
                  src={course.introVideoUrl}
                  title="Intro video"
                  allowFullScreen
                  style={{
                    border: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            ) : (
              <Card.Img
                src={course.imageUrl || defaultCourseImage}
                alt={course.title}
                className="object-fit-cover rounded-top-3"
              />
            )}

            <Card.Body className="text-center">
              <h5 className="text-danger fw-bold">
                {course.tuitionFee.toLocaleString()} VNĐ
              </h5>
              {user?.role === "teacher" ? (
                <>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="success"
                      className="w-100 mb-3"
                      onClick={() => nav(`/courses/${course.id}/create-chapter`)}
                    >
                      Thêm chương
                    </Button>
                    <Button
                      variant="success"
                      className="w-100 mb-3"
                      onClick={() => nav(`/courses/${course.id}/students`)}
                    >
                      Thông tin đăng kí
                    </Button>
                  </div>
                  <Button
                    variant="success"
                    className="w-100 mb-3"
                    onClick={() => nav(`/courses/update/${course.id}`)}
                  >
                    Chỉnh sửa
                  </Button>
                </>
              ) : (
                <>
                  {!isHaveEnrollment ? (
                    <Button
                      variant="primary"
                      className="w-100 mb-3"
                      onClick={() => nav(`/courses/${course.id}/payments`)}
                    >
                      ĐĂNG KÝ HỌC
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="w-100 mb-3"
                      onClick={() => {
                        courseIdDispatch({
                          type: "update",
                          payload: course.id,
                        });
                        nav(`/courses/content/${course.id}`);
                      }}
                    >
                      VÀO HỌC
                    </Button>
                  )}
                </>
              )}

              <ul className="list-unstyled text-start small">
                <li>📌 Trình độ cơ bản</li>
                <li>📚 Tổng số {course.chapters?.length || 0} chương</li>
                <li>⏳ Thời lượng {course.duration || "Chưa cập nhật"}</li>
                <li>💻 Học mọi lúc, mọi nơi</li>
              </ul>

              {user?.role === "student" && isHaveEnrollment && (
                <div className="w-full">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow={
                      result
                        ? (
                            (result.totalCompleteLessons /
                              result.totalLessons) *
                            100
                          ).toFixed(0)
                        : 0
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar text-bg-success"
                      style={{
                        width: result
                          ? `${
                              (
                                (result.totalCompleteLessons /
                                  result.totalLessons) *
                                100
                              ).toFixed(0)
                            }%`
                          : "0%",
                      }}
                    >
                      {result
                        ? `${(
                            (result.totalCompleteLessons /
                              result.totalLessons) *
                            100
                          ).toFixed(0)}%`
                        : "0%"}
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {user?.role === "student" && teacher && (
            <Card className="mt-4">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={teacher.avatar || defaultAvatar}
                    alt={teacher.fullName}
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      border: "2px solid #ddd",
                    }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{teacher.fullName}</h6>
                    <small className="text-muted">{teacher.email}</small>
                    <br />
                    <small>📞 {teacher.phone}</small>
                  </div>
                </div>
                <div>
                  <Button variant="success" onClick={handleStartChat}>
                    Chat
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Drawer chat */}
      <ChatBox
        currentUser={user}
        conversationId={selectedConversation}
        receiver={selectedReceiver}
        open={chatDrawerFloatOpen}
        setOpen={setChatDrawerFloatOpen}
      />
    </Container>
  );
};

export default CourseDetails;
