// import { Form } from "react-bootstrap";

// const DynamicFormControl = (fields,object,setObject) => {
//     return fields.map(field => {

//         return (
//             <Form.Group key={field.field} className="mb-3" controlId={field.field}>
//                 <Form.Label>{field.title}</Form.Label>
//                 <Form.Control value={object[field.field]} onChange={e => setObject({ ...object, [field.field]: e.target.value })} type={field.type} placeholder={field.title} required />
//             </Form.Group>
//         )
//     }
// )
    
// }
// export default DynamicFormControl;
import React from "react";
import { Form } from "react-bootstrap";

const DynamicFormControl = (fields, object, setObject, refs = {}) => {
  return fields.map((field) => {
    switch (field.type) {
      case "select":
        return (
          <Form.Group key={field.field} className="mb-3" controlId={field.field}>
            <Form.Label className="fw-semibold">{field.title}</Form.Label>
            <Form.Select
              value={object[field.field] || ""}
              onChange={(e) =>
                setObject({ ...object, [field.field]: e.target.value })
              }
              className="rounded-3"
              required
            >
              <option value="">-- Chọn {field.title} --</option>
              {field.options?.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        );

      case "file":
        return (
          <Form.Group key={field.field} className="mb-3" controlId={field.field}>
            <Form.Label className="fw-semibold">{field.title}</Form.Label>
            <Form.Control
              type="file"
              ref={refs[field.field]}
              accept={field.accept || "image/*"}
              className="rounded-3"
            />
          </Form.Group>
        );

      default: // text, email, password...
        return (
          <Form.Group key={field.field} className="mb-3" controlId={field.field}>
            <Form.Label className="fw-semibold">{field.title}</Form.Label>
            <Form.Control
              value={object[field.field] || ""}
              onChange={(e) =>
                setObject({ ...object, [field.field]: e.target.value })
              }
              type={field.type}
              placeholder={field.title}
              required
              className="rounded-3"
            />
          </Form.Group>
        );
    }
  });
};

export default DynamicFormControl;
