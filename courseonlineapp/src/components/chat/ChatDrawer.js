import React, { useEffect, useState } from "react";
import { Offcanvas, Spinner, ListGroup, Alert } from "react-bootstrap";
import { listenConversations } from "../../Configs/filrebaseFunc";
import defaultAvatar from "../../assets/image/defaultAvatar.png"

export default function ChatDrawer({ currentUser, open, setOpen, setChatState }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    if (!currentUser?.id) {
      setError("Không tìm thấy thông tin người dùng!");
      return;
    }

    setLoading(true);
    setError("");

    const unsubscribe = listenConversations(
      currentUser.id,
      (data) => {
        setConversations(data || []);
        setLoading(false);
      },
      (err) => {
        setError("Không thể tải danh sách trò chuyện");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [open, currentUser?.id]);

  return (
    <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><i class="bi bi-chat-dots-fill"></i> Danh sách trò chuyện</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {loading && (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && conversations.length === 0 && (
          <p className="text-muted">Chưa có cuộc trò chuyện nào</p>
        )}

        <ListGroup>
          {conversations.map((c) => {
            // Lấy người nhắn còn lại (khác currentUser)
            const other = c.participants.find(p => p.id !== currentUser?.id.toString());
            return (
              <ListGroup.Item
                key={c.id}
                action
                onClick={() => {
                  setOpen(false);
                  setChatState(prev => ({
                    ...prev,
                    conversationId: c.id,
                    receiver: other,
                    open: true
                  }));
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={other?.avatar || defaultAvatar}
                    alt={other?.name || "Người dùng"}
                    className="rounded-circle me-2"
                    width={32}
                    height={32}
                  />
                  <div>
                    <strong>{other?.name || "Người dùng"}</strong>
                    <div className="small text-muted">{c.lastMessage || "Chưa có tin nhắn"}</div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
