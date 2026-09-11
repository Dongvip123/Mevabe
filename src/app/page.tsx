import { articles } from "@/lib/articles";
import ArticleSearch from "@/components/ArticleSearch";

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
      <ArticleSearch articles={articles} />
    </section>
  );
}
