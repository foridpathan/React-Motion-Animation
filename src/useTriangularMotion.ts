import { RefObject, useEffect, useState } from "react";

export function useTriangularMotion(
  ref: RefObject<HTMLDivElement>,
  size = 200,
  speed = 0.03
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

    const triangleVertices = [
      { x: centerX, y: centerY - size }, // Top vertex
      { x: centerX - size * Math.cos(Math.PI / 6), y: centerY + size / 2 }, // Bottom left vertex
      { x: centerX + size * Math.cos(Math.PI / 6), y: centerY + size / 2 }, // Bottom right vertex
    ];

    let currentVertex = 0;
    let progress = 0;

    let animationFrameId: number;

    function updatePosition() {
      const nextVertex = (currentVertex + 1) % 3;
      const startX = triangleVertices[currentVertex].x;
      const startY = triangleVertices[currentVertex].y;
      const endX = triangleVertices[nextVertex].x;
      const endY = triangleVertices[nextVertex].y;

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
  }, [size, speed, ref]);

  return position;
}
