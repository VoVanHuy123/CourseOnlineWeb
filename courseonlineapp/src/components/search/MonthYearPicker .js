
// import React, { useState, useEffect } from "react";
// import { Form, Row, Col } from "react-bootstrap";

// const MonthYearPicker = ({ onChange, defaultMonth, defaultYear }) => {
//   const currentDate = new Date();
//   const [month, setMonth] = useState(defaultMonth ?? currentDate.getMonth() + 1);
//   const [year, setYear] = useState(defaultYear ?? currentDate.getFullYear());

//   // Gọi onChange khi month hoặc year thay đổi
//   useEffect(() => {
//     onChange?.({ month, year });
//   }, [month, year, onChange]);

//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const years = Array.from({ length: 11 }, (_, i) => currentDate.getFullYear() - 5 + i);

//   return (
//     <Row className="align-items-center g-2">
//       <Col xs={6} sm={4}>
//         <Form.Group controlId="monthSelect">
//           <Form.Label className="fw-bold">Chọn tháng</Form.Label>
//           <Form.Select
//             value={month}
//             onChange={(e) => setMonth(Number(e.target.value))}
//           >
//             {months.map((m) => (
//               <option key={m} value={m}>
//                 Tháng {m}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>
//       </Col>

//       <Col xs={6} sm={4}>
//         <Form.Group controlId="yearSelect">
//           <Form.Label className="fw-bold">Chọn năm</Form.Label>
//           <Form.Select
//             value={year}
//             onChange={(e) => setYear(Number(e.target.value))}
//           >
//             {years.map((y) => (
//               <option key={y} value={y}>
//                 Năm {y}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>
//       </Col>
//     </Row>
//   );
// };

// export default MonthYearPicker;
import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

const MonthYearPicker = ({ onChange, defaultMonth, defaultYear }) => {
  const currentDate = new Date();
  const [month, setMonth] = useState(defaultMonth ?? currentDate.getMonth() + 1);
  const [year, setYear] = useState(defaultYear ?? currentDate.getFullYear());

  useEffect(() => {
    onChange?.({ month, year });
  }, [month, year, onChange]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 11 }, (_, i) => currentDate.getFullYear() - 5 + i);

  return (
    <Row className="justify-content-center flex-fill">
      <Col xs={12} md={4} className="mb-2 flex-fill">
        <Form.Label className="fw-bold">Chọn tháng</Form.Label>
        <Form.Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {months.map((m) => (
            <option key={m} value={m}>
              Tháng {m}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col xs={12} md={4} className="mb-2 flex-fill">
        <Form.Label className="fw-bold">Chọn năm</Form.Label>
        <Form.Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default MonthYearPicker;
