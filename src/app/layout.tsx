import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mevabe-red.vercel.app";
const siteTitle = "Mầm Nhỏ — Đồng hành cùng mẹ và bé";
const siteDescription =
  "Kiến thức chăm sóc mẹ và bé đáng tin cậy, từ giấc ngủ, dinh dưỡng đến lịch tiêm chủng — viết dễ hiểu, có căn cứ.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Mầm Nhỏ",
  },
  description: siteDescription,
  keywords: [
    "chăm sóc bé",
    "mẹ và bé",
    "giấc ngủ trẻ sơ sinh",
    "dinh dưỡng cho bé",
    "tiêm phòng cho bé",
    "theo dõi tăng trưởng của bé",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Mầm Nhỏ",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <header className="border-b border-line bg-cream sticky top-0 z-20">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-serif-display text-xl text-forest tracking-tight">
              Mầm Nhỏ
            </Link>
            <nav className="flex items-center gap-6 text-sm text-ink-soft">
              <Link href="/" className="hover:text-forest transition-colors">
                Trang chủ
              </Link>
              <Link href="/bai-viet" className="hover:text-forest transition-colors">
                Bài viết
              </Link>
              <Link href="/theo-doi-be" className="hover:text-forest transition-colors">
                Theo dõi bé
              </Link>
              <Link href="/#ve-mam-nho" className="hover:text-forest transition-colors">
                Về Mầm Nhỏ
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-line bg-forest text-cream/80 mt-24">
          <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-3">
            <span className="font-serif-display text-lg text-cream">Mầm Nhỏ</span>
            <p className="text-sm max-w-xl leading-relaxed">
              Nội dung trên Mầm Nhỏ mang tính tham khảo chung, không thay thế cho tư vấn,
              chẩn đoán hay điều trị y tế. Khi bé có dấu hiệu bất thường, cha mẹ nên đưa bé
              đến gặp bác sĩ nhi khoa.
            </p>
            <p className="text-xs text-cream/50 mt-4">© 2026 Mầm Nhỏ.</p>
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  );
}
