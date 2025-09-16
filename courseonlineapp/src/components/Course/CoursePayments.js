import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Form, Spinner, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MyUserContext } from "../../Configs/Context";
import { authApis } from "../../Configs/Apis";
import { endpoints } from "../../Configs/Apis";

const CoursePayments = () => {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();
  const [user] = useContext(MyUserContext);

  // Course info
  const [courseInfo, setCourseInfo] = useState(null);

  // Payment state
  const [paymentData, setPaymentData] = useState({ method: "", note: "" });

  // UI state
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Methods
  const paymentMethods = [
    { value: "vnpay", label: "VNPay", icon: "💳", color: "primary" },
    { value: "momo", label: "Momo", icon: "🟣", color: "danger" },
    { value: "paypal", label: "PayPal", icon: "🔵", color: "info" }
  ];

  // Load course info
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const api = authApis();
        const res = await api.get(endpoints["courses_details"](id));
        if (res.status === 200) {
          setCourseInfo(res.data);
        } else {
          throw new Error("Không tìm thấy khóa học");
        }
      } catch (err) {
        setError("Lỗi khi tải khóa học: " + (err.response?.data?.message || err.message));
        if (err.response?.status === 404) {
          setTimeout(() => navigate("/courses"), 2000);
        }
      } finally {
        setCourseLoading(false);
      }
    };
    if (id) loadCourse();
  }, [id, navigate]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Create or get enrollment
  const getOrCreateEnrollment = async (courseId, userId) => {
    const api = authApis();
    const payload = { courseId: parseInt(courseId), userId: parseInt(userId) };
    const res = await api.post(endpoints["create_enrollment"], payload);
    if (res.status === 200 || res.status === 201) {
      return res.data.id;
    }
    throw new Error("Không thể tạo enrollment");
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      if (!paymentData.method) {
        setError("Vui lòng chọn phương thức thanh toán!");
        return;
      }

      if (!user?.id) {
        setError("Bạn cần đăng nhập để thanh toán!");
        return;
      }

      // Step 1: Get/Create enrollment
      const enrollmentId = await getOrCreateEnrollment(id, user.id);

      // Step 2: Create payment
      const api = authApis();
      const payload = {
        enrollmentId,
        amount: parseFloat(courseInfo.tuitionFee || courseInfo.price || 0),
        method: paymentData.method,
        note: paymentData.note?.trim() || ""
      };

      const res = await api.post(endpoints["create_payment"], payload);

      if (res.status === 201 || res.status === 200) {
        setSuccess("Thanh toán được khởi tạo thành công!");

        if (res.data.redirectUrl) {
          setTimeout(() => {
            window.location.href = res.data.redirectUrl;
          }, 1000);
        } else {
          setTimeout(() => navigate(`/courses/content/${id}`), 1500);
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.error || err.message || "Lỗi khi tạo payment");
    } finally {
      setLoading(false);
    }
  };

  if (courseLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Đang tải khóa học...</p>
      </Container>
    );
  }

  if (!courseInfo) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error || "Không tìm thấy khóa học"}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center">
              <h4>💳 Thanh Toán Khóa Học</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Card className="mb-3">
                <Card.Body>
                  <p><b>Tên khóa học:</b> {courseInfo.title || courseInfo.name}</p>
                  <p><b>Giảng viên:</b> {courseInfo.instructor?.name || "N/A"}</p>
                  <p><b>Học phí:</b> {courseInfo.tuitionFee?.toLocaleString() || 0} VND</p>
                </Card.Body>
              </Card>

              <Form.Group className="mb-3">
                <Form.Label>Chọn phương thức thanh toán</Form.Label>
                <Row>
                  {paymentMethods.map((m) => (
                    <Col xs={6} key={m.value}>
                      <Button
                        variant={paymentData.method === m.value ? m.color : "outline-" + m.color}
                        className="w-100 mb-2"
                        onClick={() => handleInputChange("method", m.value)}
                      >
                        {m.icon} {m.label}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={paymentData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                className="w-100"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : `Xác nhận thanh toán ${courseInfo.tuitionFee?.toLocaleString()} VND`}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursePayments;
