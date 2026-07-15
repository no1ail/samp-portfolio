import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatMessage {
  author: string;
  text: string;
  timestamp: number;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  socket: Socket | null;
}

export default function ChatModal({ isOpen, onClose, socket }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [guestName, setGuestName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let name = localStorage.getItem("guest_name");
    if (!name) {
      name = "Guest_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("guest_name", name);
    }
    setGuestName(name);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleHistory = (msgs: ChatMessage[]) => {
      setMessages(msgs);
    };

    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat history", handleHistory);
    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat history", handleHistory);
      socket.off("chat message", handleMessage);
    };
  }, [socket]);

  // Clean up expired messages (60s)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setMessages((prev) => prev.filter((m) => m.timestamp + 60000 > now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = input.trim();
    if (!messageText) return;

    if (socket) {
      socket.emit("chat message", {
        author: guestName,
        text: messageText,
      });
    } else {
      // Fallback if offline
      setMessages((prev) => [
        ...prev,
        { author: guestName + " (Offline)", text: messageText, timestamp: Date.now() },
      ]);
    }
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal-content glass-card">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>Community Chat</h3>
        <div className="chat-messages">
          {messages.map((msg, i) => {
            const isSelf = msg.author === guestName || msg.author.includes("(Offline)");
            const left = Math.ceil((msg.timestamp + 60000 - Date.now()) / 1000);
            return (
              <div key={i} className={`chat-message ${isSelf ? "self" : ""}`}>
                <div
                  className="chat-author"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{msg.author}</span>
                  <span style={{ opacity: 0.7, fontSize: "0.7rem" }}>
                    {left > 0 ? `${left}s` : "0s"}
                  </span>
                </div>
                <div>{msg.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            autoComplete="off"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn" style={{ padding: "0.8rem 1.5rem" }}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
