import logo from './logo.svg';
import './App.css';
import { CurrentCourseContext, MyUserContext } from './Configs/Context';
import { useEffect, useReducer, useState } from 'react';
import { MyUserReducer } from './components/Reducers/MyUserReducer';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import CourseDetails from './components/Course/CourseDetails';
import CourseContent from './components/Course/CourseContent';
import CoursePayments from './components/Course/CoursePayments';
import PrivateRoute from './components/checkRoute/checkRoutes';
import MyCourse from './components/student/MyCoursePage';
import TeacherHome from './components/teacher/TeacherHomePage';
import TeacherDrawerMenu from './components/drawer/TeacherDrawer';
import TeacherCreateCourse from './components/teacher/TeacherCreateCourse';
import TeacherUpdateCourse from './components/teacher/TeacherUpdateCourse';
import TeacherCreateChapter from './components/teacher/TeacherCreateChapter';
import ChapterDetail from './components/Chapter/ChapterDetails';
import TeacherUpdateChapter from './components/teacher/TeacherUpdateChapter';
import TeacherCreateLesson from './components/teacher/TeacherCreateLesson';
import TeacherUpdateLesson from './components/teacher/TeacherUpdateLesson';
import { CurrentCourseReducer } from './components/Reducers/CurrentCourseReducer';
import CourseEnrolledStudents from './components/teacher/CourseEnrolledStudents';
import AdminHomePage from './components/admin/AdminHomePage';
import StatsPage from './components/admin/StatsPage';
import useFetchApi from './Configs/FetchApi';
import { endpoints } from './Configs/Apis';
import cookie from 'react-cookies';
import ChatBox from './components/chat/ChatBox';
import ChatDrawer from './components/chat/ChatDrawer';
import UserProfile from './components/Form/UserForm';


function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [courseId, courseIdDispatch] = useReducer(CurrentCourseReducer, null);
  // const [cartCounter, cartDispatch] = useReducer(MyCartReducer, 0);
  const { fetchApi } = useFetchApi();

   useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      fetchApi({
        method: "POST",
        url: endpoints["profile"],
      }).then((res) => {
        if (res.status === 200 && res.data.isVerify) {
          dispatch({ type: "login", payload: res.data });
        } else {
          cookie.remove("token"); // token cũ -> xoá
        }
      });
    }
  }, []);
  // Quản lý cuộc trò chuyện được chọn
  const [chatState, setChatState] = useState({
    conversationId: null,
    receiver: null,
    open: false,
    listOpen: false,
  });
  return (

    <MyUserContext.Provider value={[user, dispatch]}>
      <CurrentCourseContext.Provider value = {[courseId, courseIdDispatch]}>
      <BrowserRouter>
        <Header />
        {user?.role ==="teacher" ? <TeacherDrawerMenu/> :<></>}
        
        <ChatDrawer
          currentUser={user}
          open={chatState.listOpen}
          setOpen={(val) => setChatState((prev) => ({ ...prev, listOpen: val }))}
          setChatState={setChatState}
        />

        <ChatBox
          currentUser={user}
          conversationId={chatState.conversationId}
          receiver={chatState.receiver}
          open={chatState.open}
          setOpen={(val) => setChatState((prev) => ({ ...prev, open: val }))}
        />

        <button
          onClick={() => setChatState((prev) => ({ ...prev, listOpen: true }))}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1050,
          }}
        >
          <i class="bi bi-chat-dots-fill"></i>
        </button>


        <Routes>
          <Route path="/" element={<>
          {user?.role == "teacher" ? <TeacherHome/>: <>{user?.role == "admin" ? <AdminHomePage/>:<Home />}</>}
         
          </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/info" element={<UserProfile />} />
          <Route path="/courses/:id/payments" element={
            <PrivateRoute allowedRoles={["student"]}>
              <CoursePayments />
             </PrivateRoute>
          } />
          <Route path="/stats" element={
            <PrivateRoute allowedRoles={["admin"]}>
              <StatsPage />

            </PrivateRoute>
          } />
          <Route path="/courses/content/:courseId" element={
            <PrivateRoute allowedRoles={["student"]}>
              <CourseContent />
            </PrivateRoute>
          } />
          <Route path="/courses/update/:courseId" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherUpdateCourse />
            </PrivateRoute>
          } />
          <Route path="/my-courses" element={
            <PrivateRoute allowedRoles={["student"]}>
              <MyCourse />
            </PrivateRoute>
          } />
          <Route path="/teacher-home" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherHome />
            </PrivateRoute>
          } />
          <Route path="/create-course" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherCreateCourse />
            </PrivateRoute>
          } />
          
          <Route path="/courses/:courseId/create-chapter" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherCreateChapter />
            </PrivateRoute>
          } />
          
          <Route path="/chapters/:chapterId" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <ChapterDetail />
            </PrivateRoute>
          } />
          <Route path="/chapters/edit/:chapterId" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherUpdateChapter />
            </PrivateRoute>
          } />
          <Route path="/chapters/:chapterId/create-lesson" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherCreateLesson />
            </PrivateRoute>
          } />
          <Route path="/lessons/edit/:lessonId" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <TeacherUpdateLesson />
            </PrivateRoute>
          } />
          <Route path="/courses/:courseId/students" element={
            <PrivateRoute allowedRoles={["teacher"]}>
              <CourseEnrolledStudents />
            </PrivateRoute>
          } />
          
        </Routes>

        <Footer />
      </BrowserRouter>
      {/* </MyCartContext.Provider> */}
      </CurrentCourseContext.Provider>
    </MyUserContext.Provider>
  )
}

export default App;
