import React from "react";

const LandingPage = (props: any) => {
  function startGame() {
    props.msgUnity("StartGame");
    props.setSceneState("game");
  }
  return (
    <div className="fullpage__wrapper">
      <h1>Flappy Frog</h1>
      <button onClick={startGame}>Play</button>
    </div>
  );
};

export default LandingPage;
