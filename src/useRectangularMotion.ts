import { RefObject, useEffect, useState } from "react";

export function useRectangularMotion(
  ref: RefObject<HTMLDivElement>,
  width = 300,
  height = 200,
  speed = 0.04
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let centerX: number, centerY: number;
    if (!ref?.current) {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight / 2;
    } else {
      const container = ref.current;
      const { width, height } = container.getBoundingClientRect();
      centerX = width / 2;
      centerY = height / 2;
    }
    const rectangleVertices = [
      { x: centerX - width / 2, y: centerY - height / 2 }, // Top-left
      { x: centerX + width / 2, y: centerY - height / 2 }, // Top-right
      { x: centerX + width / 2, y: centerY + height / 2 }, // Bottom-right
      { x: centerX - width / 2, y: centerY + height / 2 }, // Bottom-left
    ];

    let currentVertex = 0;
    let progress = 0;
    let animationFrameId: number;

    function updatePosition() {
      const nextVertex = (currentVertex + 1) % 4;
      const startX = rectangleVertices[currentVertex].x;
      const startY = rectangleVertices[currentVertex].y;
      const endX = rectangleVertices[nextVertex].x;
      const endY = rectangleVertices[nextVertex].y;

      progress += speed;

      if (progress >= 1) {
        progress = 0;
        currentVertex = nextVertex;
      }

      const x = startX + (endX - startX) * progress;
      const y = startY + (endY - startY) * progress;
      setPosition({ x, y });

      animationFrameId = requestAnimationFrame(updatePosition);
    }

    updatePosition();

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height, speed, ref]);

  return position;
}
