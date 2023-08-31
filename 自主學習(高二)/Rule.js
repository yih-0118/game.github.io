const cvs = document.getElementById("tetris");
const ctx = tetris.getContext("2d");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

const pauseButton = document.getElementById("pause-button");//connect button
const restartButton = document.getElementById("restart-button");
const moveLeftButton = document.getElementById("move-left-button");
const moveRightButton = document.getElementById("move-right-button");
const moveDownButton = document.getElementById("move-down-button");
const rotateButton = document.getElementById("rotate-button");//6

let isPaused = false;

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE"; // color of an empty square

cvs.width = COL * SQ;
cvs.height = ROW * SQ;

// draw a square
function drawSquare(x,y,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*SQ+0.5 ,y*SQ+0.5 ,SQ,SQ);
}

// draw the board
function drawBoard()
{
    for( r = 0; r <ROW; r++)
    {
        for(c = 0; c < COL; c++)
        {
            drawSquare(c,r,board[r][c]);
        }
    }
}

// create the board
let board = [];
for( r = 0; r <ROW; r++)
{
    board[r] = [];
    for(c = 0; c < COL; c++)
    {
        board[r][c] = VACANT;
    }
}

drawBoard();

// the pieces and their colors
const PIECES = 
[
    [I, "rgb(244, 179, 80)"],    // Macaron Yellow
    [J, "rgb(180, 219, 184)"],   // Macaron Green
    [L, "rgb(231, 167, 199)"],   // Macaron Pink
    [O, "rgb(171, 204, 247)"],   // Macaron Blue
    [S, "rgb(235, 174, 149)"],   // Macaron Orange
    [T, "rgb(200, 242, 255)"],   // Macaron Light Blue
    [Z, "rgb(186, 177, 214)"],   // Macaron Purple
    //hard square
    [U, "rgb(255, 209, 220)"],   // Macaron Light Pink
    [Q, "rgb(167, 219, 216)"],   // Macaron Aqua
    [P, "rgb(255, 219, 172)"],   // Macaron Peach
    [H, "rgb(255, 191, 186)"],   // Macaron Salmon
    [K, "rgb(245, 231, 188)"],   // Macaron Pale Yellow
    [M, "rgb(180, 237, 255)"],   // Macaron Sky Blue
    [N, "rgb(166, 217, 169)"],   // Macaron Soft Green
    [V, "rgb(255, 243, 132)"],   // Macaron Bright Yellow
    [Z5, "rgb(234, 179, 223)"],  // Macaron Light Purple
    [S5, "rgb(223, 189, 252)"],  // Macaron Lavender
    [W, "rgb(180, 231, 255)"],   // Macaron Light Blue
    [X, "rgb(255, 207, 165)"],   // Macaron Light Orange
    [G, "rgb(163, 239, 184)"],   // Macaron Pastel Green
    [A, "rgb(211, 182, 232)"],   // Macaron Lilac
    [I5, "rgb(249, 205, 173)"]  // Macaron Yellow
    
    
];
let level = 1;
let hardmode = 8;
let score = 0;
// generate random pieces
// function randomPiece()
// {
//     let r = randomN = Math.floor(Math.random() * 8)
//     return new Piece( PIECES[r][0],PIECES[r][1]);
// }

function randomPiece() 
{
    if (score < 30) 
    {
        let r = Math.floor(Math.random() * 7); 
        return new Piece(PIECES[r][0], PIECES[r][1]);
       //4 blocks
    } else 
    {
        r = Math.floor(Math.random() * hardmode); //5 blocks
        return new Piece(PIECES[r][0], PIECES[r][1]);
    }
    
}
let p = randomPiece();

// The Object Piece

function Piece(tetromino,color)
{
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN]; 
    // we need to control the pieces
    this.x = 3;
    this.y = -2;
}

// fill function
Piece.prototype.fill = function(color)
{
    for( r = 0; r < this.activeTetromino.length; r++)
    {
        for(c = 0; c < this.activeTetromino.length; c++)
        {
            // we draw only occupied squares
            if( this.activeTetromino[r][c])
            {
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}



// draw a piece to the board
Piece.prototype.draw = function()
{
    this.fill(this.color);
}

// undraw a piece
Piece.prototype.unDraw = function()
{
    this.fill(VACANT);
}

// move Down the piece
Piece.prototype.moveDown = function()
{
    if(!this.collision(0,1,this.activeTetromino))
    {
        this.unDraw();
        this.y++;
        this.draw();
    }
    else
    {
        // we lock the piece and generate a new one
        this.lock();
        p = randomPiece();
    }
    
}

// move Right the piece
Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
        this.moveDown(); // Keep the piece moving down while moving right
        dropStart = Date.now(); // Reset the drop timer
    }
}

// move Left the piece
Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
        this.moveDown(); // Keep the piece moving down while moving left
        dropStart = Date.now(); // Reset the drop timer
    }
}


// rotate the piece
Piece.prototype.rotate = function() 
{
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) 
    {
        if (this.x > COL / 2) 
        {
            kick = -1;
        } 
        else 
        {
            kick = 1;
        }
    }

    if (!this.collision(kick, 0, nextPattern)) 
    {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();

        // After rotating, continue moving the piece down
        if (!this.collision(0, 1, this.activeTetromino)) 
        {
            this.unDraw();
            this.y++;
            this.draw();
        }
    }
}




Piece.prototype.lock = function()
{
    for( r = 0; r < this.activeTetromino.length; r++)
    {
        for(c = 0; c < this.activeTetromino.length; c++)
        {
            // we skip the vacant squares
            if( !this.activeTetromino[r][c])
            {
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + r < 0)
            { 
                
                alert("Game Over")
                gameOver = true;
                break;
            }
            
            // we lock the piece
            board[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
    for(r = 0; r < ROW; r++)
    {
        let isRowFull = true;
        for( c = 0; c < COL; c++)
        {
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull)
        {
            // if the row is full
            // we move down all the rows above it
            for( y = r; y > 1; y--)
            {
                for( c = 0; c < COL; c++)
                {
                    board[y][c] = board[y-1][c];
                }
            }
            // the top row board[0][..] has no row above it
            for( c = 0; c < COL; c++)
            {
                board[0][c] = VACANT;
            }
            // increment the score
            score += 10;
            level +=1;
            hardmode +=1;
            if(hardmode >= 22)//limeted 22
            {
                hardmode=22;
            }
            

        }
    }
    // update the board
    drawBoard();
    
    // update the score
    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;
}

// collision fucntion

Piece.prototype.collision = function(x,y,piece)
{
    for( r = 0; r < piece.length; r++)
    {
        for(c = 0; c < piece.length; c++)
        {
            // if the square is empty, we skip it
            if(!piece[r][c])
            {
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            // conditions
            if(newX < 0 || newX >= COL || newY >= ROW)
            {
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if(newY < 0)
            {
                continue;
            }
            // check if there is a locked piece alrady in place
            if( board[newY][newX] != VACANT)
            {
                return true;
            }
        }
    }
    return false;
}

// CONTROL the piece
document.addEventListener("keydown",CONTROL);

function CONTROL(event)
{
    if(event.keyCode == 37)
    {
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38)
    {
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39)
    {
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40)
    {
        p.moveDown();
    }
}

rotateButton.addEventListener("click", () => {
    p.rotate();
    dropStart = Date.now();
});

moveDownButton.addEventListener("click", () => {
    p.moveDown();
});

moveLeftButton.addEventListener("click", () => {
    p.moveLeft();
    dropStart = Date.now();
});

moveRightButton.addEventListener("click", () => {
    p.moveRight();
    dropStart = Date.now();
});

pauseButton.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        drop();
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
    } else {
        isPaused = true;
        pauseButton.innerHTML = '<i class="fas fa-play"></i> Resume';
    }
});

restartButton.addEventListener("click", () => {
    location.reload();
});

// drop the piece every 1sec
let dropStart = Date.now();
let gameOver = false;

function drop() {
    let now = Date.now();
    let delta = now - dropStart;

    if (isPaused)
    {
        requestAnimationFrame(drop);
        return;
    }

    if (delta > 125) 
    {
        p.moveDown();
        dropStart = Date.now();
    }
    
    if (!gameOver) 
    {
        requestAnimationFrame(drop);
    }
}


drop();
