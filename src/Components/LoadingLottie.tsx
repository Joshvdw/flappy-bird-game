import React from "react";
import lottie, { AnimationItem } from "lottie-web";
import { useRef, useEffect, MutableRefObject } from "react";

const LoadingLottie = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  useEffect(() => {
    if (lottieContainer.current) {
      anim.current = lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "lotties/loading_anim.json",
      });
      // console.log(anim.current)
      return () => {
        if (anim.current) {
          anim.current.destroy();
        }
      };
    }
  }, []);
  return <div className="progress_circle" ref={lottieContainer}></div>;
};

export default LoadingLottie;
