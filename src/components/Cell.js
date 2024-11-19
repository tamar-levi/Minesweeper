import React from "react";
const Cell = ({ data, onClick, onRightClick }) => {
  const { revealed, isMine, flagged, adjacentMines } = data;
  return (
    <div
      className={`cell ${revealed ? "revealed" : ""} ${flagged ? "flagged" : ""} ${isMine && revealed ? "mine" : ""}`}
      onClick={onClick}
      onContextMenu={onRightClick} // כפתור ימני על תא
    >
      {revealed && isMine && "💣"}
      {revealed && !isMine && adjacentMines > 0 && adjacentMines}
      {flagged && !revealed && "🚩"}
    </div>
  );
};
export default Cell;