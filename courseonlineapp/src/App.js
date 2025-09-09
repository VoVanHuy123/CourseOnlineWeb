import logo from './logo.svg';
import './App.css';
import { MyUserContext } from './Configs/Context';
import { useReducer } from 'react';
import { MyUserReducer } from './components/Reducers/MyUserReducer';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseDetails from './components/Course/CourseDetails';
import CourseContent from './components/Course/CourseContent';
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

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  // const [cartCounter, cartDispatch] = useReducer(MyCartReducer, 0);

  return (

    <MyUserContext.Provider value={[user, dispatch]}>
      {/* <MyCartContext.Provider value={[cartCounter, cartDispatch]}> */}
      <BrowserRouter>
        <Header />
        {user?.role ==="teacher" ? <TeacherDrawerMenu/> :<></>}
        

        <Routes>
          <Route path="/" element={<>
          {user?.role == "teacher" ? <TeacherHome/>: <Home />}
         
          </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
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
          
        </Routes>

        <Footer />
      </BrowserRouter>
      {/* </MyCartContext.Provider> */}
    </MyUserContext.Provider>
  )
}

export default App;
