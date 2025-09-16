// import { useState } from "react";
// import useFetchApi from "../../Configs/FetchApi";
// import { endpoints } from "../../Configs/Apis";

// const AdminHomePage=()=>{
//     const {loading,fetchApi}=useFetchApi();
//     const [listTeacher,setListTeacher]=useState([]);
//     const loadListTeacher=async()=>{
//         const res = await fetchApi({
//             url: `${endpoints['get_users']}?isVerify=false&role=teacher`
//         })
//         if(res.status===200) setListTeacher(res.data)
//     };
//     const verifyTeacher=async(teacher)=>{
//         const res = await fetchApi({
//             method:"PUT",
//             url : endpoints['update_user'](teacher?.id),
//             data:{
//                 ...teacher,
//                 isVerify:true
//             }
//         })
//     };
//     return (<></>)
// };
// export default AdminHomePage();

import { useEffect, useState } from "react";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
    const { loading, fetchApi } = useFetchApi();
    const [listTeacher, setListTeacher] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [actionType, setActionType] = useState(null); // "verify" | "reject"
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate();
    const loadListTeacher = async () => {
        const res = await fetchApi({
            url: `${endpoints["get_users"]}?isVerify=false&role=teacher`,
        });
        if (res.status === 200) setListTeacher(res.data);
    };

    useEffect(() => {
        loadListTeacher();
    }, []);

    const verifyTeacher = async (teacher) => {
        const formData = new FormData();
        const allowedFields = [
            "id",
            "firstName",
            "lastName",
            "avatar",    
            "email",
            "username",
            "phoneNumber",
            "role",
            "isVerify"
        ];

        allowedFields.forEach((field) => {
            if (teacher[field] !== undefined && teacher[field] !== null) {
                formData.append(field, teacher[field]);
            }
        });

        formData.set("isVerify", true); // ép sang true

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        const res = await fetchApi({
            method: "PUT",
            url: endpoints["update_user"](teacher?.id),
            data: formData,
        });

        if (res.status === 200) {
            setListTeacher((prev) => prev.filter((t) => t.id !== teacher.id));
        }

    };

    const rejectTeacher = async (teacher) => {
        const res = await fetchApi({
            method: "DELETE",
            url: endpoints["delete_user"](teacher?.id),
        });

        if (res.status === 200) {
            setListTeacher((prev) => prev.filter((t) => t.id !== teacher.id));
        }
    };

    const handleAction = () => {
        if (!selectedTeacher) return;
        if (actionType === "verify") verifyTeacher(selectedTeacher);
        if (actionType === "reject") rejectTeacher(selectedTeacher);
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
<Button onClick={()=>{nav("stats")}}>stats</Button>

            <h3 className="mb-3">Danh sách giáo viên chờ xác nhận</h3>

            <Table striped bordered hover responsive className="align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Ảnh</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listTeacher.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center text-muted">
                                {loading ? "Đang tải..." : "Không có giáo viên nào chờ xác nhận"}
                            </td>
                        </tr>
                    ) : (
                        listTeacher.map((teacher) => (
                            <tr key={teacher.id}>
                                <td className="text-center">
                                    <Image
                                        src={teacher.avatar}
                                        roundedCircle
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                </td>
                                <td>{teacher.fullName}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td>{teacher.role}</td>
                                <td className="text-center">
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {
                                            setSelectedTeacher(teacher);
                                            setActionType("verify");
                                            setShowModal(true);
                                        }}
                                    >
                                        ✅ Xác nhận
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedTeacher(teacher);
                                            setActionType("reject");
                                            setShowModal(true);
                                        }}
                                    >
                                        ❌ Từ chối
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Modal xác nhận */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hành động</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionType === "verify"
                        ? `Bạn có chắc muốn xác nhận giáo viên ${selectedTeacher?.fullName}?`
                        : `Bạn có chắc muốn từ chối giáo viên ${selectedTeacher?.fullName}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button
                        variant={actionType === "verify" ? "success" : "danger"}
                        onClick={handleAction}
                    >
                        {actionType === "verify" ? "Xác nhận" : "Từ chối"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminHomePage;

