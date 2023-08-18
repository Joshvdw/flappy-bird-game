import React from "react";
import { useSpring, config, animated } from "react-spring";

const LandingPage = (props: any) => {
  const [hover, setHover] = React.useState(false);

  function startGame() {
    props.msgUnity("StartGame");
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
    <div className="fullpage__wrapper landing background">
      <h1>Strings of Elysium</h1>
      <animated.button
        onClick={startGame}
        style={growBtn}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Play
      </animated.button>
    </div>
  );
};

export default LandingPage;
