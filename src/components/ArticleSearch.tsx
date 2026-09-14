"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@prisma/client";
import { getCategoryImage } from "@/lib/categoryImage";

export default function ArticleSearch({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");

  const results = articles.filter((a) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="relative mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm bài viết theo từ khoá, ví dụ: tiêm phòng, giấc ngủ..."
          className="w-full border border-line bg-paper rounded-sm px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-forest transition-colors"
        />
      </div>

      {results.length === 0 ? (
        <p className="text-ink-soft text-sm">
          Không tìm thấy bài viết phù hợp với “{query}”. Thử từ khoá khác xem
          sao.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-line">
          {results.map((a) => (
            <Link
              key={a.slug}
              href={`/bai-viet/${a.slug}`}
              className="group py-6 grid sm:grid-cols-[96px_110px_1fr] gap-4 items-center"
            >
              <div className="w-24 h-16 rounded-sm overflow-hidden bg-paper hidden sm:block">
                <Image
                  src={getCategoryImage(a.category)}
                  alt=""
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
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
      )}
    </div>
  );
}
