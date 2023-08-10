import React from "react";

const LandingPage = (props: any) => {
  function startGame() {
    props.msgUnity("StartGame");
    props.setSceneState("game");
  }
  return (
    <div className="fullpage__wrapper landing background">
      <h1>Strings of Elysium</h1>
      <button onClick={startGame}>Play</button>
    </div>
  );
};

export default LandingPage;
