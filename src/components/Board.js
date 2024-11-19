import React from "react";
import Cell from "./Cell";
const Board = ({ board, rows, cols, handleCellClick, handleCellFlag }) => {
    
  return (
    <div
      className="board"
      style={{
        // display: "grid",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            data={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onRightClick={(e) => {
            e.preventDefault();
            handleCellFlag(rowIndex, colIndex);
            }}
          />
        ))
      )}
    </div>
  );
};
export default Board;