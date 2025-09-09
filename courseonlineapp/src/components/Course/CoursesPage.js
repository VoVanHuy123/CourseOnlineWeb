
import { endpoints } from "../../Configs/Apis";
import CoursesList from '../Course/CoursesList'

const Courses = () => {
  

  return (
    <>
      <CoursesList api={endpoints['courses']} params={{"isPublic":true}}/>
    </>
  );
};

export default Courses;
