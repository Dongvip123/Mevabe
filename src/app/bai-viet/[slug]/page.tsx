import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CommentSection from "@/components/CommentSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });
  return { title: article ? `${article.title} — Mầm Nhỏ` : "Mầm Nhỏ" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });
  if (!article) notFound();

  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    orderBy: { createdAt: "desc" },
  });

  const paragraphs = article.content.split("\n\n");

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
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-ink leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-6 text-sm text-ink-soft">
        Bài viết mang tính tham khảo chung, không thay thế tư vấn y tế. Nếu bé
        có dấu hiệu bất thường, hãy đưa bé đến gặp bác sĩ nhi khoa.
      </div>

      <CommentSection
        articleId={article.id}
        initialComments={comments.map((c: (typeof comments)[number]) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
        }))}
      />
    </article>
  );
}
