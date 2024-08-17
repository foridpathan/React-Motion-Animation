import { RefObject, useEffect, useState } from "react";

export function useCircularMotion(
  ref?: RefObject<HTMLDivElement>,
  radius = 100,
  speed = 0.07
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

    let angle = 0;

    let animationFrameId: number;

    function updatePosition() {
      angle += speed; // increase the angle for continuous motion
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      setPosition({ x, y });
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    updatePosition();

    return () => cancelAnimationFrame(animationFrameId);
  }, [radius, ref, speed]);

  return position;
}
