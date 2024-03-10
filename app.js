// Define variables
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Set initial turn
let turnO = true; // playerX, playerO

// Define winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes(); // Reset the game by enabling boxes and clearing their content
  msgContainer.classList.add("hide");
};

// Add event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.innerText) {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;

      checkWinner();
    }
  });
});

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Show winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return; // Exit the loop once a winner is found
    }
  }

  // Check for a draw if all boxes are filled
  if ([...boxes].every((box) => box.innerText)) {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
  }
};

// Reset game button
resetBtn.addEventListener("click", resetGame);

// New game button
newGameBtn.addEventListener("click", resetGame);
