import React, { useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { SHAPE_CONFIGS, SKILL_CATEGORIES } from '../constants/homeConfig';
import { useShapeDrag } from '../hooks/useShapeDrag';
import { useTrailEffect } from '../hooks/useTrailEffect';
import '../styles/global.css';
import '../styles/cube.css';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [shapes, setShapes] = useState(['cube']);
  const [config, setConfig] = useState({
    effectsEnabled: true,
    shapeSize: 150,
    rotationSpeed: 1
  });
  
  const shapeRef = useRef(null);
  const { handleDragStart, handleDrag, handleDragEnd } = useShapeDrag({
    shapeRef,
    shapeSize: config.shapeSize,
    effectsEnabled: config.effectsEnabled
  });

  const createTrailEffect = useTrailEffect(config.effectsEnabled);

  // Theme synchronization
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  // Shape controls component with memoization
  const ShapeControls = useMemo(() => {
    const handleShapeToggle = (shapeName) => {
      setShapes(prev => 
        prev.includes(shapeName.toLowerCase())
          ? prev.filter(s => s !== shapeName.toLowerCase())
          : [...prev, shapeName.toLowerCase()]
      );
    };

    const handleConfigChange = (key, value) => {
      setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="controls-panel">
        <h3>Shape Controls</h3>
        <div className="shape-toggles">
          {SHAPE_CONFIGS.map(({ name }) => (
            <button 
              key={name}
              onClick={() => handleShapeToggle(name)}
              className={`control-button ${shapes.includes(name.toLowerCase()) ? 'active' : ''}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="effect-controls">
          <ConfigSlider 
            label="Size"
            value={config.shapeSize}
            min={100}
            max={200}
            onChange={(value) => handleConfigChange('shapeSize', value)}
          />
          <ConfigSlider 
            label="Speed"
            value={config.rotationSpeed}
            min={0.5}
            max={2}
            step={0.1}
            onChange={(value) => handleConfigChange('rotationSpeed', value)}
          />
          <EffectsToggle 
            enabled={config.effectsEnabled}
            onChange={(value) => handleConfigChange('effectsEnabled', value)}
          />
        </div>
      </div>
    );
  }, [shapes, config]);

  // Skills section with optimized rendering
  const renderSkills = useMemo(() => (
    <div className="skills-container">
      {SKILL_CATEGORIES.map((category, index) => (
        <SkillCategory 
          key={category.category}
          category={category}
          index={index}
        />
      ))}
    </div>
  ), []);

  return (
    <div className="home">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      {ShapeControls}
      
      <FloatingShapes 
        shapes={shapes}
        config={config}
        shapeRef={shapeRef}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />

      <HeroSection />
      
      <section className="skills">
        <h2>My Toolkit</h2>
        {renderSkills}
      </section>
    </div>
  );
};

export default React.memo(Home);
