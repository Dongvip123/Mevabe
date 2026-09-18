import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const growthSchema = z.object({
  babyId: z.string().min(1),
  date: z.string().refine((v) => !isNaN(Date.parse(v)), "Ngày không hợp lệ"),
  weightKg: z.number().positive().max(50).optional(),
  heightCm: z.number().positive().max(150).optional(),
  headCm: z.number().positive().max(80).optional(),
});

// Thêm một lần đo mới (cân nặng / chiều cao / vòng đầu)
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = growthSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ" },
      { status: 400 }
    );
  }

  const { babyId, date, weightKg, heightCm, headCm } = parsed.data;

  if (weightKg == null && heightCm == null && headCm == null) {
    return NextResponse.json(
      { error: "Cần nhập ít nhất một số đo" },
      { status: 400 }
    );
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
