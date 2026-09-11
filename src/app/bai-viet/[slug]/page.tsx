import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  return { title: article ? `${article.title} — Mầm Nhỏ` : "Mầm Nhỏ" };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/bai-viet" className="text-sm text-ink-soft hover:text-forest">
        ← Tất cả bài viết
      </Link>

      <span className="block mt-6 text-xs uppercase tracking-wide text-clay">
        {article.category} · {article.ageTag}
      </span>
      <h1 className="font-serif-display text-3xl text-forest mt-2 leading-tight">
        {article.title}
      </h1>
      <span className="block mt-3 text-xs text-ink-soft/70">{article.readTime}</span>

      <div className="mt-8 flex flex-col gap-5">
        {article.content.map((p, i) => (
          <p key={i} className="text-ink leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-6 text-sm text-ink-soft">
        Bài viết mang tính tham khảo chung, không thay thế tư vấn y tế. Nếu bé
        có dấu hiệu bất thường, hãy đưa bé đến gặp bác sĩ nhi khoa.
      </div>
    </article>
  );
}
