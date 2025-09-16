import { useMemo, useState } from "react";
import NameSearch from "../search/NameSearch";
import TuitionFeeFilter from "../search/TuitionFeeFilter";
import { Button } from "react-bootstrap";
import { endpoints } from "../../Configs/Apis";
import CourseList from "../Course/CoursesList";

const Courses = () => {
  const [name, setName] = useState("");
  const [minFee, setMinFee] = useState();
  const [maxFee, setMaxFee] = useState();
  const [searchParams, setSearchParams] = useState({});

  const params = useMemo(() => ({
    isPublic: true,
    ...searchParams
  }), [searchParams]);

  const onSearch = () => {
    setSearchParams({
      kw: name,
      fromPrice: minFee,
      toPrice: maxFee
    });
  };
  const onReset = ()=>{
    setSearchParams(null);
    setName("");
    setMaxFee("");
    setMinFee("");
  }

  return (
    <>
      <div className="d-flex align-items-center mt-4 gap-4">
        <div className="flex-fill d-flex align-items-center justify-content-between gap-4">
          <NameSearch value={name} setParentOnchange={setName}className={"w-50"} />
          <TuitionFeeFilter minFee={minFee} maxFee={maxFee} setPatentMinFee={setMinFee} setPatentMaxFee={setMaxFee} className={"flex-fill"}/>
        </div>
        <div className="d-flex gap-2">
          <Button style={{width:"80px"}} variant="success" onClick={onSearch}>Lọc <i class="bi bi-funnel"></i></Button>
          <Button style={{width:"100px"}}  onClick={onReset}>Reset <i class="bi bi-arrow-counterclockwise"></i></Button>
        </div>
      </div>


      <CourseList api={endpoints['courses']} params={params} />
    </>
  );
};

export default Courses;
