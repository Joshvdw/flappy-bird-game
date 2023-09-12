import React, { useRef, useState } from "react";
import { gsap } from "gsap";

interface ParallaxImageProps {
  imageUrl: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ imageUrl }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [initialXOffset, setInitialXOffset] = useState(0);
  const [initialYOffset, setInitialYOffset] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } =
      containerRef.current.getBoundingClientRect();

    const xPercent = (clientX - left) / width;
    const yPercent = (clientY - top) / height;

    const xOffset = (0.5 - xPercent) * 10; // Original multiplier for the parallax effect
    const yOffset = (0.5 - yPercent) * 10; // Original multiplier for the parallax effect

    // Calculate the zoom factor based on the mouse position with a reversed intensity
    const newZoomFactor =
      1 - Math.abs(xOffset) * 0.01 - Math.abs(yOffset) * 0.01;

    if (!isMouseOver) {
      setIsMouseOver(true);
      setInitialXOffset(xOffset);
      setInitialYOffset(yOffset);
    }

    setZoomFactor(newZoomFactor);

    gsap.to(imageRef.current, {
      x: xOffset,
      y: yOffset,
      scale: newZoomFactor, // Apply the reversed zoom effect
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !containerRef.current ||
      !imageRef.current ||
      (e.target instanceof Node && containerRef.current.contains(e.target))
    ) {
      return; // Mouse is still inside the container or its children, do nothing
    }

    setIsMouseOver(false);
    gsap.to(imageRef.current, {
      x: initialXOffset,
      y: initialYOffset,
      scale: 1, // Reset the scale
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="parallax-image-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove} // Apply initial offsets when the mouse enters
      onMouseLeave={handleMouseLeave}
      ref={(element) => (containerRef.current = element)}
    >
      <img
        src={imageUrl}
        alt="Parallax Image"
        ref={(element) => (imageRef.current = element)}
        className="fullscreen-image"
      />
    </div>
  );
};

export default ParallaxImage;
