import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Nhận bình luận mới — chỉ chấp nhận nếu người gửi đã đăng nhập thật sự
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const { articleId, content, name } = body as {
    articleId?: string;
    content?: string;
    name?: string;
  };

  if (!articleId || !content?.trim()) {
    return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      articleId,
      content: content.trim(),
      authorEmail: user.email,
      authorName: name?.trim() || null,
    },
  });

  return NextResponse.json(comment);
}
