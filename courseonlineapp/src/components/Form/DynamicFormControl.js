
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
              disabled={field.readOnly}
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
              disabled={field.readOnly}
            />
          </Form.Group>
        );
      case "textArea":
        return (
          <Form.Group key={field.field} className="mb-3" controlId={field.field}>
            <Form.Label className="fw-semibold">{field.title}</Form.Label>
            <Form.Control
              as="textarea"   // 🔹 thay vì type="textarea"
              rows={4}        // số dòng mặc định
              value={object[field.field] || ""}
              onChange={(e) =>
                setObject({ ...object, [field.field]: e.target.value })
              }
              placeholder={field.title}
              required
              className="rounded-3"
              disabled={field.readOnly}
            />
          </Form.Group>
        );
      case "number":
        return (
          <Form.Group key={field.field} className="mb-3" controlId={field.field}>
            <Form.Label className="fw-semibold">{field.title}</Form.Label>
            <Form.Control
              value={object[field.field] || 0}
              onChange={(e) =>
                setObject({ ...object, [field.field]: e.target.value === "" ? null : Number(e.target.value), })
              }
              type={field.type}
              placeholder={field.title}
              required
              className="rounded-3"
              disabled={field.readOnly}
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
              disabled={field.readOnly}
            />
          </Form.Group>
        );
    }
  });
};

export default DynamicFormControl;
