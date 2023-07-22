"use client";

import styles from "./page.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data",
    frameworkUrl: "/Build/Build.framework.js",
    codeUrl: "/Build/Build.wasm",
  });
  return (
    <main className={styles.main}>
      <Unity unityProvider={unityProvider} className={styles.unity_canvas} />
    </main>
  );
}
