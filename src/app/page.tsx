"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./page.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import LandingPage from "@/Components/LandingPage";
import GameOver from "@/Components/GameOver";
import Preloader from "@/Components/Preloader";

export default function Home() {
  const [sceneState, setSceneState] = useState("landing");
  const [showLanding, setShowLanding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for the window.onload event to ensure everything is loaded
    // window.onload = () => {
    //   console.log("Window fully loaded");
    // setIsLoading(false); // Set isLoading to false when the entire page has loaded
    // };
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the entire page has loaded
    }, 2000);

    // return () => {
    //   window.onload = null; // Cleanup the event listener when the component unmounts
    // };
  }, []);

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
    setTimeout(() => {
      setShowLanding(true);
    }, 2000);
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isLoading && <Preloader />}
        {(sceneState == "landing" || sceneState == "loading") && (
          <LandingPage
            msgUnity={msgUnity}
            setSceneState={setSceneState}
            loadingProgression={loadingProgression}
            sceneState={sceneState}
          />
        )}
        {sceneState == "gameOver" && (
          <GameOver msgUnity={msgUnity} setSceneState={setSceneState} />
        )}
        {(sceneState == "game" ||
          sceneState == "loading" ||
          sceneState == "gameOver") && (
          <Unity
            unityProvider={unityProvider}
            className={styles.unity_canvas}
          />
        )}
      </Suspense>
    </>
  );
}
