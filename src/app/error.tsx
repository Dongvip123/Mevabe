"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="font-serif-display text-6xl text-clay mb-4">!</p>
      <h1 className="font-serif-display text-2xl text-forest mb-3">
        Có lỗi xảy ra
      </h1>
      <p className="text-ink-soft mb-8">
        Trang gặp trục trặc bất ngờ. Bạn thử tải lại xem sao — nếu vẫn lỗi,
        quay lại sau ít phút nhé.
      </p>
      <button
        onClick={reset}
        className="bg-forest text-cream px-5 py-2.5 rounded-sm text-sm hover:bg-forest-light transition-colors"
      >
        Thử lại
      </button>
    </section>
  );
}
