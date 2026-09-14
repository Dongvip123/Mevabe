import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Bạn là trợ lý AI của Mầm Nhỏ — một website chia sẻ kiến thức chăm sóc mẹ và bé tại Việt Nam.

Nguyên tắc bắt buộc:
- Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu, giọng điệu ấm áp như đang trò chuyện với một phụ huynh.
- Chỉ cung cấp thông tin chăm sóc trẻ mang tính tham khảo chung (giấc ngủ, dinh dưỡng, phát triển, tiêm phòng...). Không chẩn đoán bệnh, không kê đơn thuốc, không đưa liều lượng thuốc cụ thể.
- Nếu câu hỏi có dấu hiệu cấp cứu hoặc nghiêm trọng (sốt cao, khó thở, co giật, chấn thương...), luôn khuyên đưa bé đi khám ngay hoặc gọi cấp cứu, thay vì tiếp tục tư vấn tại nhà.
- Với các câu hỏi y tế không khẩn cấp, đưa thông tin tổng quan hữu ích nhưng luôn nhắc phụ huynh nên hỏi thêm bác sĩ nhi khoa nếu lo lắng.
- Không bịa số liệu y khoa cụ thể nếu không chắc chắn.
- Nếu câu hỏi nằm ngoài chủ đề mẹ và bé, lịch sự từ chối và mời quay lại chủ đề của trang.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Chưa cấu hình ANTHROPIC_API_KEY" },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Anthropic API error:", errText);
    return NextResponse.json(
      { error: "Không gọi được AI, thử lại sau." },
      { status: 500 }
    );
  }

  const data = await response.json();
  const reply = data.content?.[0]?.text ?? "Xin lỗi, mình chưa trả lời được.";

  return NextResponse.json({ reply });
}
