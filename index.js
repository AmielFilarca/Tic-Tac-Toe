const gameboard = (() => {
  let array = [];
  let turn = null;
  let playerTurn = null;
  let mark = null;
  let winner = null;
  let versusComputer = null;
  const createPlayers = (a, b) => {
    player1 = Player(a, 1);
    player2 = Player(b, 2);
  };
  const startGame = () => {
    resetBoard();
    console.clear();
    console.log("Game started.");
    createBoard();
    setTurn(1);
  };
  const endGame = () => {
    displayController.removeEventOnSquares();
    const display = document.querySelector(".display");
    if (checkForWinner()) {
      display.textContent = `${winner} won!`;
      console.log(`${winner} won!`);
    } else if (checkForTie()) {
      display.textContent = "Draw!";
      console.log("Draw!");
    }
  };
  const createArray = () => {
    if (!array.length > 0) {
      for (let i = 0; i < 9; i++) {
        array.push("");
      }
    }
  };
  const updateArray = () => {
    emptyArray();
    const squares = document.querySelectorAll(".squares");
    squares.forEach((square) => {
      array.push(square.textContent);
    });
  };
  const emptyArray = () => {
    array.splice(0, array.length);
  };
  const createBoard = () => {
    createArray();
    displayController.render();
    displayController.addEventOnSquares();
  };
  const updateBoard = () => {
    updateArray();
    displayController.render();
    if (gameboard.playerTurn !== "Computer") {
      displayController.addEventOnSquares();
    }
  };
  const resetBoard = () => {
    emptyArray();
    createBoard();
  };
  const setTurn = (x) => {
    gameboard.turn = x;
    console.log(`Turn # ${gameboard.turn}`);
    updatePlayerTurn();
    updateMark();
  };
  const nextTurn = () => {
    gameboard.turn++;
    console.log(`Turn # ${gameboard.turn}`);
    updatePlayerTurn();
    updateMark();
    if (gameboard.playerTurn === "Computer") {
      computerTurn();
    }
  };
  const endTurn = () => {
    updateBoard();
    if (checkForWinner() || checkForTie()) {
      endGame();
    } else {
      nextTurn();
      updateBoard();
    }
  };
  const computerTurn = () => {
    displayController.removeEventOnSquares();
    const squares = document.querySelectorAll(".squares");
    const emptySquares = Array.prototype.slice
      .call(squares)
      .filter((square) => square.textContent === "");
    const randomSquare =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    randomSquare.textContent = gameboard.mark;
    gameboard.endTurn();
  };
  const updatePlayerTurn = () => {
    gameboard.playerTurn =
      gameboard.turn % 2 === 0 ? player2.name : player1.name;
    console.log(`Player: ${gameboard.playerTurn}`);
  };
  const updateMark = () => {
    gameboard.mark = gameboard.turn % 2 === 0 ? player2.mark : player1.mark;
    console.log(`Mark: ${gameboard.mark}`);
  };
  const areEqual = (...arrayItems) => {
    for (let i = 1; i < arrayItems.length; i++) {
      if (arrayItems[i] === "" || arrayItems[i] !== arrayItems[i - 1]) {
        return false;
      }
    }
    return true;
  };
  const checkForWinner = () => {
    if (areEqual(array[0], array[1], array[2])) {
      winner = array[1] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[3], array[4], array[5])) {
      winner = array[4] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[6], array[7], array[8])) {
      winner = array[7] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[0], array[3], array[6])) {
      winner = array[3] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[1], array[4], array[7])) {
      winner = array[4] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[2], array[5], array[8])) {
      winner = array[5] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[0], array[4], array[8])) {
      winner = array[4] === player1.mark ? player1.name : player2.name;
      return true;
    } else if (areEqual(array[2], array[4], array[6])) {
      winner = array[4] === player1.mark ? player1.name : player2.name;
      return true;
    } else {
      return false;
    }
  };
  const checkForTie = () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "") {
        return false;
      }
    }
    return true;
  };
  return {
    array,
    turn,
    versusComputer,
    createPlayers,
    endTurn,
    startGame,
  };
})();
const displayController = (() => {
  const onStartBtnClick = () => {
    const playerRadio = document.getElementById("player");
    const computerRadio = document.getElementById("computer");
    let name1 = document.getElementById("player1-name").value;
    let name2 = document.getElementById("player2-name").value;
    if (name1 === "") {
      name1 = "Player 1";
    }
    if (name2 === "" || name2 === "Computer") {
      name2 = "Player 2";
    }
    if (playerRadio.checked) {
      gameboard.createPlayers(name1, name2);
      gameboard.versusComputer = false;
    } else if (computerRadio.checked) {
      gameboard.createPlayers(name1, "Computer");
      gameboard.versusComputer = true;
    }
    gameboard.startGame();
  };
  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", onStartBtnClick);
  document.addEventListener("keypress", () => {
    const keyName = event.code;
    if (keyName === "Space") {
      onStartBtnClick();
    }
  });
  const render = () => {
    for (let i = 0; i < gameboard.array.length; i++) {
      const square = document.getElementById(`sq${i + 1}`);
      square.textContent = gameboard.array[i];
    }
  };
  const onClick = (e) => {
    removeEventOnSquares();
    e.target.textContent = gameboard.mark;
    gameboard.endTurn();
  };
  const addEventOnSquares = () => {
    const squares = document.querySelectorAll(".squares");
    const emptySquares = Array.prototype.slice
      .call(squares)
      .filter((square) => square.textContent === "");
    emptySquares.forEach((square) => {
      square.addEventListener("click", onClick);
    });
  };
  const removeEventOnSquares = () => {
    const squares = document.querySelectorAll(".squares");
    squares.forEach((square) => {
      square.removeEventListener("click", onClick);
    });
  };
  return {
    render,
    addEventOnSquares,
    removeEventOnSquares,
  };
})();
const Player = (name, number) => {
  name, (mark = number === 1 ? "X" : "O");
  return {
    name,
    mark,
  };
};
