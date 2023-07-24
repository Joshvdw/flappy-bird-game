"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data",
    frameworkUrl: "/Build/Build.framework.js",
    codeUrl: "/Build/Build.wasm",
  });

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
    <Unity
      unityProvider={unityProvider}
      className={styles.unity_canvas}
      // ref={canvas}
    />
  );
}
