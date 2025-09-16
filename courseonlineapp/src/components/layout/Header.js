
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import CourseContentHeader from "./CourseContentHeader";

const Header = () => {
  // const location = useLocation();
  // const isCourseContent = location.pathname.startsWith("/courses/content/");
  // if (isCourseContent) return <CourseContentHeader/>; 
  return <MainHeader />;
};

export default Header;
