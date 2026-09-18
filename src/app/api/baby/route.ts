import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const babySchema = z.object({
  name: z.string().trim().min(1, "Cần nhập tên bé").max(100),
  birthDate: z.string().refine((v) => !isNaN(Date.parse(v)), "Ngày sinh không hợp lệ"),
  gender: z.enum(["male", "female"]),
});

// Lấy hồ sơ bé + toàn bộ lịch sử đo của người dùng đang đăng nhập
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const babies = await prisma.baby.findMany({
    where: { ownerEmail: user.email },
    include: { growthRecords: { orderBy: { date: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ babies });
}

// Tạo hồ sơ bé mới
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = babySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" },
      { status: 400 }
    );
  }

  // Giới hạn tối đa 5 hồ sơ bé / tài khoản để tránh lạm dụng
  const existingCount = await prisma.baby.count({
    where: { ownerEmail: user.email },
  });
  if (existingCount >= 5) {
    return NextResponse.json(
      { error: "Đã đạt giới hạn số hồ sơ bé" },
      { status: 400 }
    );
  }

  const { name, birthDate, gender } = parsed.data;

  const baby = await prisma.baby.create({
    data: {
      ownerEmail: user.email,
      name,
      birthDate: new Date(birthDate),
      gender,
    },
  });

  return NextResponse.json(baby);
}
