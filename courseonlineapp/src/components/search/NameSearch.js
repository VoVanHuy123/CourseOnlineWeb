import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
// import { Search } from "lucide-react"; // Nếu bạn đang dùng lucide-react để có icon đẹp

const NameSearch = ({ value,setParentOnchange, placeholder = "Tìm theo tên..." , className}) => {
    // const [value, onChange] =useState("");
  return (
    <InputGroup className={className}>
      <InputGroup.Text className="bg-white border-end-0">
        <i class="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => {
            // onChange(e.target.value)
            if(setParentOnchange) setParentOnchange(e.target.value);
        }}
        placeholder={placeholder}
        className="border-start-0 shadow-sm"
      />
    </InputGroup>
  );
};

export default NameSearch;
