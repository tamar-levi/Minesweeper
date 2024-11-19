import React from "react";
const Controller = ({ status, flags, time, startNewGame }) => {

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")} ⏱️`;
    };

  return (
    <div className="controller">
      <div>Status: {status === "playing" ? "Playing 🎮" : status === "won" ? "🎉 You Won! 🎉" : "You Lost! 🥹"}</div>
      <div>Flags: {flags}</div>
      <div>Time: {formatTime(time)} </div>
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  );
};
export default Controller;