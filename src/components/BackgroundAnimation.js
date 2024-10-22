// components/BackgroundAnimation.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundAnimation = () => {
  const containerRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const circles = Array.from({ length: 50 }, () => {
      const circle = document.createElement('div');
      circle.classList.add('animated-circle');
      return circle;
    });

    circles.forEach(circle => {
      containerRef.current?.appendChild(circle);
    });

    const animation = gsap.to(circles, {
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      scale: "random(0.1, 2)",
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1
    });

    animationsRef.current.push(animation);

    // Cleanup
    return () => {
      circles.forEach(circle => circle.remove());
      animationsRef.current.forEach(anim => anim.kill());
    };
  }, []);

  return <div id="background-animation" ref={containerRef} />;
};

export default BackgroundAnimation;