const gameboard = (() => {
  let gameboardArray = [];

  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameboardArray.push("");
    }
  };

  const resetBoard = () => {
    gameboardArray.splice(0, gameboardArray.length);
    createBoard();
  };

  return {
    gameboardArray,
    createBoard,
    resetBoard,
  };
})();

const displayController = (() => {
  let turn = 1;
  let winner = null;

  const announceWinner = () => {
    console.log(winner);
  };

  const checkTie = () => {
    const gb = gameboard.gameboardArray;
    for (let i = 0; i < gb.length; i++) {
      if (gb[i] === "") {
        return false;
      }
    }
    return true;
  };

  const postGame = () => {
    announceWinner();
    turn = 1;
    winner = null;
    gameboard.resetBoard();
  };

  const checkWinner = () => {
    const gb = gameboard.gameboardArray;
    if (areEqual(gb[0], gb[1], gb[2])) {
      postGame();
    } else if (areEqual(gb[3], gb[4], gb[5])) {
      postGame();
    } else if (areEqual(gb[6], gb[7], gb[8])) {
      postGame();
    } else if (areEqual(gb[0], gb[3], gb[6])) {
      postGame();
    } else if (areEqual(gb[1], gb[4], gb[7])) {
      postGame();
    } else if (areEqual(gb[2], gb[5], gb[8])) {
      postGame();
    } else if (areEqual(gb[0], gb[4], gb[8])) {
      postGame();
    } else if (areEqual(gb[2], gb[4], gb[6])) {
      postGame();
    } else {
      if (checkTie()) {
        winner = "Tie";
        postGame();
      }
    }
  };

  const renderArray = () => {
    for (let i = 0; i < 9; i++) {
      const sq = document.querySelector(`#sq${i + 1} > span`);
      sq.textContent = gameboard.gameboardArray[i];
    }
  };

  const addEvents = () => {
    const sq = document.querySelectorAll(".squares");
    sq.forEach((sq) => {
      sq.addEventListener("click", () => {
        if (winner === null) {
          index = parseInt(sq.id.split("").pop()) - 1;
          if (gameboard.gameboardArray[index] === "") {
            gameboard.gameboardArray[index] =
              turn % 2 === 0 ? player2.mark : player1.mark;
            turn++;
          }
          renderArray();
          checkWinner();
        }
      });
    });
  };

  const areEqual = (...arguments) => {
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] === "" || arguments[i] !== arguments[i - 1]) {
        return false;
      }
    }
    arguments[0] === player1.mark
      ? (winner = player1.name)
      : (winner = player2.name);
    return true;
  };

  return {
    renderArray,
    addEvents,
  };
})();

const Player = (name, number) => {
  name, (mark = number === 1 ? "X" : "O");

  return {
    name,
    mark,
  };
};

gameboard.createBoard();
displayController.renderArray();
displayController.addEvents();

const player1 = Player("Amiel", 1);
const player2 = Player("Bianca", 2);
