let candies = ["b", "g", "o", "p", "r", "y"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let currTile;
let otherTile;
let gameEnded = false;
window.onload = function () {
  startGame();

  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
};
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

// function createMatch(r, c) {
//   if (c >= 2) {
//     if (board[r][c - 1].src === board[r][c - 2].src) {
//       return true;
//       // c.src = "./images" + randomCandy() +".png"
//     }
//   }
//   if (r >= 2) {
//     if (board[r - 1][c].src === board[r - 2][c].src) {
//       // r.src = "./images/" + randomCandy() + ".png"
//       return true;
//     }
//   }
//   return false;
// }

function startGame() {
  board = [];
  document.getElementById("board").innerHTML = "";
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();

      tile.src = "./images/" + randomCandy() + ".png";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

function dragStart() {
  currTile = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}
function dragDrop() {
  otherTile = this;
}
function dragEnd() {
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let currCords = currTile.id.split("-");
  let r = parseInt(currCords[0]);
  let c = parseInt(currCords[1]);

  let otherCords = otherTile.id.split("-");
  let r2 = parseInt(otherCords[0]);
  let c2 = parseInt(otherCords[1]);

  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;

  let moveUp = r2 == r - 1 && c == c2;
  let moveDown = r2 == r + 1 && c == c2;

  let isAdjacent = moveDown || moveLeft || moveRight || moveUp;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid3() || checkValid4();
    if (!validMove) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}
function crushCandy() {
  crush();
  // crushFour()
  document.getElementById("score").innerHTML = score;
}

function crush() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      if (c < columns - 3) {
        let candy1 = board[r][c];
        let candy2 = board[r][c + 1];
        let candy3 = board[r][c + 2];
        let candy4 = board[r][c + 3];

        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          !candy1.src.includes("blank")
        ) {
          candy1.src = "./images/blank.png";
          candy2.src = "./images/blank.png";
          candy3.src = "./images/blank.png";
          score += 50;
          c += 30;
          continue;
        }
        endGame();
      }

      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
        endGame();
      }
    }
  }
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      if (r < rows - 3) {
        let candy1 = board[r][c];
        let candy2 = board[r + 1][c];
        let candy3 = board[r + 2][c];
        let candy4 = board[r + 3][c];
        if (
          candy1.src == candy2.src &&
          candy2.src == candy3.src &&
          candy3.src == candy4.src &&
          !candy1.src.includes("blank")
        ) {
          candy1.src = "./images/blank.png";
          candy2.src = "./images/blank.png";
          candy3.src = "./images/blank.png";
          candy4.src = "./images/blank.png";
          score += 50;
          r += 3;
          continue;
        }
        endGame();
      }
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
        endGame();
      }
    }
  }
}

function checkValid3() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkValid4() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}

function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1;
    for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }
    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./images/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}

function endGame() {
  if (!gameEnded && score >= 1000) {
    gameEnded = true;
    document.getElementById("board").style.display = "none";
    let winMessage = document.createElement("h1");
    winMessage.innerHTML = "Congratulations! You Won";
    winMessage.style.color = "black";
    winMessage.style.textAlign = "center";
    winMessage.style.fontSize = "30px";

    document.body.appendChild(winMessage);
    const button = document.createElement("button");
    button.innerHTML = "Play Again";
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.width = "200px";
    button.style.height = "70px";
    button.style.border = "2px solid red";
    button.style.borderRadius = "30px";
    button.style.fontSize = "25px";
    button.style.fontWeight = "700";
    button.addEventListener("click", () => {
      gameEnded = false;
      score = 0;
      document.getElementById("board").style.display = "flex";
      winMessage.remove();
      button.remove();
      startGame();
    });
    document.body.appendChild(button);
  }
}
