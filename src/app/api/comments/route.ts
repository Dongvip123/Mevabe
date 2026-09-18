import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const commentSchema = z.object({
  articleId: z.string().min(1),
  content: z.string().trim().min(2, "Bình luận quá ngắn").max(1000, "Bình luận quá dài"),
  name: z.string().trim().max(100).optional(),
});

// Nhận bình luận mới — chỉ chấp nhận nếu người gửi đã đăng nhập thật sự
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = commentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" },
      { status: 400 }
    );
  }

  const { articleId, content, name } = parsed.data;

  // Kiểm tra bài viết có tồn tại thật không, tránh gửi rác vào bảng
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  // Chặn spam: không cho bình luận liên tục dưới 15 giây/lần
  const lastComment = await prisma.comment.findFirst({
    where: { authorEmail: user.email },
    orderBy: { createdAt: "desc" },
  });
  if (lastComment && Date.now() - lastComment.createdAt.getTime() < 15_000) {
    return NextResponse.json(
      { error: "Bạn thao tác quá nhanh, thử lại sau vài giây nhé." },
      { status: 429 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      articleId,
      content,
      authorEmail: user.email,
      authorName: name || null,
    },
  });

  return NextResponse.json(comment);
}
