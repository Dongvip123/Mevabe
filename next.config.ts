import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cho phép hiển thị ảnh sản phẩm affiliate từ các sàn TMĐT phổ biến
    remotePatterns: [
      { protocol: "https", hostname: "**.susercontent.com" }, // Shopee
      { protocol: "https", hostname: "**.shopee.vn" },
      { protocol: "https", hostname: "**.lazada.vn" },
      { protocol: "https", hostname: "**.lzd-img-global.slatic.net" }, // Lazada
      { protocol: "https", hostname: "**.tiki.vn" },
      { protocol: "https", hostname: "**.tikicdn.com" },
    ],
  },
};

export default nextConfig;
