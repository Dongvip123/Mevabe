import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata = {
  title: "Bài viết — Mầm Nhỏ",
};

export default function BaiVietPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif-display text-3xl text-forest mb-2">Bài viết</h1>
      <p className="text-ink-soft mb-10">
        {articles.length} bài viết về giấc ngủ, dinh dưỡng và tiêm phòng cho bé.
      </p>
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
              <h2 className="font-serif-display text-xl text-ink group-hover:text-forest transition-colors">
                {a.title}
              </h2>
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
  );
}
