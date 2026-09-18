export const metadata = {
  title: "Điều khoản sử dụng",
  description: "Các điều khoản khi sử dụng nội dung và tính năng trên Mầm Nhỏ.",
};

export default function DieuKhoanSuDungPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif-display text-3xl text-forest mb-8">
        Điều khoản sử dụng
      </h1>
      <div className="flex flex-col gap-6 text-ink leading-relaxed">
        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Nội dung mang tính tham khảo
          </h2>
          <p>
            Toàn bộ nội dung trên Mầm Nhỏ (bài viết, gợi ý từ trợ lý AI nếu
            có) mang tính tham khảo chung, không thay thế cho tư vấn, chẩn
            đoán hay điều trị y tế từ bác sĩ. Khi bé có dấu hiệu bất thường
            về sức khỏe, cha mẹ nên đưa bé đến cơ sở y tế để được thăm khám
            trực tiếp.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Tài khoản và bình luận
          </h2>
          <p>
            Khi để lại bình luận, bạn cam kết không đăng nội dung xúc phạm,
            sai sự thật, hoặc vi phạm pháp luật. Mầm Nhỏ có quyền gỡ bỏ bình
            luận vi phạm mà không cần báo trước.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Dữ liệu theo dõi bé
          </h2>
          <p>
            Dữ liệu bạn nhập vào tính năng theo dõi bé (cân nặng, chiều cao...)
            do bạn tự nhập và tự chịu trách nhiệm về độ chính xác. Đây là
            công cụ hỗ trợ ghi chép, không phải công cụ chẩn đoán y khoa.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Thay đổi điều khoản
          </h2>
          <p>
            Mầm Nhỏ có thể cập nhật các điều khoản này theo thời gian. Phiên
            bản mới nhất luôn được đăng tại trang này.
          </p>
        </div>

        <p className="text-sm text-ink-soft">
          Cập nhật lần cuối: tháng 9 năm 2026.
        </p>
      </div>
    </article>
  );
}
