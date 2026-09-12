import Link from "next/link";

export default function LoiDangNhapPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-serif-display text-2xl text-forest mb-3">
        Link đăng nhập không hợp lệ
      </h1>
      <p className="text-ink-soft mb-6">
        Link có thể đã hết hạn hoặc đã được dùng rồi. Vui lòng thử đăng nhập
        lại.
      </p>
      <Link href="/" className="text-forest underline">
        Quay về trang chủ
      </Link>
    </section>
  );
}
