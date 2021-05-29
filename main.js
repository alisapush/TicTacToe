const game = document.getElementById("game");
const stepText = document.getElementById("step");
const blocks = document.getElementsByClassName("block");
const whoIsWinner = document.getElementById("winner");
const buttonNewGame = document.getElementById("button-new-game");

let step = 0;
let gameResult = "";
let isWinner = new Boolean(); // false

for (let i = 0; i < 9; i++) {
    game.innerHTML += '<div class="block"></div>';
}

game.addEventListener("click", (event) => {
    if (event.target.className == "block") {
        if (event.target.innerHTML == "0" || event.target.innerHTML == "X" || isWinner == true) {
            return false;
        } else if (step % 2 == 0) {
            event.target.innerHTML = "0";
            stepText.innerHTML = "Ход <b>крестика</b>";
        } else {
            event.target.innerHTML = "X";
            stepText.innerHTML = "Ход <b>нолика</b>";
        }
        step++;
        ckeckFreeSpace();
        findWinner();
    }
});

function highlightWinner(arguments) {
  for (let i = 0; i < arguments.length; i++) {
    blocks[arguments[i]].style.background = "grey";
  }
}

const findWinner = () => {
    const winningPosition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

  for (let i = 0; i < winningPosition.length; i++) {
    if (
        blocks[winningPosition[i][0]].innerHTML == "X" &&
        blocks[winningPosition[i][1]].innerHTML == "X" &&
        blocks[winningPosition[i][2]].innerHTML == "X"
    ) {
        gameResult = "победили крестики";
        showResult(gameResult);
        highlightWinner(winningPosition[i]);
        isWinner = true;
    } else if (
        blocks[winningPosition[i][0]].innerHTML == "0" &&
        blocks[winningPosition[i][1]].innerHTML == "0" &&
        blocks[winningPosition[i][2]].innerHTML == "0"
    ) {
        gameResult = "победили нолики";
        showResult(gameResult);
        highlightWinner(winningPosition[i]);
        isWinner = true;
    }
  }
};

function ckeckFreeSpace() {
    if (step == "9" && isWinner) {
        gameResult = "ничья";
        showResult(gameResult);
    }
}

const showResult = (winner) => {
    whoIsWinner.innerHTML = `Результат игры: ${winner}`;
};

const startNewGame = () => {
    location.reload();
};

buttonNewGame.addEventListener("click", startNewGame);