import { useEffect, useState } from "react";

export function useDelayedValue(value = { x: 0, y: 0 }, delay = 1) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}
