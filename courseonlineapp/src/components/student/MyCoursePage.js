import { useContext } from "react";
import { endpoints } from "../../Configs/Apis";
import CoursesList from "../Course/CoursesList";
import { MyUserContext } from "../../Configs/Context";
import { Container } from "react-bootstrap";

const MyCourse=()=>{
    const [user,] = useContext(MyUserContext);
    return(
        <Container>
            
            <CoursesList api={endpoints['my-course'](user?.id)}/>
        </Container>
    );
};
export default MyCourse;