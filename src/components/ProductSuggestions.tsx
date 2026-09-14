import Image from "next/image";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: string | null;
  affiliateUrl: string;
  note: string | null;
};

export default function ProductSuggestions({
  products,
  title = "Sản phẩm mẹ và bé gợi ý",
}: {
  products: Product[];
  title?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-line pt-8 mt-8">
      <p className="font-serif-display text-lg text-forest mb-1">{title}</p>
      <p className="text-xs text-ink-soft/70 mb-5">
        Mầm Nhỏ có thể nhận hoa hồng khi bạn mua qua các liên kết dưới đây,
        không phát sinh thêm chi phí cho bạn.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((p) => (
          <a
            key={p.id}
            href={p.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="group block"
          >
            <div className="aspect-square bg-paper rounded-sm overflow-hidden mb-2">
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={200}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-xs text-ink leading-snug line-clamp-2">
              {p.name}
            </p>
            {p.price && (
              <p className="text-xs text-clay font-medium mt-1">{p.price}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
