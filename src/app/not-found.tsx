import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="font-serif-display text-6xl text-honey mb-4">404</p>
      <h1 className="font-serif-display text-2xl text-forest mb-3">
        Không tìm thấy trang này
      </h1>
      <p className="text-ink-soft mb-8">
        Có thể đường link đã sai hoặc trang không còn tồn tại. Bạn thử quay
        về trang chủ hoặc xem danh sách bài viết nhé.
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/"
          className="bg-forest text-cream px-5 py-2.5 rounded-sm text-sm hover:bg-forest-light transition-colors"
        >
          Về trang chủ
        </Link>
        <Link
          href="/bai-viet"
          className="border border-line text-ink px-5 py-2.5 rounded-sm text-sm hover:border-forest transition-colors"
        >
          Xem bài viết
        </Link>
      </div>
    </section>
  );
}
