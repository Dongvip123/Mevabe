import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    slug: "be-so-sinh-ngu-bao-nhieu-la-du",
    title: "Bé sơ sinh ngủ bao nhiêu là đủ?",
    category: "Giấc ngủ",
    ageTag: "0-3 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Những tuần đầu đời, giấc ngủ của bé thường không theo giờ giấc cố định. Đây là điều bình thường, không phải dấu hiệu bé có vấn đề.",
    content: [
      "Trong 3 tháng đầu, bé sơ sinh thường ngủ tổng cộng khoảng 14-17 tiếng mỗi ngày, nhưng chia thành nhiều giấc ngắn 2-4 tiếng, xen kẽ giữa ngày và đêm. Đồng hồ sinh học của bé chưa hình thành, nên việc bé thức giữa đêm và ngủ nhiều vào ban ngày là chuyện bình thường, không phải dấu hiệu bất ổn.",
      "Một vài điều cha mẹ có thể làm để dần giúp bé phân biệt ngày và đêm: ban ngày giữ phòng sáng, sinh hoạt bình thường kể cả khi bé ngủ; buổi tối giảm ánh sáng, giữ không gian yên tĩnh, hạn chế nói chuyện hoặc chơi đùa khi cho bé bú đêm.",
      "Cha mẹ nên đưa bé đi khám nếu thấy bé ngủ li bì khó đánh thức để bú, bỏ bú nhiều cữ liên tiếp, hoặc có biểu hiện quấy khóc bất thường kéo dài kèm sốt. Những dấu hiệu này cần bác sĩ nhi khoa đánh giá trực tiếp thay vì tự theo dõi ở nhà.",
      "Mỗi bé có nhịp sinh học riêng, nên thay vì so sánh con với bé nhà khác, cha mẹ có thể quan sát xu hướng của chính con: bé có tăng cân đều, bú tốt, tỉnh táo và phản ứng bình thường khi thức hay không — đó là những tín hiệu quan trọng hơn con số giờ ngủ tuyệt đối.",
    ].join("\n\n"),
  },
  {
    slug: "be-tang-can-cham-co-dang-lo",
    title: "Bé tăng cân chậm — khi nào cha mẹ cần lo lắng?",
    category: "Dinh dưỡng",
    ageTag: "0-12 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Tốc độ tăng cân của mỗi bé không giống nhau. Điều quan trọng là theo dõi đường xu hướng trên biểu đồ tăng trưởng, không phải một lần cân đơn lẻ.",
    content: [
      "Tổ chức Y tế Thế giới (WHO) đưa ra biểu đồ tăng trưởng chuẩn theo tuổi và giới tính, nhưng đây là khoảng tham chiếu rộng, không phải một con số cố định bé nào cũng phải đạt đúng. Điều bác sĩ nhi khoa quan tâm nhất là đường cong tăng trưởng của bé có đi theo một xu hướng ổn định hay không, hơn là bé có nằm đúng mức trung bình hay không.",
      "Một số nguyên nhân phổ biến khiến bé tăng cân chậm trong giai đoạn đầu: bé bú chưa đủ cữ hoặc chưa đúng khớp ngậm, bé sinh non nên cần thời gian bắt kịp đà tăng trưởng, hoặc đơn giản là bé có tạng người nhỏ theo yếu tố di truyền từ gia đình.",
      "Dấu hiệu cha mẹ nên đưa bé đi khám sớm: đường tăng trưởng tụt xuống nhiều mức so với trước đó trong thời gian ngắn, bé bú kém rõ rệt, ít ướt tã hơn bình thường, hoặc lừ đừ kém phản ứng. Bác sĩ sẽ kiểm tra kỹ hơn thay vì cha mẹ tự điều chỉnh chế độ ăn dựa trên phỏng đoán.",
      "Ghi lại cân nặng của bé đều đặn mỗi tháng và vẽ thành biểu đồ theo thời gian sẽ hữu ích hơn nhiều so với việc chỉ nhìn một con số tại một thời điểm — đây cũng là lý do các công cụ theo dõi tăng trưởng theo chuẩn WHO được khuyến khích sử dụng lâu dài.",
    ].join("\n\n"),
  },
  {
    slug: "lich-tiem-phong-nam-dau-doi",
    title: "Lịch tiêm phòng năm đầu đời: những mốc cha mẹ cần nhớ",
    category: "Tiêm phòng",
    ageTag: "0-12 tháng",
    readTime: "6 phút đọc",
    excerpt:
      "Tiêm chủng đúng lịch giúp bảo vệ bé khỏi nhiều bệnh nguy hiểm trong giai đoạn hệ miễn dịch còn non yếu nhất.",
    content: [
      "Năm đầu đời là giai đoạn bé cần nhiều mũi tiêm nhất, vì đây là lúc hệ miễn dịch của bé còn non yếu và dễ bị tổn thương bởi các bệnh truyền nhiễm nguy hiểm như viêm gan B, lao, bạch hầu, ho gà, uốn ván, bại liệt hay các bệnh do phế cầu khuẩn gây ra.",
      "Lịch tiêm chủng có thể khác nhau đôi chút tùy theo bé tiêm ở chương trình tiêm chủng mở rộng hay dịch vụ, và tùy khuyến cáo cập nhật theo từng thời điểm. Vì vậy, cha mẹ nên theo lịch tiêm cụ thể mà bác sĩ hoặc cơ sở tiêm chủng đưa ra cho bé nhà mình, thay vì áp dụng cứng nhắc một lịch chung tìm thấy trên mạng.",
      "Sau khi tiêm, bé có thể sốt nhẹ, quấy khóc hoặc sưng đỏ tại chỗ tiêm trong 1-2 ngày — đây là phản ứng thường gặp. Cha mẹ nên liên hệ ngay cơ sở y tế nếu bé sốt cao trên 39 độ không hạ, quấy khóc liên tục bất thường, khó thở, hoặc có dấu hiệu dị ứng như phát ban lan rộng, sưng mặt.",
      "Việc lưu lại sổ tiêm chủng và đặt nhắc lịch trước mỗi mũi tiêm giúp cha mẹ không bỏ lỡ các mốc quan trọng — đặc biệt với các vắc-xin cần tiêm nhiều mũi nhắc lại theo đúng khoảng cách thời gian để đạt hiệu quả bảo vệ tốt nhất.",
    ].join("\n\n"),
  },
];

async function main() {
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
    console.log(`✔ Đã thêm/cập nhật: ${article.title}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
