import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circles = [];

    for (let i = 0; i < 50; i++) {
      const circle = document.createElement('div');
      circle.classList.add('animated-circle');
      circle.style.setProperty('--delay', `${Math.random() * 4}s`);
      circle.style.setProperty('--duration', `${Math.random() * 40 + 10}s`);
      container.appendChild(circle);
      circles.push(circle);
    }

    gsap.to(circles, {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      scale: "random(0.1, 2)",
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1
    });

    return () => {
      circles.forEach(circle => circle.remove());
    };
  }, []);

  return <div id="background-animation" ref={containerRef}></div>;
};
export default BackgroundAnimation;