/* Reset and Base Styles */
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: #e8e8ff;
    color: #ffffff;
}

/* Containers */
#tetris-container {
    text-align: center;
    margin-top: 20px;
}

#score-panel {
    text-align: center;
    margin-top: 20px;
    /* background-color: #adbeec; */
    padding: 15px;
    border-radius: 10px;
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

#button-container {
    text-align: center;
    margin-top: 20px;
}

/* Canvas */
#tetris {
    border: 2px solid #0f3460;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(15, 52, 96, 0.5);
}

/* Score, Level, and Speed */
#score-container,
#level-container,
#speed-container {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}

.score-panel-item {
    background-color: #0f3460;
    padding: 10px 15px;
    border-radius: 5px;
    display: inline-block;
    margin: 0 10px;
}

/* Buttons */
.button-row {
    margin-bottom: 15px;
}

.button {
    padding: 12px 24px;
    margin: 0 8px;
    background-color: #e94560;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s, transform 0.1s;
}

.button:hover {
    background-color: #ff6b6b;
    transform: translateY(-2px);
}

.button:active {
    transform: translateY(1px);
}

/* Media Queries */
@media screen and (max-width: 768px) {
    #tetris-container {
        margin-top: 10px;
    }

    #score-panel {
        margin-top: 10px;
        padding: 10px;
    }

    #button-container {
        margin-top: 10px;
    }

    .button {
        padding: 10px 20px;
        font-size: 14px;
    }
}

/* Tablet Landscape */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    #tetris {
        width: 300px;
        height: 600px;
    }

    .button {
        padding: 15px 30px;
        font-size: 18px;
    }

    #score-panel {
        display: flex;
        justify-content: center;
    }

    .score-panel-item {
        margin: 0 20px;
        font-size: 16px;
    }
}


@media (max-width: 767px) {
    .sidebar {
        right: -100vw;
        /* 在較小屏幕上,初始位置設置為完全隱藏 */
        width: 100vw;
        /* 側邊欄佔滿整個屏幕寬度 */
    }
}

@media (prefers-color-scheme: light) {
    .menu-icon {
        margin-top: 12px;
        position: fixed;
        top: 20px;
        right: 20px;
        cursor: pointer;
        z-index: 999;
    }

    .menu-icon span {
        display: block;
        width: 25px;
        height: 5px;
        background-color: #e8e8ff;
        margin-bottom: 5px;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .menu-icon.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-icon.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 70vw;
        height: 100vh;
        background-color: #f5f5f5ef;
        padding: 20px;
        box-sizing: border-box;
        transition: transform 0.35s ease;
        transform: translateX(100%);
        /* 初始時將側邊欄移出畫面 */
        z-index: 999;
        overflow-y: auto;
        /* 添加垂直滾動條 */
    }

    .sidebar.active {
        transform: translateX(0);
        /* 當添加 active 類時,側邊欄滑入畫面 */
    }

    .sidebar h2 {
        margin-top: 3vh;
        margin-bottom: 20px;
        color: #695C45;
        font-size: 23px;
    }

    .sidebar ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .sidebar li {
        margin-bottom: 10px;
    }

    .sidebar a {
        text-decoration: none;
        color: #333333;
        font-weight: bold;
        font-size: 16px;
    }
}

@media (prefers-color-scheme: light) {
    #mostUsedChapters {
        display: grid;
        flex-wrap: wrap;
        justify-content: left;
    }

    #mostUsedChapters div {
        background-color: #faf9f9e7;
        padding: 8px;
        margin: 3px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 16px;
    }

    .menu-icon {
        position: fixed;
        top: 20px;
        right: 20px;
        cursor: pointer;
        z-index: 999;
    }

    .menu-icon span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #333333;
        margin-bottom: 5px;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .menu-icon.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-icon.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 80vw;
        height: 100vh;
        background-color: #f5f5f5ef;
        padding: 20px;
        box-sizing: border-box;
        transition: transform 0.4s ease;
        transform: translateX(100%);
        /* 初始時將側邊欄移出畫面 */
        z-index: 999;
        overflow-y: auto;
        /* 添加垂直滾動條 */
    }

    .sidebar.active {
        transform: translateX(0);
        /* 當添加 active 類時,側邊欄滑入畫面 */
    }

    .sidebar h2 {
        margin-top: 3vh;
        margin-bottom: 20px;
        color: #695C45;
        font-size: 23px;
    }

    .sidebar ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .sidebar li {
        margin-bottom: 10px;
    }

    .sidebar a {
        text-decoration: none;
        color: #333333;
        font-weight: bold;
        font-size: 16px;
    }
}

@media (prefers-color-scheme: dark) {

    #mostUsedChapters {
        display: grid;
        flex-wrap: wrap;
        justify-content: left;
    }

    #mostUsedChapters div {
        background-color: #303030;
        padding: 8px;
        margin: 3px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 16px;
        color: white;
    }

    .menu-icon {
        margin-top: 12px;
        position: fixed;
        top: 20px;
        right: 20px;
        cursor: pointer;
        z-index: 999;
    }

    .menu-icon span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #c9c9c9;
        margin-bottom: 5px;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .menu-icon.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-icon.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 80vw;
        height: 100vh;
        background-color: #35353f;
        /* 將側邊欄背景色改為深灰色 */
        color: #ddd;
        /* 將側邊欄內文本設置為淺灰色 */
        padding: 20px;
        box-sizing: border-box;
        transition: transform 0.35s ease;
        transform: translateX(100%);
        /* 初始時將側邊欄移出畫面 */
        z-index: 999;
        overflow-y: auto;
        /* 添加垂直滾動條 */
    }

    .sidebar.active {
        transform: translateX(0);
        /* 當添加 active 類時,側邊欄滑入畫面 */
    }

    .sidebar h2 {
        margin-top: 3vh;
        margin-bottom: 20px;
        color: #e2d2b7;
        font-size: 23px;
    }

    .sidebar ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .sidebar li {
        margin-bottom: 10px;
        color: #ddd;

    }

    .sidebar a {
        text-decoration: none;
        color: #ddd;
        font-weight: bold;
        font-size: 16px;
    }
}

.t {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #7a7a7a;
    /* 深藍色 */
    margin: 0;
    padding: 1px 0;
}

.countdown {
    color: #695C45;
    font-size: 16px;
    white-space: pre-wrap;
}

#visitCount {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #4b52ab;
    font-weight: bold;
}

#visitCount {
    margin-top: 12px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes pulse {
    0% {
        transform: scale(0.9);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(0.9);
    }
}

#visitCount {
    animation: pulse 2.3s infinite;
}


@media (prefers-color-scheme: dark) {
    #visitCount {
        margin-top: 12px;
        background-color: #333;
        color: #fff;
        box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
    }

    .countdown {
        color: #aaa;
    }
}



.Btn {
    border-radius: 5px;
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4b52ab;
    border: none;
    color: white;
    font-weight: 600;
    gap: 8px;
    cursor: pointer;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
  }

  .svgIcon {
    width: 16px;
  }

  .svgIcon path {
    fill: white;
  }

  .Btn::before {
    width: 130px;
    height: 130px;
    position: absolute;
    content: "";
    background-color: white;
    border-radius: 50%;
    left: -100%;
    top: 0;
    transition-duration: .3s;
    mix-blend-mode: difference;
  }

  .Btn:hover::before {
    transition-duration: .3s;
    transform: translate(100%,-50%);
    border-radius: 0;
  }

  .Btn:active {
    transform: translate(5px,5px);
    transition-duration: .3s;
  }
