import gsap from "gsap";
import React, { useEffect } from "react";
import { useSpring, config, animated } from "react-spring";
import ParallaxImage from "./ParallaxImage";
import ParallaxVideo from "./ParallaxVideo";

const LandingPage = (props: any) => {
  const [hover, setHover] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);

  function startGame() {
    // setFade({ opacity: 0, config: config.gentle });
    props.msgUnity("StartGame");
    props.setSceneState("game");
  }

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

  // const [fadeIn, setFade] = useSpring(() => ({
  //   opacity: 0,
  // }));

  // useEffect(() => {
  //   setFade({ opacity: 1, config: config.molasses });
  // }, []);

  return (
    <>
      <div className="parallax_wrapper">
        {/* <ParallaxImage imageUrl="/images/landing_new.png" /> */}
        <ParallaxVideo videoUrl="/videos/landing_cut.mp4" />
      </div>

      <div className="rect_gradient"></div>

      <div className="landing_wrapper">
        <div className="landing_inner_wrapper">
          <div className="top">
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
          </div>
          <div className="bottom">
            <div className="landing_p_wrapper">
              <p>
                Embark on an epic musical journey through the ancient Roman
                kingdom of Elysium. You'll have to dodge towering pillars and
                collect the musical scriptures that hold the key to unlocking
                the kingdom's hidden melodies.
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
                src={
                  !hover ? "/images/btn_deco.svg" : "/images/btn_deco_white.svg"
                }
                alt=""
              />
              <p className={!hover ? "" : "red_text"}>Play Game</p>
            </animated.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
