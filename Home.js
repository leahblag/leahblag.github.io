import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/cube.css';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [shapes, setShapes] = useState(['cube']);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [shapeSize, setShapeSize] = useState(150);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const animationFrameRef = useRef();
  const shapeRef = useRef();

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const shape = shapeRef.current;
    const headerHeight = 80;
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;
    let rotationX = -25;
    let rotationY = 0;
    let rotationZ = 0;

    const createTrailEffect = (transform) => {
      if (!effectsEnabled) return;
      const trail = document.createElement('div');
      trail.className = 'floating-shape-trail';
      trail.style.transform = transform;
      shape.parentElement.appendChild(trail);
      setTimeout(() => trail.remove(), 1000);
    };

    const updateShapePosition = (timestamp) => {
      if (!isDragging) {
        velocityX *= 0.98;
        velocityY *= 0.98;
        rotationZ += (velocityX - velocityY) * 0.1;
        
        xOffset += velocityX;
        yOffset += velocityY;

        // Enhanced boundary physics
        const bounce = 0.8;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (xOffset < 0) {
          xOffset = 0;
          velocityX *= -bounce;
          rotationZ += 15;
        }
        if (xOffset > windowWidth - shapeSize) {
          xOffset = windowWidth - shapeSize;
          velocityX *= -bounce;
          rotationZ -= 15;
        }
        if (yOffset < headerHeight) {
          yOffset = headerHeight;
          velocityY *= -bounce;
          rotationX += 15;
        }
        if (yOffset > windowHeight - shapeSize) {
          yOffset = windowHeight - shapeSize;
          velocityY *= -bounce;
          rotationX -= 15;
        }

        const transform = `
          translate3d(${xOffset}px, ${yOffset}px, 0)
          rotateX(${rotationX}deg)
          rotateY(${rotationY}deg)
          rotateZ(${rotationZ}deg)
        `;
        
        shape.style.transform = transform;

        if (effectsEnabled && (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5)) {
          createTrailEffect(transform);
        }

        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
          animationFrameRef.current = requestAnimationFrame(updateShapePosition);
        }
      }
    };

    const dragStart = (e) => {
      if (e.target.closest('.floating-shape')) {
        isDragging = true;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        lastX = e.clientX;
        lastY = e.clientY;
        
        shape.style.animation = 'none';
        shape.style.cursor = 'grabbing';
      }
    };

    const drag = (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        velocityX = (e.clientX - lastX) * 2;
        velocityY = (e.clientY - lastY) * 2;
        
        rotationX += velocityY * 0.2;
        rotationY += velocityX * 0.2;
        
        lastX = e.clientX;
        lastY = e.clientY;
        
        xOffset = currentX;
        yOffset = currentY;

        const transform = `
          translate3d(${currentX}px, ${currentY}px, 0)
          rotateX(${rotationX}deg)
          rotateY(${rotationY}deg)
          rotateZ(${rotationZ}deg)
        `;
        
        shape.style.transform = transform;
        
        if (effectsEnabled) {
          createTrailEffect(transform);
        }
      }
    };

    const dragEnd = () => {
      if (isDragging) {
        isDragging = false;
        shape.style.cursor = 'grab';
        animationFrameRef.current = requestAnimationFrame(updateShapePosition);
      }
    };

    shape.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    return () => {
      shape.removeEventListener('mousedown', dragStart);
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', dragEnd);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [shapeSize, effectsEnabled]);

  const ShapeControls = () => (
    <div className="shape-controls">
      <div className="control-panel">
        <h3>Shape Controls</h3>
        <div className="shape-toggles">
          {['Cube', 'Pyramid', 'Sphere', 'Octahedron'].map(shape => (
            <button 
              key={shape}
              onClick={() => setShapes(prev => 
                prev.includes(shape.toLowerCase()) 
                  ? prev.filter(s => s !== shape.toLowerCase())
                  : [...prev, shape.toLowerCase()]
              )}
              className={`control-button ${shapes.includes(shape.toLowerCase()) ? 'active' : ''}`}
            >
              {shape}
            </button>
          ))}
        </div>
        <div className="effect-controls">
          <label className="control-label">
            Size
            <input 
              type="range" 
              min="100" 
              max="200" 
              value={shapeSize}
              onChange={(e) => setShapeSize(Number(e.target.value))}
              className="control-slider"
            />
          </label>
          <label className="control-label">
            Speed
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(Number(e.target.value))}
              className="control-slider"
            />
          </label>
          <button 
            onClick={() => setEffectsEnabled(!effectsEnabled)}
            className="control-button"
          >
            {effectsEnabled ? 'Disable' : 'Enable'} Effects
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      

  const skillCategories = useMemo(() => [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", description: "A versatile, high-level programming language" },
        { name: "JavaScript", description: "The language of the web, essential for front-end development" },
        { name: "HTML5", description: "The latest version of the markup language for structuring web content" },
        { name: "CSS3", description: "The styling language for designing web pages" }
      ]
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React.js", description: "A JavaScript library for building user interfaces" },
        { name: "Node.js", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine" },
        { name: "Pandas", description: "A data manipulation and analysis library for Python" }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", description: "A distributed version control system" },
        { name: "GitHub", description: "A web-based hosting service for version control using Git" },
        { name: "VS Code", description: "A source-code editor made by Microsoft" },
        { name: "npm", description: "A package manager for JavaScript" }
      ]
    }
  ], []);

  const renderSkills = useMemo(() =>
    skillCategories.map((category, index) => (
      <div key={index} className="skill-category" data-aos="fade-up">
        <h3>{category.category}</h3>
        <div className="skill-items">
          {category.skills.map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className="skill-item"
              title={skill.description}
              data-aos="fade-up"
              data-aos-delay={skillIndex * 100}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    )),
    [skillCategories]
  );

  return (
    <div className="home">
      <ShapeControls />
      <div className="floating-shape-container">
        {shapes.map((shape, index) => (
          <div 
            key={shape}
            ref={index === 0 ? shapeRef : null}
            className={`floating-shape floating-${shape}`}
            style={{ 
              width: `${shapeSize}px`, 
              height: `${shapeSize}px`,
              animationDuration: `${40 / rotationSpeed}s`
            }}
          >
            <div className="shape-face front">Innovation</div>
            <div className="shape-face back">Creativity</div>
            <div className="shape-face right">Design</div>
            <div className="shape-face left">Development</div>
            <div className="shape-face top">Problem Solving</div>
            <div className="shape-face bottom">Team Work</div>
          </div>
        ))}
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="title-container">
            <h1 className="glitch main-title" data-text="Choreographing">Choreographing</h1>
            <h1 className="glitch sub-title" data-text="Code">Code</h1>
          </div>
          <p className="subtitle">A Dance of Design and Development</p>
          <div className="cta-container">
            <Link to="/projects" className="cta-button">View My Work</Link>
            <Link to="/contact" className="cta-button cta-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>

      <section className="skills">
        <h2>My Toolkit</h2>
        <div className="skills-container">
          {renderSkills}
        </div>
      </section>
    </div>
  );
};

export default React.memo(Home);
