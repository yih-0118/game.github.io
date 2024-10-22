function fetchDataAndRender() {
    var parameter1 = { url: 'https://docs.google.com/spreadsheets/d/1FEYm7AQKwusMBYxCyn3xESKQdWWcgEsXREAerQVO3RM/edit?resourcekey=&gid=1428893178#gid=1428893178' };
    $.get('https://script.google.com/macros/s/AKfycbxL-erB53WEOV8vC8z2-sNa5DD0n5x8jIjsXKR8y9d5CxsWyJKfguUoD4OXtWTHdhYa/exec', parameter1)
        .done(function (data) {
            var mostUsedChaptersContainer = $("#mostUsedChapters");
            mostUsedChaptersContainer.empty(); // 清除先前的資料
            var currentNum = 1;
            data.forEach(function (chapterData, index) {
                // 將前 5 名修改為前 10 名
                if (index < 10) {
                    var chapterName = chapterData[0]; // 第一欄：名稱
                    var score = chapterData[1];       // 第二欄：分數
                    if (chapterName !== "") {
                        var listItem = $("<div>").text(currentNum + ". " + chapterName + " :  " + score + "  分");
                        mostUsedChaptersContainer.append(listItem);
                        currentNum++;
                    }
                }
            });
        });
}

// 初始加載
fetchDataAndRender();
// 每五秒刷新一次
setInterval(fetchDataAndRender, 5000);
