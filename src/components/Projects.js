// components/Projects.js
import React from 'react';
import '../styles/Projects.css';

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
      <h2 className='projects'>- My Projects -</h2>
      <div className="projects-grid">
        <Project
          title="EcoSense: Emissions Data Chatbot"
          description="EcoSense is an interactive chatbot designed to simplify emissions data analysis. Using Python and machine learning, it helps users explore trends in emissions data, offering insights on environmental impact. This project showcases my skills in data science and chatbot development, merging innovation and sustainability to make complex information accessible and engaging."
          imageUrl="/assets/images/ecosense_chatbot.webp" 
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
