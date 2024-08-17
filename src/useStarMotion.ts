import { RefObject, useEffect, useState } from "react";

export default function useStarMotion(
  ref: RefObject<HTMLDivElement>,
  points = 5,
  radius = 100,
  speed = 0.1
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

    // Calculate the outer and inner radius of the star
    const outerRadius = radius;
    const innerRadius = radius / 2;

    // Calculate the coordinates of the star points
    const starVertices: { x: number; y: number }[] = [];
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI / points) * i;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      starVertices.push({ x, y });
    }

    let currentVertex = 0;
    let progress = 0;
    let animationFrameId: number;

    function updatePosition() {
      const nextVertex = (currentVertex + 1) % starVertices.length;
      const startX = starVertices[currentVertex].x;
      const startY = starVertices[currentVertex].y;
      const endX = starVertices[nextVertex].x;
      const endY = starVertices[nextVertex].y;

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
  }, [radius, points, speed, ref]);

  return position;
}
