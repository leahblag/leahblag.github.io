// src/components/Home.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import Chatbot from './Chatbot';



const Home = () => {
  useEffect(() => {
    const cube = document.querySelector('.cube');
    let rotateY = 0;
    let rotateX = 20;

    const rotateCube = () => {
      rotateY += 0.5;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      requestAnimationFrame(rotateCube);
    };

    rotateCube();
  }, []);

  const skillCategories = [
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
    },
    {
      category: "Web Development",
      skills: [
        { name: "Responsive Web Design", description: "Creating web pages that look good on all devices" },
        { name: "RESTful APIs", description: "An architectural style for an application program interface (API)" },
        { name: "Front-end Development", description: "Creating the user interface and user experience of a website" },
        { name: "Back-end Development", description: "Building and maintaining the server-side of web applications" }
      ]
    },
    {
      category: "Data Skills",
      skills: [
        { name: "Data Analysis", description: "Inspecting, cleansing, transforming, and modeling data" },
        { name: "Data Visualization", description: "The graphic representation of data" }
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        { name: "Problem-Solving", description: "Finding solutions to difficult or complex issues" },
        { name: "Collaboration", description: "Working with others to produce or create something" },
        { name: "Creativity", description: "Using imagination or original ideas to create something" },
        { name: "Adaptability", description: "The quality of being able to adjust to new conditions" }
      ]
    }
  ];

  return (
    <div className="home">
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
        </ div>
        <div className="cube-container">
  <div className="cube">
    <div className="cube-face cube-face-front">Creativity</div>
    <div className="cube-face cube-face-back">Innovation</div>
    <div className="cube-face cube-face-left">AI Enthusiast</div>
    <div className="cube-face cube-face-right">UX Lover</div>
    <div className="cube-face cube-face-top">Always Learning</div>
    <div className="cube-face cube-face-bottom">Team Player</div>
  </div>
</div>
      </section>
      <section className="skills">
        <h2>My Toolkit</h2>
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item" title={skill.description}>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;