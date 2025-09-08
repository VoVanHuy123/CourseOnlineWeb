import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmModal = ({ show, object, onConfirm, onCancel }) => {
  if (!object) return null;

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Bạn có chắc muốn xóa{" "}
          <strong>{object.name || object.title || "mục này"}</strong> không?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          variant="danger"
          onClick={() => onConfirm(object)}
        >
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
