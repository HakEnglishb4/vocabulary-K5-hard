
import React from 'react';
import ReactDOM from 'react-dom/client';

const { useState, useEffect, useMemo, useCallback, useRef } = React;

// Data from services/vocabulary.ts
const vocabularyData = [
    // 1. TIẾNG VIỆT - VIETNAMESE - GRADE 5
    {
        title: "1. Vietnamese - Grade 5",
        words: [
            { english: "Synonym", vietnamese: "từ đồng nghĩa", englishExample: "A synonym for 'happy' is 'joyful'.", vietnameseExample: "Từ đồng nghĩa của 'hạnh phúc' là 'vui sướng'." },
            { english: "Similar", vietnamese: "tương tự", englishExample: "My new phone is similar to my old one.", vietnameseExample: "Điện thoại mới của tôi tương tự cái cũ." },
            { english: "Opposite", vietnamese: "trái nghĩa", englishExample: "The opposite of 'hot' is 'cold'.", vietnameseExample: "Trái nghĩa của 'nóng' là 'lạnh'." },
            { english: "right", vietnamese: "quyền", englishExample: "Everyone has the right to learn.", vietnameseExample: "Mọi người đều có quyền học tập." },
            { english: "pay tax", vietnamese: "nộp thuế", englishExample: "Working adults have to pay tax to the government.", vietnameseExample: "Người lớn đi làm phải nộp thuế cho nhà nước." },
            { english: "Dash", vietnamese: "dấu gạch ngang", englishExample: "Use a dash to connect the words in 'well-being'.", vietnameseExample: "Sử dụng dấu gạch ngang để nối các từ trong 'well-being'." },
            { english: "willpower", vietnamese: "ý chí / nghị lực", englishExample: "It takes a lot of willpower to finish a marathon.", vietnameseExample: "Cần rất nhiều ý chí để hoàn thành một cuộc chạy marathon." },
            { english: "Proverb", vietnamese: "tục ngữ", englishExample: "My grandma often uses a proverb to teach us lessons.", vietnameseExample: "Bà tôi thường dùng tục ngữ để dạy chúng tôi những bài học." },
            { english: "Capitalization", vietnamese: "viết hoa", englishExample: "Capitalization is important for writing names and the start of sentences.", vietnameseExample: "Viết hoa rất quan trọng khi viết tên và bắt đầu câu." },
            { english: "original meaning", vietnamese: "nghĩa gốc", englishExample: "The word 'run' has an original meaning of moving fast on foot.", vietnameseExample: "Từ 'run' có nghĩa gốc là di chuyển nhanh bằng chân." },
            { english: "transferred meaning", vietnamese: "nghĩa chuyển", englishExample: "In 'the computer is running', 'running' has a transferred meaning.", vietnameseExample: "Trong câu 'máy tính đang chạy', 'chạy' có nghĩa chuyển." },
            { english: "express opinions", vietnamese: "bày tỏ ý kiến", englishExample: "It is good to express opinions clearly in a discussion.", vietnameseExample: "Bày tỏ ý kiến rõ ràng trong một cuộc thảo luận là điều tốt." },
            { english: "Exclamation", vietnamese: "câu cảm thán", englishExample: "An exclamation like 'Wow!' shows surprise.", vietnameseExample: "Một câu cảm thán như 'Wow!' thể hiện sự ngạc nhiên." },
            { english: "Period", vietnamese: "dấu chấm câu", englishExample: "Always end a sentence with a period.", vietnameseExample: "Luôn kết thúc câu bằng dấu chấm câu." }
        ]
    },
    // 2. TOÁN - MATHS - GRADE 5
    {
        title: "2. Maths - Grade 5",
        words: [
            { english: "natural number", vietnamese: "số tự nhiên", englishExample: "Five is a natural number, but negative five is not.", vietnameseExample: "Năm là một số tự nhiên, nhưng âm năm thì không." },
            { english: "sum", vietnamese: "tổng", englishExample: "The sum of five and three is eight.", vietnameseExample: "Tổng của năm và ba là tám." },
            { english: "Multiply", vietnamese: "Nhân", englishExample: "If you multiply four by three, you get twelve.", vietnameseExample: "Nếu bạn nhân bốn với ba, bạn sẽ được mười hai." },
            { english: "Divide", vietnamese: "Chia", englishExample: "Divide ten by two to get five.", vietnameseExample: "Chia mười cho hai để được năm." },
            { english: "subtract", vietnamese: "trừ", englishExample: "If you subtract two from seven, you get five.", vietnameseExample: "Nếu bạn trừ hai từ bảy, bạn sẽ được năm." },
            { english: "add", vietnamese: "cộng", englishExample: "If you add six and four, you get ten.", vietnameseExample: "Nếu bạn cộng sáu và bốn, bạn sẽ được mười." },
            { english: "Equals", vietnamese: "bằng", englishExample: "Two plus two equals four.", vietnameseExample: "Hai cộng hai bằng bốn." },
            { english: "average", vietnamese: "trung bình", englishExample: "The average of 2, 4, and 6 is 4.", vietnameseExample: "Trung bình của 2, 4 và 6 là 4." },
            { english: "fraction", vietnamese: "phân số", englishExample: "One half is written as a fraction: 1/2.", vietnameseExample: "Một nửa được viết dưới dạng phân số: 1/2." },
            { english: "larger", vietnamese: "lớn hơn", englishExample: "An elephant is larger than a mouse.", vietnameseExample: "Một con voi lớn hơn một con chuột." },
            { english: "three quarters", vietnamese: "3/4", englishExample: "He ate three quarters of the pizza.", vietnameseExample: "Anh ấy đã ăn ba phần tư chiếc bánh pizza." },
            { english: "one fifth", vietnamese: "1/5", englishExample: "I only want one fifth of the cake.", vietnameseExample: "Tôi chỉ muốn một phần năm của chiếc bánh." },
            { english: "two fifths", vietnamese: "2/5", englishExample: "She painted two fifths of the wall blue.", vietnameseExample: "Cô ấy đã sơn hai phần năm bức tường màu xanh." },
            { english: "zero point seven five", vietnamese: "0.75", englishExample: "The decimal zero point seven five is the same as the fraction 3/4.", vietnameseExample: "Số thập phân không phẩy bảy lăm tương đương với phân số 3/4." },
            { english: "compare", vietnamese: "so sánh", englishExample: "Let's compare the two answers to see which one is correct.", vietnameseExample: "Hãy so sánh hai câu trả lời để xem câu nào đúng." },
            { english: "round", vietnamese: "làm tròn", englishExample: "You can round 9.8 to the nearest whole number, which is 10.", vietnameseExample: "Bạn có thể làm tròn 9,8 đến số nguyên gần nhất là 10." },
            { english: "square meter", vietnamese: "mét vuông", englishExample: "My bedroom is about 15 square meters.", vietnameseExample: "Phòng ngủ của tôi rộng khoảng 15 mét vuông." },
            { english: "hectare", vietnamese: "héc-ta", englishExample: "A hectare is a unit of area equal to 10,000 square meters.", vietnameseExample: "Một héc-ta là một đơn vị diện tích bằng 10.000 mét vuông." }
        ]
    },
    // 3. LỊCH SỬ & ĐỊA LÍ - HISTORY AND GEOGRAPHY - GRADE 5
    {
        title: "3. History & Geography - Grade 5",
        words: [
            { english: "located", vietnamese: "vị trí", englishExample: "The school is located near the park.", vietnameseExample: "Trường học có vị trí gần công viên." },
            { english: "Southeast Asia", vietnamese: "Đông Nam Á", englishExample: "Vietnam is a country in Southeast Asia.", vietnameseExample: "Việt Nam là một quốc gia ở Đông Nam Á." },
            { english: "Europe", vietnamese: "châu Âu", englishExample: "France and Germany are countries in Europe.", vietnameseExample: "Pháp và Đức là các quốc gia ở châu Âu." },
            { english: "Africa", vietnamese: "châu Phi", englishExample: "The Sahara Desert is in Africa.", vietnameseExample: "Sa mạc Sahara nằm ở châu Phi." },
            { english: "border", vietnamese: "giáp với", englishExample: "Our school's playground has a border of trees.", vietnameseExample: "Sân chơi của trường chúng tôi có đường viền là cây cối." },
            { english: "shape", vietnamese: "hình dạng", englishExample: "A star has a unique shape.", vietnameseExample: "Một ngôi sao có hình dạng độc đáo." },
            { english: "territory", vietnamese: "lãnh thổ", englishExample: "A country's territory includes its land and water.", vietnameseExample: "Lãnh thổ của một quốc gia bao gồm đất liền và vùng nước." },
            { english: "include", vietnamese: "bao gồm", englishExample: "My breakfast will include bread and milk.", vietnameseExample: "Bữa sáng của tôi sẽ bao gồm bánh mì và sữa." },
            { english: "land", vietnamese: "vùng đất", englishExample: "Farmers grow crops on the land.", vietnameseExample: "Nông dân trồng trọt trên vùng đất." },
            { english: "airspace", vietnamese: "vùng trời", englishExample: "Airplanes must get permission to fly in a country's airspace.", vietnameseExample: "Máy bay phải được phép bay trong vùng trời của một quốc gia." },
            { english: "merger", vietnamese: "sáp nhập", englishExample: "The merger of the two companies created a bigger one.", vietnameseExample: "Sự sáp nhập của hai công ty đã tạo ra một công ty lớn hơn." },
            { english: "national flag", vietnamese: "quốc kỳ", englishExample: "The national flag of Vietnam is red with a yellow star.", vietnameseExample: "Quốc kỳ của Việt Nam màu đỏ với một ngôi sao vàng." },
            { english: "yellow star", vietnamese: "sao vàng", englishExample: "There is a big yellow star in the middle of the flag.", vietnameseExample: "Có một ngôi sao vàng lớn ở giữa lá cờ." },
            { english: "national anthem", vietnamese: "quốc ca", englishExample: "We sing the national anthem every Monday at school.", vietnameseExample: "Chúng tôi hát quốc ca vào mỗi thứ Hai ở trường." },
            { english: "archipelago", vietnamese: "quần đảo", englishExample: "An archipelago is a group of many islands.", vietnameseExample: "Một quần đảo là một nhóm gồm nhiều hòn đảo." },
            { english: "belong to", vietnamese: "thuộc về", englishExample: "This book does not belong to me.", vietnameseExample: "Cuốn sách này không thuộc về tôi." },
            { english: "ethnic groups", vietnamese: "dân tộc", englishExample: "Vietnam has 54 different ethnic groups.", vietnameseExample: "Việt Nam có 54 dân tộc khác nhau." },
            { english: "population", vietnamese: "dân cư", englishExample: "The population of our city is growing.", vietnameseExample: "Dân cư thành phố của chúng tôi đang tăng lên." },
            { english: "dense", vietnamese: "đông đúc", englishExample: "The forest is very dense with trees.", vietnameseExample: "Khu rừng rất rậm rạp cây cối." },
            { english: "plains", vietnamese: "đồng bằng", englishExample: "Many people live in the flat plains where they can grow rice.", vietnameseExample: "Nhiều người sống ở vùng đồng bằng phẳng để trồng lúa." },
            { english: "coastal areas", vietnamese: "vùng ven biển", englishExample: "People in coastal areas often work as fishermen.", vietnameseExample: "Người dân ở các vùng ven biển thường làm nghề chài lưới." },
            { english: "desert", vietnamese: "sa mạc", englishExample: "It is very hot and dry in the desert.", vietnameseExample: "Ở sa mạc rất nóng và khô." }
        ]
    },
    // 4. ÂM NHẠC - MUSIC - GRADE 5
    {
        title: "4. Music - Grade 5",
        words: [
            { english: "My joy", vietnamese: "Niềm vui của em", englishExample: "Listening to music is my joy.", vietnameseExample: "Nghe nhạc là niềm vui của em." },
            { english: "Sparkling", vietnamese: "lấp lánh, long lanh", englishExample: "The stars are sparkling in the sky.", vietnameseExample: "Những ngôi sao đang lấp lánh trên bầu trời." },
            { english: "Dewdrop", vietnamese: "giọt sương", englishExample: "A dewdrop is shining on the leaf.", vietnameseExample: "Một giọt sương đang sáng trên chiếc lá." },
            { english: "A dewdrop on a leaf", vietnamese: "Một giọt sương trên chiếc lá", englishExample: "I saw a dewdrop on a leaf this morning.", vietnameseExample: "Tôi đã thấy một giọt sương trên chiếc lá sáng nay." },
            { english: "Sparkling dewdrop", vietnamese: "Hạt sương long lanh", englishExample: "The sparkling dewdrop looks like a tiny diamond.", vietnameseExample: "Hạt sương long lanh trông như một viên kim cương nhỏ." },
            { english: "Sound", vietnamese: "âm thanh", englishExample: "The sound of the rain is very relaxing.", vietnameseExample: "Âm thanh của mưa rất thư giãn." },
            { english: "The sound of", vietnamese: "âm thanh của", englishExample: "I love the sound of the guitar.", vietnameseExample: "Tôi yêu âm thanh của đàn ghi ta." },
            { english: "Move", vietnamese: "vận động, di chuyển", englishExample: "Let's move to the music.", vietnameseExample: "Chúng ta hãy di chuyển theo điệu nhạc." },
            { english: "Moving", vietnamese: "đang di chuyển", englishExample: "The train is moving fast.", vietnameseExample: "Đoàn tàu đang di chuyển nhanh." },
            { english: "Stomp", vietnamese: "dậm, đạp", englishExample: "Stomp your feet to the beat!", vietnameseExample: "Hãy dậm chân theo nhịp điệu!" },
            { english: "Stomping feet", vietnamese: "dậm chân", englishExample: "I can hear the sound of stomping feet from upstairs.", vietnameseExample: "Tôi có thể nghe thấy tiếng dậm chân từ trên lầu." },
            { english: "Melody", vietnamese: "giai điệu", englishExample: "This song has a beautiful melody.", vietnameseExample: "Bài hát này có một giai điệu rất hay." },
            { english: "Instrument", vietnamese: "nhạc cụ", englishExample: "The piano is a musical instrument.", vietnameseExample: "Đàn piano là một loại nhạc cụ." },
            { english: "Musical instrument", vietnamese: "nhạc cụ (âm nhạc)", englishExample: "What is your favorite musical instrument?", vietnameseExample: "Nhạc cụ yêu thích của bạn là gì?" },
            { english: "Flute", vietnamese: "sáo", englishExample: "She can play the flute very well.", vietnameseExample: "Cô ấy có thể chơi sáo rất giỏi." },
            { english: "Drum", vietnamese: "trống", englishExample: "He plays the drum in a band.", vietnameseExample: "Anh ấy chơi trống trong một ban nhạc." },
            { english: "Keyboard", vietnamese: "bàn phím / đàn phím điện tử", englishExample: "I am learning to play the keyboard.", vietnameseExample: "Tôi đang học chơi đàn phím điện tử." },
            { english: "Electronic keyboard", vietnamese: "đàn phím điện tử", englishExample: "An electronic keyboard can make many different sounds.", vietnameseExample: "Một chiếc đàn phím điện tử có thể tạo ra nhiều âm thanh khác nhau." }
        ]
    },
    // 5. THỂ DỤC - PHYSICAL EDUCATION
    {
        title: "5. Physical Education",
        words: [
            { english: "Line", vietnamese: "Hàng dọc", englishExample: "Please stand in a straight line.", vietnameseExample: "Vui lòng đứng thành một hàng dọc thẳng." },
            { english: "Vertical line", vietnamese: "Hàng dọc", englishExample: "Draw a vertical line from the top to the bottom of the page.", vietnameseExample: "Hãy vẽ một đường thẳng đứng từ trên xuống dưới của trang giấy." },
            { english: "Row", vietnamese: "Hàng ngang", englishExample: "The students sat in a row.", vietnameseExample: "Các bạn học sinh ngồi thành một hàng ngang." },
            { english: "Horizontal line", vietnamese: "Hàng ngang", englishExample: "The horizon is a horizontal line where the sky meets the sea.", vietnameseExample: "Đường chân trời là một đường ngang nơi bầu trời gặp biển." },
            { english: "Player", vietnamese: "Cầu thủ", englishExample: "He is the best player on the team.", vietnameseExample: "Anh ấy là cầu thủ giỏi nhất trong đội." },
            { english: "Formation", vietnamese: "Đội hình", englishExample: "The football team practiced their new formation.", vietnameseExample: "Đội bóng đã tập luyện đội hình mới của họ." }
        ]
    },
    // 6. MĨ THUẬT - ART
    {
        title: "6. Art",
        words: [
            { english: "special", vietnamese: "đặc biệt", englishExample: "This is a very special gift.", vietnameseExample: "Đây là một món quà rất đặc biệt." },
            { english: "features", vietnamese: "đặc điểm", englishExample: "One of the features of a cat is its long tail.", vietnameseExample: "Một trong những đặc điểm của mèo là chiếc đuôi dài." },
            { english: "landscape", vietnamese: "phong cảnh", englishExample: "He painted a beautiful landscape with mountains and a river.", vietnameseExample: "Ông ấy đã vẽ một bức tranh phong cảnh tuyệt đẹp với núi và sông." },
            { english: "Bright sunshine and blue sky", vietnamese: "Ánh nắng rực rỡ và bầu trời xanh", englishExample: "We had bright sunshine and blue sky on our beach trip.", vietnameseExample: "Chúng tôi đã có nắng rực rỡ và trời xanh trong chuyến đi biển." },
            { english: "Snow and ice", vietnamese: "Tuyết và băng", englishExample: "In winter, the lake is covered with snow and ice.", vietnameseExample: "Vào mùa đông, hồ được bao phủ bởi tuyết và băng." },
            { english: "images", vietnamese: "hình ảnh", englishExample: "The book has many colorful images of animals.", vietnameseExample: "Cuốn sách có nhiều hình ảnh động vật đầy màu sắc." },
            { english: "include", vietnamese: "bao gồm", englishExample: "The price will include breakfast.", vietnameseExample: "Giá sẽ bao gồm bữa sáng." },
            { english: "Sea, sand and sunshine", vietnamese: "Biển, cát và ánh nắng", englishExample: "My perfect vacation is just sea, sand and sunshine.", vietnameseExample: "Kỳ nghỉ hoàn hảo của tôi chỉ là biển, cát và ánh nắng." },
            { english: "Snowmen and snowflakes", vietnamese: "Người tuyết và bông tuyết", englishExample: "Children love making snowmen and catching snowflakes.", vietnameseExample: "Trẻ em thích làm người tuyết và bắt những bông tuyết." },
            { english: "traditional", vietnamese: "truyền thống", englishExample: "Ao Dai is a traditional dress of Vietnam.", vietnameseExample: "Áo Dài là trang phục truyền thống của Việt Nam." },
            { english: "costumes", vietnamese: "trang phục", englishExample: "The actors wore beautiful costumes for the play.", vietnameseExample: "Các diễn viên đã mặc những bộ trang phục đẹp cho vở kịch." },
            { english: "opinion", vietnamese: "ý kiến", englishExample: "In my opinion, this movie is very interesting.", vietnameseExample: "Theo ý kiến của tôi, bộ phim này rất thú vị." },
            { english: "friendship", vietnamese: "tình bạn", englishExample: "Their friendship started when they were in primary school.", vietnameseExample: "Tình bạn của họ bắt đầu khi họ còn học tiểu học." },
            { english: "Sharing and helping each other", vietnamese: "Chia sẻ và giúp đỡ nhau", englishExample: "Sharing and helping each other is the key to a good friendship.", vietnameseExample: "Chia sẻ và giúp đỡ nhau là chìa khóa cho một tình bạn tốt đẹp." },
            { english: "Fighting and shouting", vietnamese: "Cãi nhau và la hét", englishExample: "Fighting and shouting will not solve the problem.", vietnameseExample: "Cãi nhau và la hét sẽ không giải quyết được vấn đề." },
            { english: "Playing games together", vietnamese: "Chơi trò chơi cùng nhau", englishExample: "We enjoy playing games together after school.", vietnameseExample: "Chúng tôi thích chơi game cùng nhau sau giờ học." },
            { english: "Fighting over toys", vietnamese: "Tranh giành đồ chơi", englishExample: "The two little brothers were fighting over toys.", vietnameseExample: "Hai anh em nhỏ đang tranh giành đồ chơi." }
        ]
    },
    // 7. TIN HỌC - INFORMATION TECHNOLOGY - GRADE 5
    {
        title: "7. Information Technology",
        words: [
            { english: "change colour", vietnamese: "thay đổi màu sắc", englishExample: "You can change the colour of the text here.", vietnameseExample: "Bạn có thể thay đổi màu sắc của văn bản ở đây." },
            { english: "create", vietnamese: "tạo ra", englishExample: "Let's create a new folder for our project.", vietnameseExample: "Hãy tạo một thư mục mới cho dự án của chúng ta." },
            { english: "create a new page", vietnamese: "tạo trang mới", englishExample: "I need to create a new page on my website.", vietnameseExample: "Tôi cần tạo một trang mới trên trang web của mình." },
            { english: "create that character", vietnamese: "tạo ra nhân vật", englishExample: "In this game, you can create a character that looks like you.", vietnameseExample: "Trong trò chơi này, bạn có thể tạo ra một nhân vật trông giống bạn." },
            { english: "character", vietnamese: "nhân vật", englishExample: "My favorite character in the story is the brave prince.", vietnameseExample: "Nhân vật yêu thích của tôi trong câu chuyện là hoàng tử dũng cảm." },
            { english: "software", vietnamese: "phần mềm", englishExample: "We use special software to learn English.", vietnameseExample: "Chúng tôi sử dụng phần mềm đặc biệt để học tiếng Anh." }
        ]
    },
    // 8. CÔNG NGHỆ - TECHNOLOGY - GRADE 5
    {
        title: "8. Technology - Grade 5",
        words: [
            { english: "the product of Technology", vietnamese: "sản phẩm công nghệ", englishExample: "A smartphone is a product of technology.", vietnameseExample: "Điện thoại thông minh là một sản phẩm của công nghệ." },
            { english: "the natural object", vietnamese: "đối tượng thiên nhiên", englishExample: "A tree is a natural object, but a plastic chair is not.", vietnameseExample: "Cây là đối tượng thiên nhiên, nhưng ghế nhựa thì không." },
            { english: "means of transport", vietnamese: "Phương tiện giao thông", englishExample: "A bicycle is a popular means of transport.", vietnameseExample: "Xe đạp là một phương tiện giao thông phổ biến." },
            { english: "calculator", vietnamese: "máy tính cầm tay", englishExample: "I use a calculator for difficult math problems.", vietnameseExample: "Tôi dùng máy tính cầm tay cho những bài toán khó." },
            { english: "Help to learn", vietnamese: "giúp học tập", englishExample: "This app can help to learn new words.", vietnameseExample: "Ứng dụng này có thể giúp học từ mới." },
            { english: "Help to play", vietnamese: "giúp vui chơi", englishExample: "Video games can help to play and relax after school.", vietnameseExample: "Trò chơi điện tử có thể giúp giải trí và thư giãn sau giờ học." },
            { english: "Help to move", vietnamese: "giúp di chuyển", englishExample: "A wheelchair can help to move people who cannot walk.", vietnameseExample: "Xe lăn có thể giúp di chuyển những người không thể đi lại." }
        ]
    },
    // 9. KỸ NĂNG SỐNG - LIFE SKILLS
    {
        title: "9. Life Skills",
        words: [
            { english: "Share", vietnamese: "chia sẻ", englishExample: "It's nice to share your snacks with friends.", vietnameseExample: "Thật tốt khi chia sẻ đồ ăn vặt của bạn với bạn bè." },
            { english: "Personal information", vietnamese: "thông tin cá nhân", englishExample: "Never share your personal information online.", vietnameseExample: "Đừng bao giờ chia sẻ thông tin cá nhân của bạn trên mạng." },
            { english: "Password", vietnamese: "mật khẩu", englishExample: "Choose a strong password for your email account.", vietnameseExample: "Hãy chọn một mật khẩu mạnh cho tài khoản email của bạn." },
            { english: "Upload", vietnamese: "tải lên", englishExample: "I will upload my photos to the cloud.", vietnameseExample: "Tôi sẽ tải ảnh của mình lên đám mây." },
            { english: "download", vietnamese: "tải xuống", englishExample: "You can download the document from this link.", vietnameseExample: "Bạn có thể tải tài liệu xuống từ liên kết này." },
            { english: "different ideas", vietnamese: "ý kiến khác nhau", englishExample: "It's okay for people to have different ideas.", vietnameseExample: "Mọi người có những ý kiến khác nhau là chuyện bình thường." },
            { english: "Argue", vietnamese: "cãi nhau/ tranh luận", englishExample: "They often argue about which movie to watch.", vietnameseExample: "Họ thường tranh luận về việc xem bộ phim nào." },
            { english: "Sneer", vietnamese: "chế giễu", englishExample: "It is not kind to sneer at others' mistakes.", vietnameseExample: "Chế giễu lỗi lầm của người khác là không tốt." },
            { english: "Exchange ideas", vietnamese: "trao đổi ý kiến", englishExample: "Let's meet to exchange ideas for the project.", vietnameseExample: "Hãy gặp nhau để trao đổi ý kiến cho dự án." },
            { english: "Invite", vietnamese: "mời/ rủ", englishExample: "I will invite my friends to my birthday party.", vietnameseExample: "Tôi sẽ mời bạn bè đến dự tiệc sinh nhật của mình." },
            { english: "Agree", vietnamese: "đồng ý", englishExample: "I agree with your opinion.", vietnameseExample: "Tôi đồng ý với ý kiến của bạn." },
            { english: "Curious", vietnamese: "tò mò", englishExample: "The cat was curious about the new toy.", vietnameseExample: "Con mèo tò mò về món đồ chơi mới." },
            { english: "Stranger", vietnamese: "người lạ", englishExample: "Don't talk to a stranger on the street.", vietnameseExample: "Đừng nói chuyện với người lạ trên đường." }
        ]
    }
];


// Components from components/
const SpeakerIcon = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
// FIX: Changed `className` to `class` to address the TypeScript error.
    class: "h-8 w-8",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
  })
);

const TrophyIcon = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-16 w-16",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
  React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.92,3.39a1,1,0,0,0-1.33-.22L12,6.1,7.41,3.17a1,1,0,0,0-1.33.22L2.1,9.45a1,1,0,0,0,0,1.1l2.1,6.28a1,1,0,0,0,1,.67H14.8a1,1,0,0,0,1-.67l2.1-6.28a1,1,0,0,0,0-1.1ZM13,16H7L5.5,12,3,9.4,4.5,7.4l3,2.25a1,1,0,0,0,1,0l3-2.25L13,9.4,14.5,12Z" })
);

const WrongAnswersModal = ({ isOpen, onClose, mistakes, onPracticeMistakes }) => {
  if (!isOpen) {
    return null;
  }

  return React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50",
      onClick: onClose
    },
    React.createElement(
      "div",
      {
        className: "bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col",
        onClick: (e) => e.stopPropagation()
      },
      React.createElement(
        "div",
        { className: "p-6 border-b border-gray-200 sticky top-0 bg-white" },
        React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, "Words to Review"),
        React.createElement("p", { className: "text-gray-500" }, "Here are the words you had trouble with.")
      ),
      React.createElement(
        "div",
        { className: "p-6 overflow-y-auto" },
        mistakes.length === 0
          ? React.createElement("p", { className: "text-center text-gray-500 py-8" }, "No mistakes yet. Great job!")
          : React.createElement(
              "ul",
              { className: "divide-y divide-gray-200" },
              mistakes.map((mistake, index) =>
                React.createElement(
                  "li",
                  {
                    key: index,
                    className: "py-4 flex flex-col items-start select-none",
                    onContextMenu: (e) => e.preventDefault()
                  },
                  React.createElement(
                    "div",
                    { className: "flex justify-between items-center w-full" },
                    React.createElement("span", { className: "text-lg text-gray-800 font-medium" }, mistake.word.english),
                    React.createElement("span", { className: "text-gray-600" }, mistake.word.vietnamese)
                  ),
                  mistake.sentenceErrorCount > 0 ?
                    React.createElement("p", { className: "text-sm font-semibold text-red-600 mt-1" }, `Sentence mistakes: ${mistake.sentenceErrorCount}`) : null,
                  mistake.word.englishExample ?
                    React.createElement("p", { className: "text-xl text-gray-500 mt-1 italic" }, `e.g., "${mistake.word.englishExample}"`) : null
                )
              )
            )
      ),
      React.createElement(
        "div",
        { className: "p-6 border-t border-gray-200 sticky bottom-0 bg-white space-y-2" },
         React.createElement(
          "button",
          {
            onClick: onPracticeMistakes,
            disabled: mistakes.length === 0,
            className: "w-full p-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          },
          `Practice Mistakes (${mistakes.length})`
        ),
        React.createElement(
          "button",
          {
            onClick: onClose,
            className: "w-full p-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
          },
          "Close"
        )
      )
    )
  );
};

const GameSummary = ({ score, total, onShowWrongAnswers, onNextTopic, onReturnToMenu, onPracticeMistakes, mistakesCount }) => {
  return React.createElement(
    "div",
    { className: "flex flex-col items-center justify-center min-h-screen p-4" },
    React.createElement(
      "div",
      { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200" },
      React.createElement(
        "div", { className: "flex justify-center text-sky-400 mb-4" },
        React.createElement(TrophyIcon)
      ),
      React.createElement("h1", { className: "text-3xl font-bold text-sky-600 mb-2" }, "Topic Complete!"),
      React.createElement("p", { className: "text-gray-600 mb-6" }, "Great job! Here's how you did."),
      React.createElement(
        "div", { className: "my-8" },
        React.createElement("p", { className: "text-lg text-gray-800" }, "Your Score"),
        React.createElement("p", { className: "text-6xl font-bold text-green-500" }, score, React.createElement("span", { className: "text-3xl text-gray-500" }, `/${total}`))
      ),
      React.createElement(
        "div", { className: "space-y-3" },
        React.createElement("button", { onClick: onNextTopic, className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200" }, "Continue to Next Topic"),
        mistakesCount > 0 ? React.createElement("button", { onClick: onPracticeMistakes, className: "w-full p-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-transform hover:scale-105 transform duration-200" }, `Practice ${mistakesCount} Mistake(s)`) : null,
        React.createElement("button", { onClick: onShowWrongAnswers, className: "w-full p-4 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-transform hover:scale-105 transform duration-200" }, "Review Mistakes"),
        React.createElement("button", { onClick: onReturnToMenu, className: "w-full p-3 bg-transparent text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors" }, "Back to Main Menu")
      )
    )
  );
};

const Game = ({ topic, onReturnToMenu, onNextTopic, onStartPractice }) => {
  const words = useMemo(() => [...topic.words].sort(() => 0.5 - Math.random()), [topic]);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [showWrongAnswersModal, setShowWrongAnswersModal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gameStage, setGameStage] = useState('word');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const inputRef = useRef(null);
  const currentWord = words[currentWordIndex];

  const speak = useCallback((text, onEndCallback = null) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      if (onEndCallback && typeof onEndCallback === 'function') {
        utterance.onend = onEndCallback;
      }
      window.speechSynthesis.speak(utterance);
    } else if (onEndCallback && typeof onEndCallback === 'function') {
      onEndCallback();
    }
  }, []);

  useEffect(() => {
    if (currentWord) {
      const textToSpeak = gameStage === 'word' ? currentWord.english : (currentWord.englishExample || '');

      if (textToSpeak) {
        setIsPreviewVisible(true);
        const playSecondTimeAndHide = () => {
          speak(textToSpeak, () => {
            setIsPreviewVisible(false);
            if (inputRef.current) inputRef.current.focus();
          });
        };
        speak(textToSpeak, playSecondTimeAndHide);
      } else {
        setIsPreviewVisible(false);
        if (inputRef.current) inputRef.current.focus();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentWord, gameStage, speak]);

  useEffect(() => {
      if (feedback) {
          const timer = setTimeout(() => setFeedback(null), 2500);
          return () => clearTimeout(timer);
      }
  }, [feedback]);

  const normalizeSentence = (str) => str.trim().toLowerCase().replace(/[.,!?]/g, '').replace(/[\u2018\u2019']/g, "'");

  const handleNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
      setAttempts(1);
      setShowHint(false);
      setFeedback(null);
      setGameStage('word');
    } else {
      setIsFinished(true);
    }
  }, [currentWordIndex, words.length]);
  
  const handleTransitionToSentence = useCallback(() => {
    if (currentWord.englishExample) {
        setGameStage('sentence');
        setUserInput('');
        setFeedback(null);
        setAttempts(1);
        setShowHint(false);
    } else {
        handleNextWord();
    }
  }, [currentWord, handleNextWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || feedback) return;

    if (gameStage === 'word') {
        const isCorrect = normalizeSentence(userInput) === normalizeSentence(currentWord.english);
        if (isCorrect) {
          setFeedback({type: 'correct', message: 'Correct!', example: currentWord.englishExample});
          if (attempts === 1) {
            setScore(prev => prev + 1);
          }
          setTimeout(handleTransitionToSentence, 2500);
        } else {
          setFeedback({type: 'incorrect', message: 'Incorrect, try again!'});
          if (attempts === 1) {
              setWrongAnswers(prev => {
                  if (!prev.some(m => m.word.english === currentWord.english)) {
                      return [...prev, { word: currentWord, sentenceErrorCount: 0 }];
                  }
                  return prev;
              });
          }
          setAttempts(prev => prev + 1);
          if (attempts >= 1) {
            setShowHint(true);
          }
        }
    } else { // gameStage === 'sentence'
        if (!currentWord.englishExample) return;
        
        const isCorrect = normalizeSentence(userInput) === normalizeSentence(currentWord.englishExample);
        if (isCorrect) {
            setFeedback({ type: 'correct', message: 'Excellent!' });
            setTimeout(handleNextWord, 1000);
        } else {
            setFeedback({ type: 'incorrect', message: 'Not quite, listen again!' });
            setAttempts(prev => prev + 1);
            if (attempts >= 1) {
              setShowHint(true);
            }
            setWrongAnswers(prev => {
                const existingMistakeIndex = prev.findIndex(m => m.word.english === currentWord.english);
                if (existingMistakeIndex > -1) {
                    const updatedMistakes = [...prev];
                    updatedMistakes[existingMistakeIndex].sentenceErrorCount += 1;
                    return updatedMistakes;
                } else {
                    return [...prev, { word: currentWord, sentenceErrorCount: 1 }];
                }
            });
        }
    }
  };

  const handleListenAgain = useCallback(() => {
      const textToSpeak = gameStage === 'word' ? currentWord.english : (currentWord.englishExample || '');
      if (textToSpeak) {
          setIsPreviewVisible(true);
          speak(textToSpeak, () => {
              setIsPreviewVisible(false);
              if (inputRef.current) inputRef.current.focus();
          });
      }
  }, [currentWord, gameStage, speak]);

  const handlePracticeMistakes = () => {
    if (wrongAnswers.length > 0) {
      setShowWrongAnswersModal(false); // Close modal if it's open
      onStartPractice(wrongAnswers);
    }
  };
  
  const getInputBorderColor = () => {
      if (!feedback) return 'border-gray-300 focus:border-sky-500';
      return feedback.type === 'correct' ? 'border-green-500 animate-pulse' : 'border-red-500 animate-pulse';
  }

  if (isFinished) {
    return React.createElement(React.Fragment, null,
      React.createElement(GameSummary, { 
        score, 
        total: words.length, 
        onShowWrongAnswers: () => setShowWrongAnswersModal(true), 
        onNextTopic, 
        onReturnToMenu,
        onPracticeMistakes: handlePracticeMistakes,
        mistakesCount: wrongAnswers.length 
      }),
      React.createElement(WrongAnswersModal, { 
        isOpen: showWrongAnswersModal, 
        onClose: () => setShowWrongAnswersModal(false), 
        mistakes: wrongAnswers,
        onPracticeMistakes: handlePracticeMistakes 
      })
    );
  }

  if (!currentWord) {
    return React.createElement("div", { className: "text-center p-8" }, "Loading topic...");
  }

  const progressPercentage = ((currentWordIndex) / words.length) * 100;

  return React.createElement(
    "div", { className: "flex flex-col items-center justify-center min-h-screen p-4" },
    React.createElement(
      "div", { className: "w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-gray-200" },
      React.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2.5 absolute top-0 left-0" },
        React.createElement("div", { className: "bg-sky-400 h-2.5 rounded-full", style: { width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' } })
      ),
      React.createElement("div", { className: "absolute top-4 left-4" },
        React.createElement("button", { onClick: onReturnToMenu, className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, "← Change Topic")
      ),
      React.createElement("div", { className: "absolute top-4 right-4" },
        React.createElement("button", { onClick: () => setShowWrongAnswersModal(true), className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, `Mistakes (${wrongAnswers.length})`)
      ),
      React.createElement("div", { className: "text-center mt-12" },
        React.createElement("h2", { className: "text-2xl font-bold text-sky-600 mb-2" }, topic.title),
        React.createElement("p", { className: "text-gray-500" }, `Word ${currentWordIndex + 1} of ${words.length} • Score: ${score}`)
      ),
      React.createElement("div", { className: "my-8 text-center min-h-[160px] flex flex-col justify-center items-center select-none", onContextMenu: (e) => e.preventDefault() },
        isPreviewVisible
          ? ( gameStage === 'word'
              ? React.createElement(React.Fragment, null,
// FIX: Changed `className` to `class` to address the TypeScript error.
                  React.createElement("p", { class: "text-4xl md:text-5xl font-semibold text-sky-700 mb-2 animate-pulse" }, currentWord.english),
                  React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.vietnamese})`)
                )
              : React.createElement(React.Fragment, null,
                  React.createElement("p", { className: "text-2xl text-sky-700 mb-2 italic animate-pulse" }, `"${currentWord.englishExample}"`),
                  React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.vietnameseExample})`)
                )
            )
          : ( gameStage === 'word'
              ? React.createElement(React.Fragment, null,
                  React.createElement("p", { className: "text-4xl md:text-5xl font-semibold text-gray-900 mb-2" }, currentWord.vietnamese),
                  currentWord.vietnameseExample ? React.createElement("p", { className: "text-xl text-gray-500 mt-2 italic" }, `"${currentWord.vietnameseExample}"`) : null
                )
              : React.createElement(React.Fragment, null,
                  React.createElement("p", { className: "text-2xl font-semibold text-gray-800 mb-2" }, "Listen and type the sentence:"),
                  currentWord.vietnameseExample ? React.createElement("p", { className: "text-2xl text-gray-700 mb-2 italic" }, `"${currentWord.vietnameseExample}"`) : null,
                  React.createElement("p", { className: "text-lg text-gray-500" }, `(${currentWord.english} - ${currentWord.vietnamese})`)
                )
            ),
        React.createElement("button", { onClick: handleListenAgain, className: "text-gray-500 hover:text-sky-500 transition-colors p-2 rounded-full active:scale-90 transform mt-2" },
          React.createElement(SpeakerIcon)
        )
      ),
      React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        React.createElement("input", {
          ref: inputRef,
          type: "text",
          value: userInput,
          onChange: (e) => setUserInput(e.target.value),
          placeholder: gameStage === 'word' ? "Type the English word..." : "Type the English sentence...",
// FIX: Corrected typo in function call.
          className: `w-full p-4 text-center text-lg bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 ${getInputBorderColor()}`,
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off"
        }),
        React.createElement("button", { type: "submit", className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:scale-100" }, "Submit")
      ),
      React.createElement("div", { className: "mt-4 min-h-[48px] flex items-center justify-center" },
          (showHint && !feedback) ? React.createElement("div", { className: "relative" },
            React.createElement("button", {
              onMouseDown: () => setIsHintVisible(true),
              onMouseUp: () => setIsHintVisible(false),
              onTouchStart: () => setIsHintVisible(true),
              onTouchEnd: () => setIsHintVisible(false),
              className: "px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            }, "Hold for Hint"),
            isHintVisible ? React.createElement("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg border border-gray-300 shadow-lg z-10 select-none" },
              React.createElement("p", { className: "text-sky-700 font-mono whitespace-nowrap" }, gameStage === 'word' ? currentWord.english : currentWord.englishExample)
            ) : null
          ) : null,
          feedback ? React.createElement(
            "div", 
            { className: "text-center" },
            React.createElement("p", { className: `text-lg font-semibold ${feedback.type === 'correct' ? 'text-green-500' : 'text-red-500'}` }, feedback.message),
            feedback.example ? React.createElement("p", { className: "text-lg text-gray-500 mt-1 italic" }, `e.g., "${feedback.example}"`) : null
          ) : null
      )
    ),
    React.createElement(WrongAnswersModal, { 
      isOpen: showWrongAnswersModal, 
      onClose: () => setShowWrongAnswersModal(false), 
      mistakes: wrongAnswers,
      onPracticeMistakes: handlePracticeMistakes 
    })
  );
};

// App component and its sub-components
const WelcomeScreen = ({ onNameSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return React.createElement(
        "div",
        { className: "flex flex-col items-center justify-center min-h-screen p-4 text-center" },
        React.createElement(
            "div",
            { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200" },
            React.createElement("h1", { className: "text-4xl font-bold text-sky-600 mb-2" }, "Vocabulary Challenge"),
            React.createElement("p", { className: "text-gray-600 mb-8" }, "Enter your name to start learning!"),
            React.createElement(
                "form",
                { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                React.createElement("input", {
                    type: "text",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "Your Name",
                    className: "w-full p-4 text-center text-lg bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
                    maxLength: 20
                }),
                React.createElement(
                    "button",
                    {
                        type: "submit",
                        disabled: !name.trim(),
                        className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                    },
                    "Start Learning"
                )
            )
        )
    );
};

const topicColors = [
  'bg-rose-100 border-rose-300 hover:bg-rose-200 text-rose-800 focus:ring-rose-500',
  'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-800 focus:ring-blue-500',
  'bg-cyan-100 border-cyan-300 hover:bg-cyan-200 text-cyan-800 focus:ring-cyan-500',
  'bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-800 focus:ring-amber-500',
  'bg-violet-100 border-violet-300 hover:bg-violet-200 text-violet-800 focus:ring-violet-500',
  'bg-fuchsia-100 border-fuchsia-300 hover:bg-fuchsia-200 text-fuchsia-800 focus:ring-fuchsia-500',
  'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-800 focus:ring-emerald-500',
  'bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-800 focus:ring-sky-500',
  'bg-lime-100 border-lime-300 hover:bg-lime-200 text-lime-800 focus:ring-lime-500',
  'bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-800 focus:ring-orange-500',
  'bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-800 focus:ring-teal-500',
  'bg-indigo-100 border-indigo-300 hover:bg-indigo-200 text-indigo-800 focus:ring-indigo-500',
  'bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-800 focus:ring-pink-500',
  'bg-yellow-100 border-yellow-300 hover:bg-yellow-200 text-yellow-800 focus:ring-yellow-500',
  'bg-green-100 border-green-300 hover:bg-green-200 text-green-800 focus:ring-green-500',
];

const TopicSelector = ({ playerName, onSelectTopic }) => {
  return React.createElement(
    "div", { className: "flex flex-col items-center min-h-screen p-4" },
    React.createElement(
      "div", { className: "w-full max-w-6xl text-center py-8" },
      React.createElement("h1", { className: "text-3xl md:text-4xl font-bold text-gray-800 mb-2" }, `Welcome, ${playerName}!`),
      React.createElement("p", { className: "text-lg text-gray-600 mb-8" }, "Choose a topic to begin your challenge."),
      React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" },
        vocabularyData.map((topic, index) =>
          React.createElement(
            "button",
            {
              key: index,
              onClick: () => onSelectTopic(topic),
              className: `p-4 rounded-lg shadow-md border hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${topicColors[index % topicColors.length]}`
            },
            React.createElement("h2", { className: "text-lg font-semibold" }, topic.title),
            React.createElement("p", { className: "mt-1 opacity-80" }, `${topic.words.length} words`)
          )
        )
      )
    )
  );
};

const App = () => {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('playerName') || '');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicIndex, setTopicIndex] = useState(null);

  const handleNameSubmit = useCallback((name) => {
    localStorage.setItem('playerName', name);
    setPlayerName(name);
  }, []);

  const handleSelectTopic = useCallback((topic) => {
    const index = vocabularyData.findIndex(t => t.title === topic.title);
    setCurrentTopic(topic);
    setTopicIndex(index);
  }, []);
  
  const handleReturnToMenu = useCallback(() => {
      setCurrentTopic(null);
      setTopicIndex(null);
  }, []);

  const handleNextTopic = useCallback(() => {
    if (topicIndex !== null && topicIndex !== -1 && topicIndex < vocabularyData.length - 1) {
        const nextIndex = topicIndex + 1;
        setCurrentTopic(vocabularyData[nextIndex]);
        setTopicIndex(nextIndex);
    } else {
        handleReturnToMenu();
    }
  }, [topicIndex, handleReturnToMenu]);

  const handleStartPractice = useCallback((mistakes) => {
    if (mistakes.length > 0) {
        const practiceTopic = {
            title: "Practice Mistakes",
            words: mistakes.map(mistake => mistake.word)
        };
        setCurrentTopic(practiceTopic);
        setTopicIndex(-1); // Use -1 to denote a practice session
    }
  }, []);

  if (!playerName) {
    return React.createElement(WelcomeScreen, { onNameSubmit: handleNameSubmit });
  }

  if (!currentTopic) {
    return React.createElement(TopicSelector, { playerName, onSelectTopic: handleSelectTopic });
  }

  return React.createElement(Game, { 
      topic: currentTopic, 
      onReturnToMenu: handleReturnToMenu, 
      onNextTopic: handleNextTopic,
      onStartPractice: handleStartPractice
  });
};

// Entry point from index.tsx
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
