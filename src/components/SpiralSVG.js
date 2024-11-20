// SpiralSVG.js
import React from 'react';

const SpiralSVG = ({ className, delay }) => (
  <div className={className} style={{ animationDelay: delay }}>
    <svg
      width="75"
      height="75"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M50,50 C70,30 90,70 50,90 C10,70 30,30 50,50 Z" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

export default SpiralSVG;
