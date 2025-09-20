import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  updateDoc,
  increment,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  writeBatch,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Tạo hoặc lấy conversation
export const getOrCreateConversation = async (teacher, student) => {
  const conversationId = `${teacher.id}_${student.id}`;
  const convoRef = doc(db, "conversations", conversationId);
  const convoSnap = await getDoc(convoRef);

  if (!convoSnap.exists()) {
    await setDoc(convoRef, {
      participants: [
        { id: teacher.id.toString(), name: teacher.name, avatar: teacher.avatar || null },
        { id: student.id.toString(), name: student.name || `${student.firstName} ${student.lastName}`, avatar: student.avatar || null },
      ],
      participantIds: [teacher.id.toString(), student.id.toString()],
      lastMessage: "",
      lastMessageSenderId: null,
      lastMessageAt: serverTimestamp(),
      unread: {
        [teacher.id.toString()]: 0,
        [student.id.toString()]: 0,
      },
    });
  }

  return conversationId;
};

// Gửi tin nhắn và cập nhật conversation
export const sendMessage = async (conversationId, senderId, receiverId, text) => {
  const messagesRef = collection(db, "conversations", conversationId, "messages");

  await addDoc(messagesRef, {
    senderId: senderId.toString(),
    text,
    createdAt: serverTimestamp(),
    isRead: false,
  });

  const convoRef = doc(db, "conversations", conversationId);
  await updateDoc(convoRef, {
    lastMessage: text,
    lastMessageSenderId: senderId.toString(),
    lastMessageAt: serverTimestamp(),
    [`unread.${receiverId.toString()}`]: increment(1),
  });
};

// Lắng nghe messages trong conversation
export const listenMessages = (conversationId, callback) => {
  const messagesRef = collection(db, "conversations", conversationId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

// Đánh dấu đã đọc
export const markConversationRead = async (conversationId, userId) => {
  const convoRef = doc(db, "conversations", conversationId);
  const batch = writeBatch(db);

  batch.update(convoRef, { [`unread.${userId}`]: 0 });

  const messagesRef = collection(db, "conversations", conversationId, "messages");
  const snapshot = await getDocs(messagesRef);
  snapshot.docs.forEach((m) => {
    if (!m.data().isRead) {
      batch.update(m.ref, { isRead: true });
    }
  });

  await batch.commit();
};

// Lắng nghe danh sách conversation
export function listenConversations(userId, onData, onError) {
  if (!userId) return () => {};

  const q = query(
    collection(db, "conversations"),
    where("participantIds", "array-contains", userId.toString())
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {

      const data = snapshot.docs.map(doc => {
        const d = { id: doc.id, ...doc.data() };


        // Chuẩn hóa thông tin "other participant" để hiển thị
        const other = d.participants.find(p => p.id !== userId.toString());
        d.otherParticipant = other || { id: null, name: "Người dùng", avatar: null };

        return d;
      });

      // Sắp xếp theo lastMessageAt
      data.sort((a, b) => b.lastMessageAt?.toMillis() - a.lastMessageAt?.toMillis());

      onData(data);
    },
    (err) => {
      console.error("Lỗi khi load cuộc trò chuyện:", err);
      onError(err);
    }
  );

  return unsubscribe;
}
