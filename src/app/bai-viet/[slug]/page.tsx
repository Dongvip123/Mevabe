import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CommentSection from "@/components/CommentSection";
import ProductSuggestions from "@/components/ProductSuggestions";
import { getCategoryImage } from "@/lib/categoryImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    return { title: "Không tìm thấy bài viết" };
  }

  const imagePath = getCategoryImage(article.category);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/bai-viet/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/bai-viet/${article.slug}`,
      images: [{ url: imagePath, width: 400, height: 225 }],
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [imagePath],
    },
  };
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

  const products = await prisma.product.findMany({
    where: { category: article.category },
    orderBy: { order: "asc" },
    take: 4,
  });

  const paragraphs = article.content.split("\n\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Mầm Nhỏ" },
    publisher: { "@type": "Organization", name: "Mầm Nhỏ" },
  };

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/bai-viet" className="text-sm text-ink-soft hover:text-forest">
        ← Tất cả bài viết
      </Link>

      <div className="mt-6 rounded-md overflow-hidden bg-paper">
        <Image
          src={getCategoryImage(article.category)}
          alt=""
          width={800}
          height={450}
          className="w-full h-auto"
        />
      </div>

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

      <ProductSuggestions products={products} />

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
