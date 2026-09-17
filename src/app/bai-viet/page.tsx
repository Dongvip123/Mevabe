import { prisma } from "@/lib/prisma";
import ArticleSearch from "@/components/ArticleSearch";

export const metadata = {
  title: "Bài viết",
  description:
    "Toàn bộ bài viết về giấc ngủ, dinh dưỡng, sức khỏe, phát triển và tiêm phòng cho bé trên Mầm Nhỏ.",
  alternates: { canonical: "/bai-viet" },
};

export default async function BaiVietPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif-display text-3xl text-forest mb-2">Bài viết</h1>
      <p className="text-ink-soft mb-10">
        {articles.length} bài viết về giấc ngủ, dinh dưỡng và tiêm phòng cho bé.
      </p>
      <ArticleSearch articles={articles} />
    </section>
  );
}
