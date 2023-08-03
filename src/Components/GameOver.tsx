import React from "react";

const GameOver = (props: any) => {
  function restartGame() {
    props.msgUnity("ResetGame");
    props.setSceneState("game");
  }

  return (
    <div className="fullpage__wrapper">
      <h2>Game Over</h2>
      <button onClick={restartGame}>Play Again</button>
    </div>
  );
};

export default GameOver;
