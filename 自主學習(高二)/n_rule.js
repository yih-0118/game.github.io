// 取得畫布和繪製環境的物件
const Canva = document.getElementById("tetris");
const Block = tetris.getContext("2d");
// 取得用於顯示分數和等級的元素
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

// 取得按鈕物件
const pause_button = document.getElementById("pause-button"); // 連結暫停按鈕
const restart_button = document.getElementById("restart-button"); // 連結重新開始按鈕
const move_left_button = document.getElementById("move-left-button"); // 連結左移按鈕
const move_right_button = document.getElementById("move-right-button"); // 連結右移按鈕
const move_down_button = document.getElementById("move-down-button"); // 連結下移按鈕
const rotate_button = document.getElementById("rotate-button"); // 連結旋轉按鈕

// 遊戲狀態變數
let is_paused = false; // 記錄遊戲是否暫停

// 設定棋盤大小和方塊大小
const row = 20; // 棋盤列數
const column = 10; // 棋盤行數
const square_size = 20; // 方塊大小(像素)
const initial_color = "WHITE"; // 空白方塊的顏色

// 設定畫布大小
Canva.width = column * square_size;
Canva.height = row * square_size;

// 繪製單個方塊
function draw_square(x, y, color) {
    Block.fillStyle = color; // 設定填充顏色
    Block.fillRect(x * square_size, y * square_size, square_size, square_size); // 繪製實心方塊
    Block.lineWidth = 1; // 設定線條寬度
    Block.strokeStyle = "white"; // 設定線條顏色
    Block.strokeRect(x * square_size + 0.5, y * square_size + 0.5, square_size, square_size); // 繪製方塊邊框
}

// 繪製整個棋盤
function draw_board() {
    for (r = 0; r < row; r++) { // 遍歷棋盤的每一行
        for (c = 0; c < column; c++) { // 遍歷每一行的每一列
            draw_square(c, r, board[r][c]); // 根據棋盤數據繪製方塊
        }
    }
}

// 建立棋盤，初始化為空白
let board = [];
for (r = 0; r < row; r++) { // 為每一行建立數組
    board[r] = [];
    for (c = 0; c < column; c++) { // 為每一列設置初始值
        board[r][c] = initial_color;
    }
}

// 繪製初始棋盤
draw_board();

// 定義各種方塊形狀和顏色
const pieces = [
    [I, "rgb(244, 179, 80)"], // 馬卡龍黃
    [J, "rgb(180, 219, 184)"], // 馬卡龍綠
    [L, "rgb(231, 167, 199)"], // 馬卡龍粉
    [O, "rgb(171, 204, 247)"], // 馬卡龍藍
    [S, "rgb(235, 174, 149)"], // 馬卡龍橙
    [T, "rgb(200, 242, 255)"], // 馬卡龍淺藍
    [Z, "rgb(186, 177, 214)"], // 馬卡龍紫
    // 困難方塊
    [U, "rgb(255, 209, 220)"], // 馬卡龍淺粉
    [Q, "rgb(167, 219, 216)"], // 馬卡龍湖水藍
    [P, "rgb(255, 219, 172)"], // 馬卡龍橘粉
    [H, "rgb(255, 191, 186)"], // 馬卡龍橘紅
    [K, "rgb(245, 231, 188)"], // 馬卡龍淺黃
    [M, "rgb(180, 237, 255)"], // 馬卡龍天藍
    [N, "rgb(166, 217, 169)"], // 馬卡龍淺綠
    [V, "rgb(255, 243, 132)"], // 馬卡龍亮黃
    [Z5, "rgb(234, 179, 223)"], // 馬卡龍淺紫
    [S5, "rgb(223, 189, 252)"], // 馬卡龍薰衣草
    [W, "rgb(180, 231, 255)"], // 馬卡龍淺藍
    [X, "rgb(255, 207, 165)"], // 馬卡龍橘粉
    [G, "rgb(163, 239, 184)"], // 馬卡龍草綠
    [A, "rgb(211, 182, 232)"], // 馬卡龍淡紫
    [I5, "rgb(249, 205, 173)"] // 馬卡龍黃
];
let level = 1; // 初始等級
let hardmode = 8; // 困難模式解鎖的方塊種類數量
let score = 0; // 初始分數

// 隨機生成一個新的方塊實例
function random_piece() {
    let r; // 用於存放隨機索引
    if (level < 2) { // 如果等級小於8
        r = Math.floor(Math.random() * 7); // 隨機索引範圍為0-6
        return new this_piece(pieces[r][0], pieces[r][1]); // 生成新方塊實例
    } else { // 如果等級大於等於8
        r = Math.floor(Math.random() * 22); // 隨機索引範圍為0到hardmode-1
        // r = Math.floor(Math.random() * 7); // 隨機索引範圍為0-6

        return new this_piece(pieces[r][0], pieces[r][1]); // 生成新方塊實例
    }
}

let now_piece = random_piece(); // 初始化當前方塊實例

// 方塊類別
function this_piece(this_piece, color) {
    this.this_piece = this_piece; // 方塊形狀
    this.color = color; // 方塊顏色
    this.initial_piece = 0; // 初始形狀索引
    this.active_piece = this.this_piece[this.initial_piece]; // 當前形狀
    // 初始生成位置，二維陣列
    this.x = 3; // 水平位置
    this.y = -2; // 垂直位置
}

// 繪製方塊
this_piece.prototype.fill = function (color) {
    for (r = 0; r < this.active_piece.length; r++) { // 遍歷當前形狀的每一行
        for (c = 0; c < this.active_piece.length; c++) { // 遍歷每一行的每一列
            if (this.active_piece[r][c]) { // 如果該位置有方塊
                draw_square(this.x + c, this.y + r, color); // 繪製該方塊
            }
        }
    }
}

// 繪製當前方塊
this_piece.prototype.draw = function () {
    this.fill(this.color); // 使用方塊顏色繪製
}

// 清除當前方塊
this_piece.prototype.un_draw = function () {
    this.fill(initial_color); // 使用空白顏色繪製
}

// 方塊下移一格
this_piece.prototype.get_down = function () {
    if (!this.detect_wall(0, 1, this.active_piece)) { // 檢查下移是否會發生碰撞
        this.un_draw(); // 清除當前方塊
        this.y++; // 下移一格
        this.draw(); // 繪製新位置的方塊
    } else { // 發生碰撞，鎖定方塊
        this.lock(); // 將方塊鎖定在棋盤上
        now_piece = random_piece(); // 生成新的方塊
    }
}

// 方塊右移一格
this_piece.prototype.turn_right = function () {
    if (!this.detect_wall(1, 0, this.active_piece)) { // 檢查右移是否會發生碰撞
        this.un_draw(); // 清除當前方塊
        this.x++; // 右移一格
        this.draw(); // 繪製新位置的方塊
    }
}

// 方塊左移一格
this_piece.prototype.turn_left = function () {
    if (!this.detect_wall(-1, 0, this.active_piece)) { // 檢查左移是否會發生碰撞
        this.un_draw(); // 清除當前方塊
        this.x--; // 左移一格
        this.draw(); // 繪製新位置的方塊
    }
}

// 方塊旋轉
this_piece.prototype.rotate = function () {
    let piece_rotate_for_next = this.this_piece[(this.initial_piece + 1) % this.this_piece.length]; // 下一個旋轉形狀
    let kick = 0; // 初始化kick值

    if (this.detect_wall(0, 0, piece_rotate_for_next)) { // 檢查旋轉是否會發生碰撞
        if (this.x > column / 2) { // 如果方塊位於棋盤右側
            kick = -1; // 向左移動一格
        } else { // 如果方塊位於棋盤左側
            kick = 1; // 向右移動一格
        }
    }

    if (!this.detect_wall(kick, 0, piece_rotate_for_next)) { // 檢查kick後的位置是否會發生碰撞
        this.un_draw(); // 清除當前方塊
        this.x += kick; // 移動kick的距離
        this.initial_piece = (this.initial_piece + 1) % this.this_piece.length; // 更新形狀索引
        this.active_piece = this.this_piece[this.initial_piece]; // 更新當前形狀
        this.draw(); // 繪製新位置和形狀的方塊
    }
}

// 鎖定方塊在棋盤上
this_piece.prototype.lock = function () {
    for (r = 0; r < this.active_piece.length; r++) { // 遍歷當前形狀的每一行
        for (c = 0; c < this.active_piece.length; c++) { // 遍歷每一行的每一列
            if (!this.active_piece[r][c]) { // 跳過空白格
                continue;
            }
            if (this.y + r < 0) { // 如果方塊超出棋盤上方
                alert("Game Over"); // 遊戲結束提示
                game_over = true; // 設置遊戲結束標誌
                break;
            }
            board[this.y + r][this.x + c] = this.color; // 將方塊格子設置在棋盤上
        }
    }

    // 檢查並消除完整的行
    for (r = 0; r < row; r++) { // 遍歷每一行
        let is_row_full = true; // 假設行是完整的
        for (c = 0; c < column; c++) { // 遍歷該行的每一列
            is_row_full = is_row_full && (board[r][c] != initial_color); // 檢查是否有空白格子
        }
        if (is_row_full) { // 如果行是完整的
            for (y = r; y > 1; y--) { // 從消除的行開始向上移動
                for (c = 0; c < column; c++) { // 遍歷該行的每一列
                    board[y][c] = board[y - 1][c]; // 將上一行的方塊移到下一行
                }
            }
            for (c = 0; c < column; c++) { // 最上面的行設置為空白
                board[0][c] = initial_color;
            }
            score += calculate_score(1); // 根據消除的行數增加分數
            level += 1; // 每消1行提升一級
            hardmode = Math.min(22, level + 7); // 最高難度為22種方塊
        }
    }

    // 更新棋盤、分數和等級顯示
    draw_board();
    scoreElement.innerHTML = `${score}`;
    levelElement.innerHTML = `${level}`;
}

// 根據消除的行數計算得分
function calculate_score(what_line_has_been_cleared) {
    switch (what_line_has_been_cleared) { // 根據消除的行數
        case 1: // 消除一行
            return 40; // 得分40分
        case 2: // 消除兩行
            return 100; // 得分100分
        case 3: // 消除三行
            return 300; // 得分300分
        case 4: // 消除四行
            return 1200; // 得分1200分
        default: // 其他情況
            return 0; // 得分0分
    }
}
// 檢查移動或旋轉是否會導致碰撞
this_piece.prototype.detect_wall = function (x, y, this_piece) {
    for (r = 0; r < this_piece.length; r++) { // 遍歷形狀的每一行
        for (c = 0; c < this_piece.length; c++) { // 遍歷每一行的每一列
            if (!this_piece[r][c]) { // 跳過空白格
                continue;
            }
            let new_x = this.x + c + x; // 計算新的x位置
            let new_y = this.y + r + y; // 計算新的y位置

            if (new_x < 0 || new_x >= column || new_y >= row) { // 如果超出棋盤範圍
                return true; // 發生碰撞
            }
            if (new_y < 0) { // 如果在棋盤上方
                continue; // 不算碰撞
            }
            if (board[new_y][new_x] != initial_color) { // 如果新位置有其他方塊
                return true; // 發生碰撞
            }
        }
    }
    return false; // 沒有碰撞
}

// 監聽鍵盤事件
document.addEventListener("keydown", use_keyboard_to_control_piece);

// 使用鍵盤控制方塊
function use_keyboard_to_control_piece(event) {
    if (event.keyCode == 37) { // 左移鍵
        now_piece.turn_left(); // 方塊左移一格
    } else if (event.keyCode == 38) { // 上移鍵
        now_piece.rotate(); // 旋轉方塊
    } else if (event.keyCode == 39) { // 右移鍵
        now_piece.turn_right(); // 方塊右移一格
    } else if (event.keyCode == 40) { // 下移鍵
        get_down = true; // 標記需要下移方塊
    }
}

// 設置按鈕事件監聽器
rotate_button.addEventListener("click", () => {
    now_piece.rotate(); // 旋轉方塊
});

move_down_button.addEventListener("click", () => {
    get_down = true; // 標記需要下移方塊
});

move_left_button.addEventListener("click", () => {
    now_piece.turn_left(); // 方塊左移一格
});

move_right_button.addEventListener("click", () => {
    now_piece.turn_right(); // 方塊右移一格
});

pause_button.addEventListener("click", () => {
    if (is_paused) { // 如果已暫停
        is_paused = false; // 取消暫停
        drop(); // 繼續遊戲
        pause_button.innerHTML = '<i class="fas fa-pause"></i> Pause'; // 更新按鈕文字
    } else { // 如果未暫停
        is_paused = true; // 設置暫停
        pause_button.innerHTML = '<i class="fas fa-play"></i> Resume'; // 更新按鈕文字
    }
});

restart_button.addEventListener("click", () => {
    location.reload(); // 重新載入頁面
});

let drop_start = Date.now(); // 記錄上一次下落的時間
let game_over = false; // 遊戲是否結束
let get_down = false; // 是否需要下移方塊

// 遊戲主循環
function drop() {
    let now = Date.now(); // 獲取當前時間
    let delta = now - drop_start; // 計算時間差

    if (is_paused) { // 如果暫停
        requestAnimationFrame(drop); // 請求下一個繼續執行
        return;
    }

    if (delta > 250) { // 如果時間差大於250毫秒，一秒下降4格
        now_piece.get_down(); // 下移方塊
        drop_start = Date.now(); // 更新上一次下落的時間
    }

    if (get_down) { // 如果需要下移方塊
        now_piece.get_down(); // 下移方塊
        get_down = false;
    }

    if (!game_over) { // 如果遊戲未結束
        requestAnimationFrame(drop); // 請求下一個繼續執行
    }
}

drop(); // 遊戲循環function啟動