import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

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

  const body = await request.json();
  const { name, birthDate, gender } = body as {
    name?: string;
    birthDate?: string;
    gender?: string;
  };

  if (!name?.trim() || !birthDate || !gender) {
    return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  const baby = await prisma.baby.create({
    data: {
      ownerEmail: user.email,
      name: name.trim(),
      birthDate: new Date(birthDate),
      gender,
    },
  });

  return NextResponse.json(baby);
}
