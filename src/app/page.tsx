import Link from "next/link";
import { articles } from "@/lib/articles";

const milestones = [
  { age: "1 tháng", size: 88 },
  { age: "3 tháng", size: 130 },
  { age: "6 tháng", size: 172 },
  { age: "12 tháng", size: 214 },
];

const categories = [
  {
    name: "Giấc ngủ",
    desc: "Nhịp ngủ theo từng tháng tuổi, cách giúp bé ngủ ngon hơn và khi nào cần lo lắng.",
  },
  {
    name: "Dinh dưỡng",
    desc: "Bú mẹ, ăn dặm, tăng cân theo chuẩn WHO — đọc đúng, đọc đủ, không hoang mang.",
  },
  {
    name: "Tiêm phòng",
    desc: "Lịch tiêm chủng năm đầu đời và những phản ứng thường gặp sau tiêm.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <h1 className="font-serif-display text-[2.75rem] leading-[1.08] text-forest">
            Mỗi ngày con lớn thêm một chút.
          </h1>
          <p className="mt-5 text-ink-soft text-lg leading-relaxed max-w-md">
            Mầm Nhỏ gom lại những kiến thức chăm sóc mẹ và bé đáng tin cậy —
            viết dễ hiểu, có căn cứ, để cha mẹ đỡ hoang mang giữa hàng ngàn
            thông tin trên mạng.
          </p>
          <Link
            href="/bai-viet"
            className="inline-block mt-8 bg-forest text-cream px-6 py-3 rounded-sm hover:bg-forest-light transition-colors"
          >
            Đọc bài viết mới nhất
          </Link>
        </div>

        {/* Growth ring motif */}
        <div className="relative h-64 flex items-center justify-center">
          {milestones.map((m, i) => (
            <div
              key={m.age}
              className="absolute rounded-full border border-forest/25"
              style={{ width: m.size, height: m.size }}
            />
          ))}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="font-serif-display text-3xl text-clay">12</span>
            <span className="text-xs text-ink-soft">tháng đầu đời</span>
          </div>
          {milestones.map((m, i) => (
            <span
              key={`label-${m.age}`}
              className="absolute text-[11px] text-ink-soft"
              style={{
                top: `calc(50% - ${m.size / 2}px - 14px)`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {i === milestones.length - 1 ? "" : m.age}
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-paper border-y border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-serif-display text-2xl text-forest mb-10">
            Bắt đầu từ đâu?
          </h2>
          <div className="grid sm:grid-cols-3 gap-px bg-line">
            {categories.map((c) => (
              <div key={c.name} className="bg-paper p-6">
                <h3 className="font-serif-display text-lg text-forest mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured articles */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif-display text-2xl text-forest mb-10">
          Bài viết mới
        </h2>
        <div className="flex flex-col divide-y divide-line">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/bai-viet/${a.slug}`}
              className="group py-6 grid sm:grid-cols-[110px_1fr] gap-4 items-baseline"
            >
              <span className="text-xs uppercase tracking-wide text-clay">
                {a.category}
              </span>
              <div>
                <h3 className="font-serif-display text-xl text-ink group-hover:text-forest transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-2xl">
                  {a.excerpt}
                </p>
                <span className="mt-2 inline-block text-xs text-ink-soft/70">
                  {a.ageTag} · {a.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="ve-mam-nho" className="bg-forest text-cream">
        <div className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-[1fr_1.2fr] gap-10">
          <h2 className="font-serif-display text-2xl">Về Mầm Nhỏ</h2>
          <p className="text-cream/85 leading-relaxed">
            Mầm Nhỏ là nơi tổng hợp kiến thức chăm sóc mẹ và bé, tập trung vào
            giai đoạn năm đầu đời — giai đoạn có nhiều thay đổi và cũng nhiều
            câu hỏi nhất với cha mẹ. Chúng tôi viết ngắn gọn, dễ đọc, và luôn
            ghi rõ khi nào cha mẹ nên tìm đến bác sĩ thay vì tự xử lý tại nhà.
          </p>
        </div>
      </section>
    </>
  );
}
