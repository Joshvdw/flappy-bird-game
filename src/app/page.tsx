"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import LandingPage from "@/Components/LandingPage";
import HighScore from "@/Components/HighScore";
import GameOver from "@/Components/GameOver";
// import "../../public/fonts/augustus.ttf";
// import "../../public/fonts/oasis.ttf";

export default function Home() {
  const [sceneState, setSceneState] = useState("landing");

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/Build/Build.loader.js",
      dataUrl: "/Build/Build.data",
      frameworkUrl: "/Build/Build.framework.js",
      codeUrl: "/Build/Build.wasm",
    });

  function msgUnity(functionName: string) {
    console.log(`msg sent to unity: '${functionName}'`);
    sendMessage("UnityFromReact", functionName);
  }

  const processUnityMsg = useCallback((fnc: any) => {
    console.log(`msg received from unity: '${fnc}'`);
    setSceneState(fnc);
  }, []);

  useEffect(() => {
    addEventListener("UnityToFrontend", (functionName) =>
      processUnityMsg(functionName)
    );
    return () => {
      removeEventListener("UnityToFrontend", (functionName) =>
        processUnityMsg(functionName)
      );
    };
  }, [addEventListener, removeEventListener, processUnityMsg]);

  // const canvas = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   window.addEventListener("load", resizePage, false);
  //   window.addEventListener("resize", resizePage, false);

  //   function resizePage() {
  //     if (canvas.current) {
  //       canvas.current.style.width = window.innerWidth + "px";
  //       canvas.current.style.height = window.innerHeight + "px";
  //     }
  //   }
  // }, []);

  return (
    <>
      {sceneState == "landing" && (
        <LandingPage msgUnity={msgUnity} setSceneState={setSceneState} />
      )}
      {/* {sceneState == "game" || ("gameOver" && <HighScore />)} */}
      {sceneState == "gameOver" && (
        <GameOver msgUnity={msgUnity} setSceneState={setSceneState} />
      )}
      <Unity
        unityProvider={unityProvider}
        className={styles.unity_canvas}
        // ref={canvas}
      />
    </>
  );
}
