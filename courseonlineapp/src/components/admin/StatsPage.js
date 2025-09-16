import React, { useState, useCallback } from "react";
import TeacherCourseChart from "../../statChart/TeacherCourseChart";
import { Button, Container } from "react-bootstrap";
import MonthYearPicker from "../search/MonthYearPicker ";
import TeacherCoursePublicChart from "../../statChart/TeachetCoursePublicChart";

export default function StatsPage() {
  const [filter, setFilter] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [isSwitch,setIsSwitch] = useState(false);

  // ✅ useCallback để tránh tạo hàm mới mỗi lần render
  const handleFilterChange = useCallback((value) => {
    setFilter(value);
  }, []);
const teacherData = [
  { coursePublic: 6, courseNotPublicYet: 1, teacher: "Lan Tran" },
];


  return (
    <Container>
      <Button onClick={()=>{
        if(isSwitch==false) setIsSwitch(true)
      }}>1</Button>
      <Button onClick={()=>{
        if(isSwitch==true) setIsSwitch(false)
      }}>2</Button>
      {isSwitch ? <div className="d-flex flex-column align-items-center mt-4">
      <MonthYearPicker
        onChange={handleFilterChange}
        defaultMonth={filter.month}
        defaultYear={filter.year}
      />
      <div className="p-4 w-100">
        <TeacherCourseChart month={filter.month} year={filter.year} />
      </div>
    </div>:
    <TeacherCoursePublicChart/>
    }
       
    </Container>
  );
}
