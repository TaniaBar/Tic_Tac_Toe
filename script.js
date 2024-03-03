let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let gameOver = false;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    // r=row and c=column
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {

            // create div id="0-0"
            let tile = document.createElement('div');
            // console.log(tile);
            tile.id = r.toString() + "-" + c.toString();
            // console.log(tile.id);
            tile.classList.add('tile');
            console.log(tile.classList.add('tile'))

            if (r == 0 || r == 1) {
                tile.classList.add('horizontal-line');
            }
            if (c == 0 || c == 1) {
                tile.classList.add('vertical-line');
            }

            tile.addEventListener('click', setTile);
            document.getElementById('board').append(tile);
        }
    }
}

function setTile () {
    if (gameOver) {
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != '') {
        return;
    }

    board[r][c] = currentPlayer;
    this.innerText = currentPlayer;

    // to change the player
    if (currentPlayer == playerO) {
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }

    checkWinner();
}

function checkWinner() {

    // check horizontal winner
    for (r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != '') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add('winner');
            }
            gameOver = true;
            return;
        }
    }

    // check vertical winner
    for (c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ''){
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add('winner');
            }
            gameOver = true;
            return;
        }
    }

    // check diagonal left to right
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add('winner');
        }
        gameOver = true;
        return;
    }

    // check diagonal right to left
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '') {
        
        let tile = document.getElementById("0-2");
        tile.classList.add('winner');

        tile = document.getElementById("1-1");
        tile.classList.add('winner');

        tile = document.getElementById("2-0");
        tile.classList.add('winner');

        gameOver = true;
        return;
    }
   
}