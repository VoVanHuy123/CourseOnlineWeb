import React, { useEffect, useState, useRef } from "react";
import { Offcanvas, Form, Button, Spinner } from "react-bootstrap";
import { listenMessages, sendMessage, markConversationRead } from "../../Configs/filrebaseFunc";

export default function ChatBox({ currentUser, conversationId, receiver, open, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef();

  useEffect(() => {
    if (!open || !conversationId) return;
    const unsubscribe = listenMessages(conversationId, (msgs) => setMessages(msgs));
    markConversationRead(conversationId, currentUser.id);
    return () => unsubscribe();
  }, [open, conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(conversationId, currentUser.id, receiver.id, newMessage);
    setNewMessage("");
  };

  return (
    <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title><i class="bi bi-chat-dots-fill"></i> {receiver?.name || "Người dùng"}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: "70vh" }}>
          {messages.length === 0 && <span>chưa có tin nhắn nào</span>}
          {messages.map((msg) => {
            const isMe = msg.senderId == currentUser?.id;
            return (
              <div
                key={msg.id}
                className={`d-flex ${isMe ? "justify-content-end" : "justify-content-start"} mb-2`}
              >
                <div
                  className={`p-2 rounded ${isMe ? "bg-primary text-white" : "bg-light"}`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="d-flex gap-2"
        >
          <Form.Control
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <Button type="submit" variant="primary">
            Gửi
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
