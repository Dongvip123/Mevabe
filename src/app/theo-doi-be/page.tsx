import GrowthTracker from "@/components/GrowthTracker";

export const metadata = {
  title: "Theo dõi bé — Mầm Nhỏ",
};

export default function TheoDoiBePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif-display text-3xl text-forest mb-2">
        Theo dõi bé
      </h1>
      <p className="text-ink-soft mb-10">
        Ghi lại cân nặng, chiều cao của bé theo thời gian để xem xu hướng
        tăng trưởng — chỉ mình bạn nhìn thấy dữ liệu này.
      </p>
      <GrowthTracker />
    </section>
  );
}
