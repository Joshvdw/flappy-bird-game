import gsap from "gsap";
import React, { useEffect } from "react";
import { useSpring, config, animated } from "react-spring";
import ParallaxImage from "./ParallaxImage";
import ParallaxVideo from "./ParallaxVideo";
import UI from "./UI";

const LandingPage = (props: any) => {
  const { msgUnity, setSceneState, sceneState, loadingProgression } = props;

  useEffect(() => {
    if (loadingProgression == 1) {
      setSceneState("game");
    }
  }, [loadingProgression]);

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <div className="parallax_wrapper">
        {isMobile && <ParallaxImage imageUrl="/images/landing_new.png" />}
        {!isMobile && <ParallaxVideo videoUrl="/videos/landing_cut.mp4" />}
      </div>

      <div className="rect_gradient"></div>

      <div className="landing_wrapper">
        <div className="landing_inner_wrapper">
          {sceneState == "landing" && (
            <UI msgUnity={msgUnity} setSceneState={setSceneState} />
          )}
        </div>
      </div>
      {loadingProgression != 1 && sceneState == "loading" && (
        <div className="fullpage__wrapper loading">
          <p style={{ color: "white" }}>loading</p>
          <br />
          <p>{Math.round(loadingProgression * 100)}%</p>
        </div>
      )}
    </>
  );
};

export default LandingPage;
