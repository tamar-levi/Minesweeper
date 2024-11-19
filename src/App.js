import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Controller from "./components/Controller";
import "./App.css";
const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing"); // שמירה על סטטוס המשחק
  const [flags, setFlags] = useState(0);
  const [rows, setRows] = useState(10); 
  const [cols, setCols] = useState(10); 
  const [mines, setMines] = useState(20);
  const [time, setTime] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const createGameBoard = () => {
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        revealed: false,
        isMine: false,
        flagged: false,
        adjacentMines: 0,
      }))
    );
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      if (!board[randomRow][randomCol].isMine) {
        board[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (
              k >= 0 &&
              k < rows &&
              l >= 0 &&
              l < cols &&
              !(k === i && l === j)
            ) {
              if (board[k][l].isMine) {
                board[i][j].adjacentMines++;
              }
            }
          }
        }
      }
    }
    return board;
  };
  const startNewGame = () => {
    const newBoard = createGameBoard(rows, cols, mines);
    setBoard(newBoard);
    setGameStatus("playing");
    setFlags(0);
    setTime(0);
    setIsTimer(false);
  };
  const handleCellClick = (row, col) => {
    if (gameStatus !== "playing") return;
    const updatedBoard = [...board];
    if (updatedBoard[row][col].isMine) {
      setGameStatus("lost");
      revealAllMines(updatedBoard);
      setIsTimer(false);
    } else {
      if(updatedBoard[row][col].adjacentMines===0){
      revealCells(updatedBoard, row, col);}
      else{
        updatedBoard[row][col].revealed=true;
      }
      checkWin(updatedBoard);
      if (!isTimer) setIsTimer(true);

    }
    setBoard(updatedBoard);
  };
  const handleCellFlag = (row, col) => {
    if (gameStatus !== "playing") return;
    const updatedBoard = [...board];
    const cell = updatedBoard[row][col];
    if (!cell.revealed) {
      if (cell.flagged) {
        cell.flagged = false;
        setFlags(flags - 1);
      } else if (flags < mines) {
        cell.flagged = true;
        setFlags(flags + 1);
      }
    }
    setBoard(updatedBoard);
  };
  const checkWin = (board) => {
    let hasWon = true;
    for (let row of board) {
      for (let cell of row) {
        if (!cell.revealed && !cell.isMine) hasWon = false;
        if (cell.flagged && !cell.isMine) hasWon = false;
      }
    }
    if (hasWon) {
      setGameStatus("won");
      setIsTimer(false);
    }
  };
  const revealAllMines = (board) => {
    const newBoard = [...board];
    for (let row of newBoard) {
      for (let cell of row) {
        if (!cell.revealed && cell.isMine) cell.revealed = true;
      }
    }
    setBoard(newBoard);
  };
  const revealCells = (board, row, col) => {
    const newBoard = [...board];
    const q = [];
    q.push([row, col]);
    while (q.length > 0) {
      const [tempRow, tempCol] = q.shift();
      for (let k = tempRow - 1; k <= tempRow + 1; k++) {
        for (let l = tempCol - 1; l <= tempCol + 1; l++) {
          if (k >= 0 && k < rows && l >= 0 && l < cols) {
            const currentCell = newBoard[k][l];
            if (!currentCell.revealed) {
              currentCell.revealed = true;
              if (currentCell.adjacentMines === 0) q.push([k, l]);
            }
          }
        }
      }
    }
    setBoard(newBoard);
  };
  useEffect(() => {
    startNewGame();
  }, []);


useEffect(() => {
    let timer;
    if (isTimer) {
        timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    }
    return () => clearInterval(timer);
}, [isTimer]);


  return (
    <div className="App">
      <h1>Mineweeper</h1>
      {/* <div><button onClick={() => { setRows(10); setCols(10);setMines(20);startNewGame() ;}}>Easy</button>
        <button onClick={() => { setRows(15); setCols(15); setMines(30); startNewGame();}}>Medium</button>
        <button onClick={() => { setRows(20); setCols(20); setMines(40);startNewGame() }}>Hard</button></div> */}
      <Controller status={gameStatus} flags={mines-flags} time={time} startNewGame={startNewGame} />
      
      <Board
        rows={rows}
        cols={cols}
        mines={mines}
        handleCellClick={handleCellClick}
        handleCellFlag={handleCellFlag}
        board={board}
      />
    </div>
  );
};
export default App;