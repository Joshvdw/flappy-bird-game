import gsap from "gsap";
import React, { useEffect } from "react";
import { useSpring, config, animated } from "react-spring";
import ParallaxImage from "./ParallaxImage";
import ParallaxVideo from "./ParallaxVideo";

const UI = (props: any) => {
  const { msgUnity, setSceneState, loadingProgression } = props;

  const [hover, setHover] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);

  function startGame() {
    setFade({
      opacity: 0,
      config: config.gentle,
      onRest: () => {
        console.log("rest");
        msgUnity("StartGame");
        setSceneState("loading");
      },
    });
  }

  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 1,
  }));

  // useEffect(() => {
  //   setFade({ opacity: 1, config: config.molasses });
  // }, []);

  const growBtn = useSpring({
    config: { ...config.gentle },
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: hover ? "scale(1.1)" : "scale(1)",
    },
  });

  const growLogo = useSpring({
    config: { ...config.gentle },
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: hover2 ? "scale(1.1)" : "scale(1)",
    },
  });
  return (
    <>
      <animated.div className="top" style={fadeIn}>
        <div className="landing_title_wrapper">
          <div className="title_inner">
            <h5>Strings of</h5>
            <h1>Elysium</h1>
            <div className="title_deco_wrapper">
              <img src="/images/title_deco.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="landing_logo_wrapper">
          <a href="https://www.psychoactive.co.nz/" target="_blank">
            <animated.img
              src="/images/ps_logo.svg"
              alt=""
              style={growLogo}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
            />
          </a>
        </div>
      </animated.div>
      <animated.div className="bottom" style={fadeIn}>
        <div className="landing_p_wrapper">
          <p>
            Embark on an epic musical journey through the ancient Roman kingdom
            of Elysium. You&apos;ll have to dodge towering pillars and collect
            the musical scriptures that hold the key to unlocking the
            kingdom&apos;s hidden melodies.
          </p>
        </div>
        <animated.div
          className={!hover ? "landing_btn_white" : "landing_btn_hover"}
          onClick={startGame}
          style={growBtn}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img
            src={!hover ? "/images/btn_deco.svg" : "/images/btn_deco_white.svg"}
            alt=""
          />
          <p className={!hover ? "" : "red_text"}>Play Game</p>
        </animated.div>
      </animated.div>
    </>
  );
};

export default UI;
