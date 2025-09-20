// import React, { useContext } from "react";
// import { endpoints } from "../../Configs/Apis";
// import CoursesList from "../Course/CoursesList";
// import { MyUserContext } from "../../Configs/Context";
// import { Container } from "react-bootstrap";

// const TeacherHome=()=>{
//     const [user,] = useContext(MyUserContext);
//     return(
//         <Container>
//             <h1>Khóa học công bố</h1>
//             <CoursesList api={endpoints['courses']} 
//             params={{
//                 "teacherId":user?.id,
//                 "isPublic":true
//             }}
//             />
//             <h1>Khóa học chưa công bố</h1>
//             <CoursesList api={endpoints['courses']} 
//             params={{
//                 "teacherId":user?.id,
//                 "isPublic":false
//             }}
//             />
//         </Container>
//     );
// };
// export default TeacherHome;
// // export default React.memo(TeacherHome);
import React, { useContext, useMemo } from "react";
import { endpoints } from "../../Configs/Apis";
import CoursesList from "../Course/CoursesList";
import { MyUserContext } from "../../Configs/Context";
import { Container } from "react-bootstrap";

const TeacherHome = () => {
  const [user] = useContext(MyUserContext);

  const publicCoursesParams = useMemo(() => ({
    teacherId: user?.id,
    isPublic: true
  }), [user?.id]);

  const privateCoursesParams = useMemo(() => ({
    teacherId: user?.id,
    isPublic: false
  }), [user?.id]);

  return (
    <Container>
      <h1>Khóa học công bố</h1>
      <CoursesList api={endpoints['courses']} params={publicCoursesParams} />

      <h1>Khóa học chưa công bố</h1>
      <CoursesList api={endpoints['courses']} params={privateCoursesParams} />
    </Container>
  );
};

export default TeacherHome;
