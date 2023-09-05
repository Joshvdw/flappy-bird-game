import React from "react";
import { useSpring, config, animated } from "react-spring";

const GameOver = (props: any) => {
  const [hover, setHover] = React.useState(false);

  function restartGame() {
    props.msgUnity("ResetGame");
    props.setSceneState("game");
  }

  const growBtn = useSpring({
    config: { ...config.gentle },
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: hover ? "scale(1.05)" : "scale(1)",
    },
  });

  return (
    <div className="fullpage__wrapper game_over">
      <h2>Game Over</h2>
      <animated.button
        onClick={restartGame}
        style={growBtn}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Play Again
      </animated.button>
    </div>
  );
};

export default GameOver;
