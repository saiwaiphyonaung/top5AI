import React, { useState, useEffect } from 'react';

// Easing function for a smoother animation
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// FIX: The use of `React.RefObject` requires the React namespace to be in scope.
const useCountUp = (ref: React.RefObject<HTMLElement>, end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId: number;
    let startTimestamp: number | null = null;
    let hasAnimated = false;

    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true; // Prevents re-animating
          frameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 } // Start when 50% of the element is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, end, duration]);

  return count;
};

export default useCountUp;
