import React, { useState } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";

const TuitionFeeFilter = ({ minFee,maxFee,setPatentMinFee,setPatentMaxFee,className }) => {
  // const [minFee, setMinFee] = useState("");
  // const [maxFee, setMaxFee] = useState("");


  return (
      <Row className={className}>
        <Col md={6}>
          <InputGroup className="">
            <InputGroup.Text>Từ giá</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Nhập số tiền tối thiểu"
              value={minFee}
              onChange={(e) => {
                // setMinFee(e.target.value);
                if(setPatentMinFee) setPatentMinFee(e.target.value)
            }}
            />
          </InputGroup>
        </Col>

        <Col md={6}>
          <InputGroup className="">
            <InputGroup.Text>Đến giá</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Nhập số tiền tối đa"
              value={maxFee}
              onChange={(e) => {
                // setMaxFee(e.target.value);
                if(setPatentMaxFee) setPatentMaxFee(e.target.value)
            }}
            />
          </InputGroup>
        </Col>
      </Row>
  );
};

export default TuitionFeeFilter;
