import React from 'react';
import '../styles/About.css';

const About = () => (
  <section id="about" className="about-section">
    <div className="container">
      <h2 className="section-title">-About Me-</h2>
      <div className="about-content">
        <div className="about-text">
          <p className="tagline">From ballet to bytes: Crafting beautiful, intelligent web experiences.</p>
          <p className="about-me">Hello! I'm Leah, a web developer with a unique background in ballet. My journey from the stage to the screen has equipped me with a distinctive blend of creativity, discipline, and technical skills.</p>
          <p className="about-me">As a developer, I strive to create web experiences that are not only functional but also aesthetically pleasing and intuitive. My background in dance influences my approach to design, emphasizing fluidity, balance, and user experience.</p>
          <p className="about-me">When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or occasionally returning to the dance studio to keep my pirouettes sharp!</p>
        </div>
        <div className="about-image">
          <img 
            src="/assets/images/IMG_4520.jpg" 
            alt="Leah Blagbrough"
            onLoad={() => console.log('Image loaded successfully')}
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.target.src = '/assets/images/fallback-profile.jpg';
            }} 
          />
        </div>
      </div>
      
      <div className="skills-section">
        <h3 className="my-skills">-My Skills-</h3>
        <div className="skills-grid">
          <div className="skill-item">JavaScript (React, Node.js)</div>
          <div className="skill-item">HTML5 & CSS3</div>
          <div className="skill-item">Python</div>
          <div className="skill-item">Responsive Web Design</div>
          <div className="skill-item">UI/UX Design</div>
          <div className="skill-item">Version Control (Git)</div>
          <div className="skill-item">Database Management</div>
          <div className="skill-item">RESTful API Development</div>
          <div className="skill-item">Agile Methodologies</div>
        </div>
      </div>

      <div className="cta-section">
        <p>Interested in seeing my work?</p>
        <a href="/projects" className="cta-button">View My Projects</a>
      </div>

      <div className="ballet-section">
        <h3>My Ballet Journey</h3>
        <p>Curious about my ballet background? Check out one of my performances:</p>
        <a 
          href="https://youtu.be/utBr3GZoPD8?si=zQcgQJUuvS5q5Pzs&t=480" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="video-link"
        >
          Watch Ballet Performance
        </a>
      </div>
    </div>
  </section>
);

export default About;