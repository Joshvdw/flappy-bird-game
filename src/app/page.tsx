"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import LandingPage from "@/Components/LandingPage";
import GameOver from "@/Components/GameOver";

export default function Home() {
  const [sceneState, setSceneState] = useState("landing");
  const [showLanding, setShowLanding] = useState(false);

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    initialisationError,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data.gz",
    frameworkUrl: "/Build/Build.framework.js.gz",
    codeUrl: "/Build/Build.wasm.gz",
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

  useEffect(() => {
    if (initialisationError) console.log(initialisationError);
  }, [initialisationError]);

  useEffect(() => {
    console.log("isLoaded: ", isLoaded);
    console.log("loadingProgression: ", loadingProgression);
    setTimeout(() => {
      setShowLanding(true);
    }, 2000);
  }, []);
  console.log(typeof loadingProgression);

  return (
    <>
      {/* {isLoaded && ( */}
      {/* <> */}
      {sceneState == "landing" && (
        <LandingPage msgUnity={msgUnity} setSceneState={setSceneState} />
      )}
      {/* </> */}
      {/* )} */}
      {sceneState == "gameOver" && (
        <GameOver msgUnity={msgUnity} setSceneState={setSceneState} />
      )}
      {loadingProgression != 1 && sceneState == "game" && (
        <div className="fullpage__wrapper loading">
          <p style={{ color: "white" }}>loading</p>
          <br />
          <p>{Math.round(loadingProgression * 100)}%</p>
        </div>
      )}
      {(sceneState == "game" || sceneState == "gameOver") && (
        <Unity unityProvider={unityProvider} className={styles.unity_canvas} />
      )}
    </>
  );
}
