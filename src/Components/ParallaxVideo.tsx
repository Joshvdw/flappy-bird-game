import React, { useRef, useState } from "react";
import { gsap } from "gsap";

interface ParallaxVideoProps {
  videoUrl: string;
}

const ParallaxVideo: React.FC<ParallaxVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [initialXOffset, setInitialXOffset] = useState(0);
  const [initialYOffset, setInitialYOffset] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const { clientX, clientY } = e;
    const { top, left, width, height } =
      containerRef.current.getBoundingClientRect();

    const xPercent = (clientX - left) / width;
    const yPercent = (clientY - top) / height;

    // Reverse the direction by changing the sign of xOffset and yOffset
    const xOffset = -(xPercent - 0.5) * 30;
    const yOffset = -(yPercent - 0.5) * 30;

    if (!isMouseOver) {
      setIsMouseOver(true);
      setInitialXOffset(xOffset);
      setInitialYOffset(yOffset);
    }

    gsap.to(video, {
      x: xOffset,
      y: yOffset,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !containerRef.current ||
      !videoRef.current ||
      (e.target instanceof Node && containerRef.current.contains(e.target))
    ) {
      return; // Mouse is still inside the container or its children, do nothing
    }

    setIsMouseOver(false);
    gsap.to(videoRef.current, {
      x: initialXOffset,
      y: initialYOffset,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="parallax-video-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove} // Apply initial offsets when the mouse enters
      onMouseLeave={handleMouseLeave}
      ref={(element) => (containerRef.current = element)}
    >
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        ref={(element) => (videoRef.current = element)}
        className="fullscreen-video"
      />
    </div>
  );
};

export default ParallaxVideo;
