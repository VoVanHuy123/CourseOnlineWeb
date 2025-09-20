import React, { useState, useContext, useRef } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MyUserContext } from "../../Configs/Context";
import DynamicFormControl from "../Form/DynamicFormControl";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const [user] = useContext(MyUserContext);
  const isMine = user?.id === review.userId;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ comment: review.comment, rating: review.rating });
  const ratingRef = useRef();

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= editData.rating ? <FaStar key={i} color="#ffc107" /> : <FaRegStar key={i} color="#ccc" />);
  }

  return (
    <>
      <Card
        className={`mb-3 shadow-sm rounded-3 ${isMine ? "bg-light" : ""}`}
      >
        <Card.Body className="d-flex flex-column">
          <div className="d-flex mb-2">
            <img
              src={review.userAvatar}
              alt={review.userFullName}
              className="rounded-circle me-3"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">{review.userFullName}</h6>
                <small className="text-muted">{formatDate(review.createdAt)}</small>
              </div>
              <div className="mb-2">{stars}</div>
              <p className="mb-0">{review.comment}</p>
            </div>
          </div>

          {isMine && (
            <div className="d-flex justify-content-end mt-2 gap-2">
              <Button size="sm" variant="outline-primary" onClick={() => setShowEditModal(true)}>
                Chỉnh sửa
              </Button>
              <Button size="sm" variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                Xóa
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa review này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={() => { onDelete(review.id); setShowDeleteModal(false); }}>Xóa</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal chỉnh sửa */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdate(review.id, editData);
              setShowEditModal(false);
            }}
          >
            {DynamicFormControl(
              [
                { field: "comment", title: "Nội dung", type: "textArea" },
                { field: "rating", title: "Đánh giá", type: "number" },
              ],
              editData,
              setEditData
            )}
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} className="me-2">
                Hủy
              </Button>
              <Button type="submit" variant="primary">Lưu</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewCard;
