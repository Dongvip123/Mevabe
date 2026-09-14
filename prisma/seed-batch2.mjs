import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    slug: "be-1-thang-tuoi-ngu-bao-nhieu-tieng",
    title: "Bé 1 tháng tuổi ngủ bao nhiêu tiếng mỗi ngày?",
    category: "Giấc ngủ",
    ageTag: "0-1 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Bé 1 tháng tuổi thường ngủ gần như cả ngày, nhưng chia thành nhiều giấc ngắn. Đây là nhịp sinh học bình thường, không phải dấu hiệu bất ổn.",
    content: [
      "Ở tháng đầu tiên, bé thường ngủ tổng cộng khoảng 16-18 tiếng mỗi ngày, nhưng không ngủ liền mạch mà chia thành nhiều giấc ngắn 2-4 tiếng, xen kẽ các cữ bú. Dạ dày bé còn rất nhỏ nên cần bú thường xuyên, kể cả giữa đêm, và điều này ảnh hưởng trực tiếp đến nhịp ngủ.",
      "Nhiều cha mẹ lo lắng vì bé ngủ ngày nhiều hơn đêm trong vài tuần đầu. Đây là điều bình thường vì đồng hồ sinh học của bé chưa hình thành. Cha mẹ có thể giúp bé dần phân biệt ngày đêm bằng cách giữ phòng sáng, sinh hoạt bình thường vào ban ngày, và giảm ánh sáng, giữ yên tĩnh vào ban đêm.",
      "Nên đưa bé đi khám nếu bé ngủ li bì khó đánh thức để bú, bỏ bú liên tục nhiều cữ, thở khò khè bất thường khi ngủ, hoặc có biểu hiện lừ đừ kém phản ứng. Đây là những dấu hiệu cần bác sĩ nhi khoa kiểm tra trực tiếp.",
      "Thay vì đếm chính xác từng tiếng ngủ, cha mẹ nên quan sát tổng thể: bé có tỉnh táo khi thức, bú tốt, tăng cân đều hay không. Đó là những tín hiệu phản ánh sức khỏe của bé rõ ràng hơn con số giờ ngủ tuyệt đối.",
    ].join("\n\n"),
  },
  {
    slug: "be-2-thang-tang-can-bao-nhieu-la-chuan",
    title: "Bé 2 tháng tuổi tăng cân bao nhiêu là chuẩn?",
    category: "Dinh dưỡng",
    ageTag: "1-3 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Mức tăng cân trung bình của bé 2 tháng tuổi dao động khá rộng. Điều quan trọng là xu hướng tăng cân đều, không phải một con số cố định.",
    content: [
      "Theo tham chiếu chung, bé trong giai đoạn 1-3 tháng tuổi thường tăng khoảng 150-200 gram mỗi tuần, tức trung bình 600-900 gram mỗi tháng. Tuy nhiên đây chỉ là khoảng tham khảo rộng, không phải mức bắt buộc mọi bé phải đạt đúng.",
      "Tốc độ tăng cân phụ thuộc vào nhiều yếu tố: bé bú mẹ hay bú công thức, thể trạng lúc sinh, yếu tố di truyền từ gia đình. Bác sĩ nhi khoa thường quan tâm đến việc bé có đi theo đúng đường cong tăng trưởng của chính mình theo thời gian, hơn là so với mức trung bình chung.",
      "Cha mẹ nên đưa bé đi khám nếu thấy cân nặng đứng yên hoặc giảm trong hai lần cân liên tiếp, bé bú kém rõ rệt, ít ướt tã hơn bình thường, hoặc lừ đừ kém phản ứng. Đây là lúc cần bác sĩ đánh giá trực tiếp thay vì tự điều chỉnh chế độ bú.",
      "Ghi lại cân nặng đều đặn và vẽ thành biểu đồ theo thời gian sẽ cho cái nhìn chính xác hơn nhiều so với việc chỉ nhìn một con số tại một thời điểm.",
    ].join("\n\n"),
  },
  {
    slug: "cach-chon-sua-cong-thuc-cho-be",
    title: "Cách chọn sữa công thức cho bé",
    category: "Dinh dưỡng",
    ageTag: "0-12 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Không có loại sữa công thức nào là 'tốt nhất' cho mọi bé. Điều quan trọng là chọn đúng loại phù hợp với độ tuổi và cơ địa của con.",
    content: [
      "Sữa công thức được chia theo độ tuổi (số 1, 2, 3...) và theo mục đích sử dụng (sữa thường, sữa cho bé dị ứng đạm sữa bò, sữa cho bé trào ngược...). Việc đầu tiên cần làm là chọn đúng loại theo độ tuổi của bé, vì thành phần dinh dưỡng được điều chỉnh phù hợp với từng giai đoạn phát triển.",
      "Với bé không có vấn đề tiêu hóa hay dị ứng đặc biệt, hầu hết các thương hiệu sữa công thức đạt chuẩn trên thị trường đều đáp ứng đủ nhu cầu dinh dưỡng cơ bản. Sự khác biệt giữa các hãng chủ yếu nằm ở một số thành phần bổ sung, không phải chất lượng nền tảng.",
      "Nếu bé có dấu hiệu như nôn trớ nhiều, tiêu chảy kéo dài, phát ban, hoặc quấy khóc bất thường sau khi đổi sữa, nên đưa bé đi khám để bác sĩ đánh giá xem có phải dị ứng hoặc không dung nạp hay không, thay vì tự ý đổi liên tục nhiều loại sữa khác nhau.",
      "Khi đổi sữa, nên đổi từ từ bằng cách trộn dần sữa mới vào sữa cũ trong vài ngày, giúp hệ tiêu hóa của bé thích nghi, tránh đổi đột ngột toàn bộ trong một lần.",
    ].join("\n\n"),
  },
  {
    slug: "be-bi-tao-bon-phai-lam-sao",
    title: "Bé bị táo bón phải làm sao?",
    category: "Sức khỏe",
    ageTag: "0-12 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Tần suất đi ngoài của mỗi bé rất khác nhau. Táo bón thật sự được nhận biết qua độ cứng của phân và biểu hiện khó chịu, không chỉ dựa vào số ngày.",
    content: [
      "Táo bón ở trẻ nhỏ được nhận biết qua phân cứng, vón cục, bé phải rặn nhiều và có vẻ đau khi đi ngoài — chứ không đơn thuần là số ngày giữa hai lần đi ngoài. Một số bé bú mẹ hoàn toàn có thể vài ngày mới đi ngoài một lần nhưng phân vẫn mềm, đây không được coi là táo bón.",
      "Với bé đang bú mẹ, táo bón thường ít gặp hơn. Với bé bú công thức hoặc đã ăn dặm, táo bón có thể liên quan đến việc pha sữa chưa đúng tỷ lệ, hoặc chế độ ăn dặm còn thiếu chất xơ và nước.",
      "Một số cách hỗ trợ tại nhà: massage bụng nhẹ nhàng theo chiều kim đồng hồ, cho bé vận động chân theo động tác đạp xe, đảm bảo pha sữa đúng tỷ lệ hướng dẫn trên hộp. Với bé đã ăn dặm, có thể tăng cường rau củ quả giàu chất xơ trong khẩu phần.",
      "Nên đưa bé đi khám nếu táo bón kéo dài trên một tuần dù đã điều chỉnh, bé đau bụng quằn quại, có máu trong phân, hoặc bé bỏ bú kèm nôn ói. Đây là những dấu hiệu cần bác sĩ kiểm tra kỹ hơn.",
    ].join("\n\n"),
  },
  {
    slug: "be-khoc-dem-khong-ro-nguyen-nhan",
    title: "Bé khóc đêm không rõ nguyên nhân, mẹ nên làm gì?",
    category: "Giấc ngủ",
    ageTag: "0-6 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Khóc đêm là một phần bình thường trong những tháng đầu đời. Phần lớn trường hợp không nguy hiểm, nhưng cần biết khi nào là dấu hiệu bất thường.",
    content: [
      "Trong vài tháng đầu, hệ thần kinh của bé còn đang phát triển và chưa biết cách tự trấn an, nên việc khóc đêm — đặc biệt vào khung giờ chiều tối — là hiện tượng khá phổ biến, đôi khi được gọi là 'giờ khóc dạ đề' (colic). Tình trạng này thường giảm dần sau 3-4 tháng tuổi.",
      "Trước khi kết luận là khóc không rõ nguyên nhân, cha mẹ nên loại trừ các lý do cơ bản: bé đói, tã ướt/bẩn, quá nóng hoặc quá lạnh, muốn được bế, hoặc buồn ngủ nhưng chưa vào giấc được. Đây là những nguyên nhân phổ biến nhất và dễ xử lý nhất.",
      "Một số cách giúp bé dịu lại: quấn khăn (swaddle) tạo cảm giác an toàn, bế và đung đưa nhẹ nhàng, tạo tiếng ồn trắng (white noise) mô phỏng âm thanh trong bụng mẹ, hoặc cho bé ngậm núm vú giả nếu bé đã quen.",
      "Cần đưa bé đi khám ngay nếu bé khóc thét bất thường kèm sốt, bụng chướng cứng, khóc khi chạm vào một vùng cơ thể cụ thể, bỏ bú, hoặc khóc liên tục không dỗ được trong thời gian dài bất thường so với mọi khi. Đây có thể là dấu hiệu của vấn đề sức khỏe cần được bác sĩ đánh giá.",
    ].join("\n\n"),
  },
  {
    slug: "dau-hieu-be-san-sang-an-dam",
    title: "Dấu hiệu bé sẵn sàng ăn dặm",
    category: "Dinh dưỡng",
    ageTag: "4-6 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Ăn dặm không chỉ dựa vào tháng tuổi. Bé cần đạt một số mốc phát triển nhất định để việc ăn dặm an toàn và hiệu quả.",
    content: [
      "Tổ chức Y tế Thế giới khuyến nghị bắt đầu ăn dặm khi bé khoảng 6 tháng tuổi, song mốc thời gian cụ thể nên kết hợp với các dấu hiệu sẵn sàng về thể chất, thay vì chỉ dựa vào ngày tháng.",
      "Các dấu hiệu cho thấy bé có thể đã sẵn sàng: bé giữ đầu cổ vững vàng khi ngồi, có thể ngồi với sự hỗ trợ, mất dần phản xạ đẩy lưỡi (không còn tự động đẩy thức ăn ra khỏi miệng), và tỏ ra hứng thú khi thấy người lớn ăn, ví dụ với tay lấy đồ ăn.",
      "Nên bắt đầu ăn dặm bằng lượng nhỏ, một loại thực phẩm mỗi lần để dễ theo dõi phản ứng dị ứng, tăng dần độ đặc và đa dạng theo thời gian. Sữa mẹ hoặc sữa công thức vẫn là nguồn dinh dưỡng chính trong giai đoạn đầu ăn dặm.",
      "Nếu bé có tiền sử gia đình bị dị ứng thực phẩm, hoặc bé sinh non, nên hỏi ý kiến bác sĩ nhi khoa về thời điểm và cách bắt đầu ăn dặm phù hợp, thay vì áp dụng mốc chung cho mọi bé.",
    ].join("\n\n"),
  },
  {
    slug: "be-bi-tro-sua-nhieu-co-dang-lo",
    title: "Bé bị trớ sữa nhiều có đáng lo?",
    category: "Sức khỏe",
    ageTag: "0-6 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Trớ sữa sinh lý rất phổ biến ở trẻ nhỏ do cơ vòng dạ dày còn yếu. Phần lớn tự cải thiện theo thời gian mà không cần can thiệp.",
    content: [
      "Trớ sữa (trào ngược sinh lý) xảy ra ở phần lớn trẻ sơ sinh do cơ vòng giữa thực quản và dạ dày còn chưa phát triển hoàn chỉnh, khiến sữa dễ trào ngược lên sau khi bú. Tình trạng này thường giảm dần và hết hẳn khi bé được 12-18 tháng tuổi.",
      "Một số cách giúp giảm trớ sữa: cho bé bú chậm, tránh để bé bú quá no trong một cữ, bế bé thẳng đứng khoảng 15-20 phút sau khi bú, vỗ ợ hơi đúng cách, và tránh đặt bé nằm ngay sau khi bú no.",
      "Trớ sữa sinh lý khác với nôn ói bệnh lý. Cha mẹ nên đưa bé đi khám nếu bé trớ ra dịch màu xanh hoặc vàng, trớ vọt thành tia mạnh, bé không tăng cân hoặc sụt cân, quấy khóc dữ dội khi trớ, hoặc có dấu hiệu mất nước như ít đi tiểu, môi khô.",
      "Nếu tình trạng trớ ảnh hưởng đến việc tăng cân hoặc khiến bé khó chịu kéo dài, bác sĩ có thể đánh giá thêm để loại trừ các nguyên nhân khác như trào ngược dạ dày thực quản bệnh lý.",
    ].join("\n\n"),
  },
  {
    slug: "lich-sinh-hoat-an-choi-ngu-cho-be",
    title: "Lịch sinh hoạt (ăn - chơi - ngủ) cho bé theo từng tháng tuổi",
    category: "Giấc ngủ",
    ageTag: "0-6 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Nhịp sinh hoạt ăn - chơi - ngủ giúp bé dễ đoán và dễ chăm hơn, nhưng nên linh hoạt theo nhu cầu thực tế của từng bé, không áp đặt cứng nhắc.",
    content: [
      "Nhịp sinh hoạt 'ăn - chơi - ngủ' (Eat - Activity - Sleep) là cách sắp xếp phổ biến: sau khi bú, bé có một khoảng thời gian thức chơi ngắn, rồi mới đến giấc ngủ, thay vì bú xong ngủ luôn. Cách này giúp tách rời việc bú và việc ngủ, tránh hình thành thói quen phải bú mới ngủ được.",
      "Với bé 0-2 tháng, thời gian thức giữa các giấc ngủ thường chỉ khoảng 45-60 phút. Với bé 3-6 tháng, thời gian thức có thể kéo dài 1,5-2 tiếng. Đây là khoảng tham khảo chung, mỗi bé có thể có nhu cầu khác nhau.",
      "Quan sát các dấu hiệu buồn ngủ của bé — dụi mắt, ngáp, kéo tai, giảm hứng thú với đồ chơi — quan trọng hơn việc bám cứng vào một khung giờ cố định. Nếu ép bé thức quá lâu so với sức chịu đựng, bé thường sẽ khó vào giấc và quấy khóc nhiều hơn.",
      "Lịch sinh hoạt chỉ nên là khung tham khảo linh hoạt, không phải quy tắc bắt buộc. Với bé có vấn đề sức khỏe hoặc sinh non, nên tham khảo ý kiến bác sĩ về nhịp sinh hoạt phù hợp riêng.",
    ].join("\n\n"),
  },
  {
    slug: "be-moc-rang-dau-hieu-va-cach-cham-soc",
    title: "Bé mọc răng: dấu hiệu và cách chăm sóc",
    category: "Phát triển",
    ageTag: "4-12 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Mọc răng có thể khiến bé khó chịu trong vài ngày, nhưng không nên đổ hết mọi triệu chứng bất thường cho việc mọc răng.",
    content: [
      "Bé thường bắt đầu mọc chiếc răng đầu tiên trong khoảng 4-12 tháng tuổi, dù thời điểm có thể khác nhau khá nhiều giữa các bé. Dấu hiệu thường gặp gồm: chảy nhiều nước dãi, thích cắn/gặm đồ vật, nướu sưng đỏ, khó chịu hoặc quấy hơn bình thường.",
      "Một số cách giúp bé dễ chịu hơn khi mọc răng: cho bé gặm vòng ngậm nướu đã làm mát trong tủ lạnh (không phải ngăn đá), massage nhẹ nướu bằng ngón tay sạch, lau nước dãi thường xuyên để tránh kích ứng da quanh miệng.",
      "Mọc răng có thể khiến bé hơi khó chịu, nhưng không nên mặc định mọi triệu chứng như sốt cao, tiêu chảy, hoặc phát ban là do mọc răng. Đây là quan niệm phổ biến nhưng chưa có nhiều bằng chứng y khoa ủng hộ.",
      "Nếu bé sốt trên 38.5 độ, tiêu chảy nhiều lần, hoặc quấy khóc dữ dội kéo dài, nên đưa bé đi khám để loại trừ các nguyên nhân khác thay vì chỉ cho là do mọc răng.",
    ].join("\n\n"),
  },
  {
    slug: "be-cham-biet-lay-biet-bo-co-dang-lo",
    title: "Bé chậm biết lẫy, biết bò có đáng lo?",
    category: "Phát triển",
    ageTag: "3-9 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Mốc vận động của mỗi bé có thể lệch nhau vài tuần đến vài tháng. Điều quan trọng là xu hướng phát triển tổng thể, không phải một mốc đơn lẻ.",
    content: [
      "Đa số bé biết lẫy trong khoảng 3-5 tháng tuổi và biết bò trong khoảng 6-10 tháng tuổi, nhưng đây là khoảng dao động khá rộng. Một số bé phát triển vận động thô chậm hơn một chút nhưng vẫn hoàn toàn khỏe mạnh, đặc biệt nếu bé có thời gian nằm sấp (tummy time) ít hơn các bé khác.",
      "Việc cho bé thời gian nằm sấp khi thức, dưới sự giám sát, mỗi ngày giúp tăng cường cơ cổ và cơ lưng — nền tảng quan trọng cho các mốc vận động sau này như lẫy, bò, ngồi.",
      "Một số bé bỏ qua giai đoạn bò và chuyển thẳng sang tập đứng, tập đi — đây cũng là biến thể bình thường, không phải dấu hiệu bất thường nếu các mốc phát triển khác của bé vẫn ổn.",
      "Nên đưa bé đi khám đánh giá phát triển nếu đến 6 tháng bé vẫn chưa thể tự lẫy dù được tập luyện thường xuyên, cơ thể mềm oặt hoặc cứng bất thường, hoặc bé không phản ứng, không giao tiếp mắt với người xung quanh. Bác sĩ nhi khoa hoặc chuyên gia phục hồi chức năng nhi có thể đánh giá kỹ hơn về mốc phát triển của bé.",
    ].join("\n\n"),
  },
  {
    slug: "cach-ha-sot-an-toan-cho-be-tai-nha",
    title: "Cách hạ sốt an toàn cho bé tại nhà",
    category: "Sức khỏe",
    ageTag: "0-12 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Sốt là phản ứng tự nhiên của cơ thể chống lại nhiễm trùng. Xử lý đúng cách tại nhà giúp bé dễ chịu hơn trong lúc theo dõi thêm.",
    content: [
      "Sốt được tính khi nhiệt độ đo ở hậu môn từ 38 độ C trở lên, hoặc đo ở nách từ 37.5 độ C trở lên. Sốt bản thân nó không phải là bệnh mà là phản ứng miễn dịch của cơ thể, thường đi kèm với một nguyên nhân khác như nhiễm virus, vi khuẩn, hoặc sau tiêm chủng.",
      "Một số cách hỗ trợ tại nhà khi bé sốt nhẹ: mặc quần áo mỏng thoáng, không ủ ấm quá mức, cho bé bú/uống đủ nước, lau người bằng nước ấm (không dùng nước lạnh hay cồn). Việc dùng thuốc hạ sốt cần theo đúng liều lượng theo cân nặng bé và hướng dẫn của bác sĩ hoặc dược sĩ, không tự ý tăng liều.",
      "Với trẻ dưới 3 tháng tuổi, bất kỳ cơn sốt nào từ 38 độ C trở lên đều cần đưa đi khám ngay, vì hệ miễn dịch của bé còn rất non yếu và sốt có thể là dấu hiệu của nhiễm trùng nghiêm trọng cần can thiệp sớm.",
      "Với bé lớn hơn, cần đưa đi khám ngay nếu sốt trên 39 độ không hạ dù đã dùng thuốc, sốt kèm co giật, phát ban, khó thở, li bì khó đánh thức, hoặc sốt kéo dài trên 2-3 ngày không rõ nguyên nhân.",
    ].join("\n\n"),
  },
  {
    slug: "be-bi-ham-ta-nguyen-nhan-va-cach-phong-tranh",
    title: "Bé bị hăm tã: nguyên nhân và cách phòng tránh",
    category: "Chăm sóc",
    ageTag: "0-12 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Hăm tã là tình trạng rất phổ biến ở trẻ nhỏ, chủ yếu do da tiếp xúc lâu với độ ẩm và ma sát. Phòng tránh đúng cách giúp giảm đáng kể tình trạng này.",
    content: [
      "Hăm tã xảy ra khi da vùng mặc tã bị kích ứng do tiếp xúc kéo dài với nước tiểu, phân, độ ẩm và ma sát từ tã. Biểu hiện thường là vùng da đỏ, đôi khi có các nốt nhỏ, khiến bé khó chịu, đặc biệt khi thay tã hoặc vệ sinh vùng đó.",
      "Cách phòng tránh hiệu quả nhất: thay tã thường xuyên, không để bé mặc tã ướt/bẩn quá lâu; vệ sinh nhẹ nhàng bằng nước ấm và lau khô hoàn toàn trước khi mặc tã mới; để da bé được 'thở' một khoảng thời gian không mặc tã mỗi ngày nếu có thể; chọn tã có kích cỡ vừa vặn, không quá chật.",
      "Có thể dùng kem chống hăm có chứa kẽm oxit như một lớp bảo vệ da mỗi lần thay tã, đặc biệt khi bé có dấu hiệu da nhạy cảm hoặc trong giai đoạn mọc răng (khi phân có thể thay đổi tính chất).",
      "Nên đưa bé đi khám nếu vùng hăm có mụn nước, chảy dịch, có mùi hôi bất thường, lan rộng nhanh, hoặc không cải thiện sau vài ngày chăm sóc tại nhà — đây có thể là dấu hiệu nhiễm nấm hoặc nhiễm khuẩn cần điều trị chuyên biệt.",
    ].join("\n\n"),
  },
  {
    slug: "vang-da-o-tre-so-sinh-khi-nao-can-kham",
    title: "Vàng da ở trẻ sơ sinh: khi nào bình thường, khi nào cần khám?",
    category: "Sức khỏe",
    ageTag: "0-1 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Vàng da sinh lý khá phổ biến ở trẻ sơ sinh và thường tự hết. Tuy nhiên một số trường hợp cần được theo dõi và điều trị y tế.",
    content: [
      "Vàng da sinh lý xảy ra ở nhiều trẻ sơ sinh trong tuần đầu tiên do gan của bé chưa xử lý kịp lượng bilirubin sinh ra khi hồng cầu bị phá hủy tự nhiên. Tình trạng này thường xuất hiện từ ngày thứ 2-3 sau sinh, đạt đỉnh khoảng ngày thứ 4-5, và tự hết trong vòng 1-2 tuần.",
      "Vàng da sinh lý thường bắt đầu từ mặt, sau đó có thể lan xuống ngực nếu nặng hơn, nhưng không lan đến tay chân, và bé vẫn bú tốt, tỉnh táo bình thường.",
      "Vàng da cần được thăm khám ngay nếu xuất hiện trong 24 giờ đầu sau sinh, vàng da lan xuống đến bụng, tay, chân, bé bú kém, lừ đừ, khó đánh thức, hoặc vàng da kéo dài quá 2 tuần (với bé sinh đủ tháng) hoặc quá 3 tuần (với bé sinh non). Đây có thể là dấu hiệu của vàng da bệnh lý cần được bác sĩ theo dõi mức bilirubin và can thiệp kịp thời.",
      "Với những trường hợp vàng da nặng cần điều trị, phương pháp phổ biến là chiếu đèn (quang trị liệu) tại cơ sở y tế. Cha mẹ không nên tự phơi nắng cho bé để chữa vàng da vì không đủ hiệu quả và có thể gây hại cho làn da nhạy cảm của trẻ sơ sinh.",
    ].join("\n\n"),
  },
  {
    slug: "be-ngu-ngay-cay-dem-phai-lam-sao",
    title: "Bé ngủ ngày cày đêm phải làm sao?",
    category: "Giấc ngủ",
    ageTag: "0-3 tháng",
    readTime: "4 phút đọc",
    excerpt:
      "Nhầm lẫn ngày đêm là tình trạng phổ biến ở trẻ sơ sinh. Có thể cải thiện dần bằng những điều chỉnh nhỏ trong sinh hoạt hằng ngày.",
    content: [
      "Trong bụng mẹ, bé không phân biệt ngày và đêm, nên sau khi sinh cần một khoảng thời gian để đồng hồ sinh học dần hình thành, thường rõ rệt hơn từ 6-8 tuần tuổi trở đi. Trước đó, việc bé ngủ nhiều ban ngày và thức nhiều ban đêm là điều khá phổ biến.",
      "Để giúp bé dần điều chỉnh, ban ngày nên giữ không gian sáng, tiếng ồn sinh hoạt bình thường, chơi và trò chuyện với bé nhiều hơn khi bé thức. Ban đêm nên giữ ánh sáng dịu, hạn chế nói chuyện hoặc chơi đùa, kể cả khi cho bé bú đêm.",
      "Tránh để bé ngủ giấc ngày quá dài liên tục (quá 3-4 tiếng) nếu muốn giúp bé phân bổ giấc ngủ hợp lý hơn về đêm — có thể nhẹ nhàng đánh thức bé dậy bú sau khoảng thời gian đó.",
      "Đây là quá trình cần thời gian và sự kiên nhẫn, không có cách nào giúp bé đổi ngược hoàn toàn ngay lập tức. Nếu tình trạng không cải thiện sau vài tuần áp dụng, hoặc kèm theo các dấu hiệu bất thường khác, có thể trao đổi thêm với bác sĩ nhi khoa.",
    ].join("\n\n"),
  },
  {
    slug: "chuan-bi-do-so-sinh-can-thiet-cho-be",
    title: "Chuẩn bị đồ sơ sinh cần thiết cho bé",
    category: "Chăm sóc",
    ageTag: "0-1 tháng",
    readTime: "5 phút đọc",
    excerpt:
      "Không cần mua sắm quá nhiều trước khi sinh. Danh sách đồ dùng thiết yếu giúp cha mẹ chuẩn bị gọn gàng mà không lãng phí.",
    content: [
      "Nhóm quần áo: nên chuẩn bị khoảng 5-7 bộ quần áo cotton mềm cho bé sơ sinh, vài chiếc mũ thóp, bao tay/bao chân, vì bé sơ sinh thường cần thay đồ nhiều lần trong ngày do trớ sữa hoặc thấm nước tiểu.",
      "Nhóm vệ sinh và tã: tã sơ sinh (nên mua số lượng vừa phải trước, vì size sẽ thay đổi nhanh trong tháng đầu), khăn xô mềm, khăn tắm, nước muối sinh lý vệ sinh mắt mũi, kem chống hăm.",
      "Nhóm ăn uống và ngủ nghỉ: nếu dự định bú mẹ hoàn toàn thì chưa cần mua nhiều bình sữa; nên chuẩn bị nôi/cũi hoặc chỗ ngủ riêng an toàn cho bé, chăn mỏng, và máy hút sữa nếu mẹ có kế hoạch vắt trữ sữa.",
      "Không cần mua sắm quá nhiều đồ chơi hay thiết bị công nghệ đắt tiền ngay từ đầu — phần lớn không thực sự cần thiết trong tháng đầu. Cha mẹ nên ưu tiên sự đơn giản, gọn nhẹ, và dễ vệ sinh trong giai đoạn này.",
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
