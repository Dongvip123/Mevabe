"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Comment = {
  id: string;
  content: string;
  authorEmail: string;
  authorName: string | null;
  createdAt: string;
};

export default function CommentSection({
  articleId,
  initialComments,
}: {
  articleId: string;
  initialComments: Comment[];
}) {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setCheckingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${window.location.pathname}`,
      },
    });
    setSending(false);
    if (error) {
      setError("Không gửi được link, thử lại sau nhé.");
    } else {
      setLinkSent(true);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUserEmail(null);
  }

  async function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    setError("");

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, content, name }),
    });

    setPosting(false);

    if (!res.ok) {
      setError("Gửi bình luận không thành công, thử lại nhé.");
      return;
    }

    const newComment = await res.json();
    setComments((prev) => [newComment, ...prev]);
    setContent("");
  }

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-serif-display text-xl text-forest mb-6">
        Bình luận ({comments.length})
      </h2>

      {!checkingAuth && !userEmail && (
        <div className="mb-10 bg-paper border border-line rounded-sm p-5">
          {!linkSent ? (
            <form onSubmit={handleSendMagicLink} className="flex flex-col gap-3">
              <p className="text-sm text-ink-soft">
                Nhập email để đăng nhập và để lại bình luận — không cần mật
                khẩu, chỉ cần bấm vào link gửi qua email.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-forest text-cream px-4 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
                >
                  {sending ? "Đang gửi..." : "Gửi link đăng nhập"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-forest">
              Đã gửi link đăng nhập tới <strong>{email}</strong>. Mở email và
              bấm vào link để quay lại bình luận nhé.
            </p>
          )}
        </div>
      )}

      {userEmail && (
        <form onSubmit={handlePostComment} className="mb-10 flex flex-col gap-3">
          <p className="text-sm text-ink-soft">
            Đang bình luận với tư cách <strong>{userEmail}</strong> ·{" "}
            <button
              type="button"
              onClick={handleSignOut}
              className="underline hover:text-forest"
            >
              Đăng xuất
            </button>
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên hiển thị (không bắt buộc)"
            className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest"
          />
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            rows={3}
            className="border border-line bg-cream rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-forest resize-none"
          />
          <button
            type="submit"
            disabled={posting}
            className="self-start bg-forest text-cream px-4 py-2 rounded-sm text-sm hover:bg-forest-light transition-colors disabled:opacity-60"
          >
            {posting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </form>
      )}

      {error && <p className="text-sm text-clay mb-6">{error}</p>}

      <div className="flex flex-col gap-5">
        {comments.length === 0 && (
          <p className="text-sm text-ink-soft">Chưa có bình luận nào.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="border-b border-line pb-4">
            <p className="text-sm font-medium text-forest">
              {c.authorName || c.authorEmail.split("@")[0]}
            </p>
            <p className="text-sm text-ink mt-1 leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
