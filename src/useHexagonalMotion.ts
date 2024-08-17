import { RefObject, useEffect, useState } from "react";

export function useHexagonalMotion(
  ref: RefObject<HTMLDivElement>,
  points = 6,
  radius = 100,
  speed = 0.1
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate the coordinates of the hexagon's vertices
    const hexagonVertices: { x: number; y: number }[] = [];
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI / 3) * i; // 360 degrees divided by 6 sides = 60 degrees per angle, converted to radians
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      hexagonVertices.push({ x, y });
    }

    let currentVertex = 0;
    let progress = 0;
    let animationFrameId: number;

    function updatePosition() {
      const nextVertex = (currentVertex + 1) % hexagonVertices.length;
      const startX = hexagonVertices[currentVertex].x;
      const startY = hexagonVertices[currentVertex].y;
      const endX = hexagonVertices[nextVertex].x;
      const endY = hexagonVertices[nextVertex].y;

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
  }, [ref, radius, speed, points]);

  return position;
}
