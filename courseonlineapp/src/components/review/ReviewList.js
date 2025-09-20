// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import ReviewCard from "./ReviewCard";

// const ReviewList = ({ reviews }) => {
//     console.log("reviews: " , reviews)
//   const [list, setList] = useState(reviews || []);

//   const handleDelete = (id) => {
//     // 🔹 Gọi API xóa nếu có
//     // await api.delete(`/reviews/${id}`);
//     setList((prev) => prev.filter((r) => r.id !== id));
//   };
//   useEffect(() => {
//     if (reviews && Array.isArray(reviews)) {
//       setList(reviews);
//     }
//   }, [reviews]);

//   const handleUpdate = (id, updatedData) => {
//     // 🔹 Gọi API cập nhật nếu có
//     // await api.put(`/reviews/${id}`, updatedData);
//     setList((prev) =>
//       prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
//     );
//   };
//   console.log("List:" , list)
//   if (!list || list.length == 0) {
//     return <p className="text-center text-muted">Chưa có đánh giá nào.</p>;
//   }

//   return (
//     <Row className="mt-4">
//       {list.map((review) => (
//         <Col md={12} key={review.id}>
//           <ReviewCard
//             review={review}
//             onDelete={handleDelete}
//             onUpdate={handleUpdate}
//           />
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default ReviewList;
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import DynamicFormControl from "../Form/DynamicFormControl";
import { MyUserContext } from "../../Configs/Context";
import { endpoints } from "../../Configs/Apis";
import useFetchApi from "../../Configs/FetchApi";

const ReviewList = ({ reviews,courseId }) => {
  const [list, setList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [user] = useContext(MyUserContext);
  const {fetchApi}=useFetchApi();

  useEffect(() => {
    if (reviews && Array.isArray(reviews)) setList(reviews);
  }, [reviews]);

  const handleDelete = async(id) => {
    console.log(id)
    const res = await fetchApi({
        method:"DELETE",
        url : endpoints['update_delete_review'](id)
    })
    console.log(res.status)
    if(res.status===204){

        setList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleUpdate = async (id, updatedData) => {

    const res = await fetchApi({
        method:"PUT",
        url : endpoints['update_delete_review'](id),
        data : {
            ...updatedData,
            courseId:courseId,
            userId : user?.id
        }
    })
    if(res.status === 200){
        setList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
    }
    
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetchApi({
        method:"POST",
        url : endpoints['create_review'],
        data : {
            ...newReview,
            courseId:courseId,
            userId: user?.id,
            userFullName: user?.full_name,
            userAvatar: user?.avatar,
            createdAt: Date.now(),
        }
    })
    if(res.status===200){
        console.log(res)
        // const newItem = res.data
        const newItem = {
            ...res.data,
            userId: user?.id,
            userFullName: user?.fullName,
            userAvatar: user?.avatar,
            createdAt: Date.now(),
        };

        setList((prev) => [newItem, ...prev]); // thêm lên đầu
        setNewReview({ rating: 5, comment: "" });
        setShowCreateModal(false);
    }
    
  };

  return (
    <>
      {/* Nút tạo review */}
      {user && user.role=="student" && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="success" onClick={() => setShowCreateModal(true)}>
            + Viết đánh giá
          </Button>
        </div>
      )}

      {(!list || list.length === 0) ? (
        <p className="text-center text-muted">Chưa có đánh giá nào.</p>
      ) : (
        <Row className="mt-3">
          {list.map((review) => (
            <Col md={12} key={review.id}>
              <ReviewCard
                review={review}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Modal tạo review */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Viết đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            {DynamicFormControl(
              [
                { field: "comment", title: "Nội dung", type: "textArea" },
                { field: "rating", title: "Đánh giá (1-5)", type: "number" },
              ],
              newReview,
              setNewReview
            )}
            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </Button>
              <Button type="submit" variant="success">
                Gửi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewList;
