import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Thêm một lần đo mới (cân nặng / chiều cao / vòng đầu)
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json();
  const { babyId, date, weightKg, heightCm, headCm } = body as {
    babyId?: string;
    date?: string;
    weightKg?: number;
    heightCm?: number;
    headCm?: number;
  };

  if (!babyId || !date) {
    return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  // Chỉ cho phép thêm dữ liệu vào đúng hồ sơ bé của chính người dùng này
  const baby = await prisma.baby.findFirst({
    where: { id: babyId, ownerEmail: user.email },
  });
  if (!baby) {
    return NextResponse.json({ error: "Không tìm thấy hồ sơ bé" }, { status: 404 });
  }

  const record = await prisma.growthRecord.create({
    data: {
      babyId,
      date: new Date(date),
      weightKg: weightKg ?? null,
      heightCm: heightCm ?? null,
      headCm: headCm ?? null,
    },
  });

  return NextResponse.json(record);
}
