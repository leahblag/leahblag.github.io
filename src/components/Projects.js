// components/Projects.js
import React from 'react';
import '../styles/global.css';

const Project = ({ title, description, imageUrl }) => (
  <div className="project">
    <img src={imageUrl} alt={title} />
    <div className="project-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn">Learn More</button>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <h2>My Projects</h2>
      <div className="projects-grid">
        <Project
          title="Data Analysis with Python"
          description="A deep dive into data insights and visualization using Python."
          imageUrl="/api/placeholder/400/300"
        />
        <Project
          title="Interactive Chatbot"
          description="An AI chatbot designed to assist users with a fun and professional personality."
          imageUrl="/api/placeholder/400/300"
        />
      </div>
    </div>
  </section>
);
export default Projects;