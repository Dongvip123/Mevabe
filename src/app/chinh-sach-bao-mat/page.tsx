export const metadata = {
  title: "Chính sách bảo mật",
  description: "Cách Mầm Nhỏ thu thập, sử dụng và bảo vệ thông tin của bạn.",
};

export default function ChinhSachBaoMatPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif-display text-3xl text-forest mb-8">
        Chính sách bảo mật
      </h1>
      <div className="flex flex-col gap-6 text-ink leading-relaxed">
        <p>
          Mầm Nhỏ tôn trọng quyền riêng tư của bạn. Trang này giải thích
          những thông tin chúng tôi thu thập và cách sử dụng chúng.
        </p>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Thông tin chúng tôi thu thập
          </h2>
          <p>
            Khi bạn đăng nhập bằng email, chúng tôi lưu địa chỉ email của bạn
            để xác thực tài khoản. Khi bạn để lại bình luận, nội dung bình
            luận và email được lưu lại. Khi bạn tạo hồ sơ theo dõi bé, chúng
            tôi lưu tên bé, ngày sinh, giới tính và các số đo cân nặng/chiều
            cao bạn nhập vào.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Cách chúng tôi sử dụng thông tin
          </h2>
          <p>
            Thông tin theo dõi bé chỉ hiển thị cho chính bạn, không công khai
            và không chia sẻ cho bên thứ ba. Email của bạn có thể được dùng
            để gửi gợi ý bài viết phù hợp với độ tuổi của bé (bạn có thể yêu
            cầu ngừng nhận email này bất cứ lúc nào).
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Dịch vụ bên thứ ba
          </h2>
          <p>
            Chúng tôi sử dụng Supabase để xác thực đăng nhập và lưu trữ dữ
            liệu, Vercel để vận hành website, và Resend để gửi email. Các
            liên kết sản phẩm trên trang có thể là liên kết tiếp thị liên kết
            (affiliate) — Mầm Nhỏ có thể nhận hoa hồng khi bạn mua hàng qua
            các liên kết đó, không phát sinh thêm chi phí cho bạn.
          </p>
        </div>

        <div>
          <h2 className="font-serif-display text-xl text-forest mb-2">
            Quyền của bạn
          </h2>
          <p>
            Bạn có thể yêu cầu xoá tài khoản và toàn bộ dữ liệu liên quan bất
            cứ lúc nào bằng cách liên hệ với chúng tôi.
          </p>
        </div>

        <p className="text-sm text-ink-soft">
          Cập nhật lần cuối: tháng 9 năm 2026.
        </p>
      </div>
    </article>
  );
}
