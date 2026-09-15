import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

function ageInMonths(birthDate: Date) {
  const now = new Date();
  return Math.max(
    0,
    (now.getFullYear() - birthDate.getFullYear()) * 12 +
      (now.getMonth() - birthDate.getMonth())
  );
}

// Trích 2 số tháng đầu/cuối trong ageTag, ví dụ "4-12 tháng" -> [4, 12]
function parseAgeRange(ageTag: string): [number, number] {
  const match = ageTag.match(/(\d+)\D+(\d+)/);
  if (!match) return [0, 999];
  return [parseInt(match[1]), parseInt(match[2])];
}

export async function GET(request: Request) {
  // Bảo vệ endpoint: chỉ Vercel Cron (có đúng secret) mới gọi được
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Không có quyền" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Chưa cấu hình RESEND_API_KEY" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const babies = await prisma.baby.findMany();
  const articles = await prisma.article.findMany();

  let sentCount = 0;

  for (const baby of babies) {
    const months = ageInMonths(baby.birthDate);
    const matched = articles
      .filter((a: (typeof articles)[number]) => {
        const [min, max] = parseAgeRange(a.ageTag);
        return months >= min && months <= max;
      })
      .slice(0, 3);

    if (matched.length === 0) continue;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mevabe-red.vercel.app";

    const html = `
      <div style="font-family: sans-serif; color: #2a2a22;">
        <h2 style="color: #24402f;">Bài viết tuần này cho ${baby.name} (${months} tháng tuổi)</h2>
        <ul>
          ${matched
            .map(
              (a: (typeof matched)[number]) =>
                `<li style="margin-bottom: 10px;"><a href="${siteUrl}/bai-viet/${a.slug}" style="color: #24402f;">${a.title}</a><br/><span style="color:#5c5b4e; font-size: 13px;">${a.excerpt}</span></li>`
            )
            .join("")}
        </ul>
        <p style="font-size: 12px; color: #5c5b4e;">Bạn nhận được email này vì đã tạo hồ sơ theo dõi bé trên Mầm Nhỏ.</p>
      </div>
    `;

    await resend.emails.send({
      from: "Mầm Nhỏ <onboarding@resend.dev>",
      to: baby.ownerEmail,
      subject: `Bài viết tuần này cho ${baby.name}`,
      html,
    });

    sentCount++;
  }

  return NextResponse.json({ sent: sentCount });
}
