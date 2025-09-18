import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import DynamicFormControl from "./DynamicFormControl";
import { MyUserContext } from "../../Configs/Context";
import useFetchApi from "../../Configs/FetchApi";
import { endpoints } from "../../Configs/Apis";

export default function UserProfile({ currentUserId }) {

    const [user, dispatch] = useContext(MyUserContext);
    const [userProfile, setUserProfile] = useState(user);
    //   const [loading, setLoading] = useState(true);
    const { loading, fetchApi } = useFetchApi();
    const [saving, setSaving] = useState(false);

    const fileRefs = {
        avatarFile: useRef()
    };
    const userFields = [
        { field: "firstName", title: "Họ", type: "text" },
        { field: "lastName", title: "Tên", type: "text" },
        { field: "email", title: "Email", type: "email" },
        { field: "username", title: "Tên đăng nhập", type: "text", readOnly: true },
        { field: "phoneNumber", title: "Số điện thoại", type: "text" },
        { field: "role", title: "Vai trò", type: "text", readOnly: true },
        { field: "avatarFile", title: "Ảnh đại diện", type: "file", accept: "image/*" }
    ];

    const updateUser = async (formData) => {
        const res = await fetchApi({
            method: "PUT",
            url: endpoints['update_user'](user?.id),
            data: formData
        })
        if (res.status === 200) {
            alert("Cập nhật thành công!");
            dispatch({
                type: "update",
                payload: res.data
            })
        }
    };

    // 2. Submit form update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                if (
                    key !== "avatarFile" &&
                    key !== "fullName" &&
                    key !== "avatar" &&
                    key !== "createdAt"
                ) formData.append(key, user[key]);
            });
            if (fileRefs.avatarFile.current?.files[0]) {
                formData.append("avatarFile", fileRefs.avatarFile.current.files[0]);
            }

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            updateUser(formData);


        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            alert("Cập nhật thất bại!");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Đang tải thông tin...</p>;

    return (
        <Container className="mt-4 mb-4">
            <div className="max-w-lg mx-auto bg-white p-4 rounded-3 shadow">
                <h3 className="mb-3">Thông tin người dùng</h3>
                <Form onSubmit={handleSubmit}>
                    {DynamicFormControl(userFields, userProfile, setUserProfile, fileRefs)}

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={saving}>
                            {saving ? <Spinner animation="border" size="sm" /> : "Lưu thay đổi"}
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}
