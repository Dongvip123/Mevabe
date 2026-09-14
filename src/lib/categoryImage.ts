// Ánh xạ mỗi danh mục bài viết sang 1 ảnh minh họa tương ứng
const categoryImages: Record<string, string> = {
  "Giấc ngủ": "/illustrations/giac-ngu.svg",
  "Dinh dưỡng": "/illustrations/dinh-duong.svg",
  "Sức khỏe": "/illustrations/suc-khoe.svg",
  "Phát triển": "/illustrations/phat-trien.svg",
  "Chăm sóc": "/illustrations/cham-soc.svg",
  "Tiêm phòng": "/illustrations/tiem-phong.svg",
};

export function getCategoryImage(category: string): string {
  return categoryImages[category] ?? "/illustrations/cham-soc.svg";
}
