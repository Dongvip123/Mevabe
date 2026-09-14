"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Chào bạn! Mình là trợ lý AI của Mầm Nhỏ, hỏi mình bất cứ điều gì về chăm sóc bé nhé — giấc ngủ, dinh dưỡng, tiêm phòng, phát triển của bé...",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply || "Xin lỗi, mình chưa trả lời được." },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Có lỗi xảy ra, thử lại giúp mình nhé." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Nút mở chat */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-forest text-cream w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-forest-light transition-colors"
        aria-label="Mở trợ lý AI"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[90vw] h-[480px] bg-cream border border-line rounded-md shadow-xl flex flex-col overflow-hidden">
          <div className="bg-forest text-cream px-4 py-3">
            <p className="font-serif-display text-base">Hỏi đáp cùng Mầm Nhỏ</p>
            <p className="text-xs text-cream/70">
              Chỉ mang tính tham khảo, không thay thế bác sĩ
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-md px-3 py-2 max-w-[85%] leading-relaxed ${
                  m.role === "user"
                    ? "self-end bg-forest text-cream"
                    : "self-start bg-paper text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="self-start bg-paper text-ink-soft text-sm rounded-md px-3 py-2">
                Đang trả lời...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-line p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border border-line rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-forest"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-forest text-cream px-3 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </>
  );
}
