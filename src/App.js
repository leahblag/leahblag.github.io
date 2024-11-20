// C:\react-portfolio\src\App.js
import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import React Router
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import Header from './components/Header'; // Import Header
import Home from './components/Home'; // Import Home
import About from './components/About'; // Import About
import Projects from './components/Projects'; // Import Projects
import Contact from './components/Contact';  // Import Contact
import Footer from './components/Footer'; // Import Footer
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot'; // Import Chatbot
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
// import SpiralSVG from './components/SpiralSVG'; // Corrected import path

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop /> {/* Add this inside Router */}
          <div className="App">
            <Header />
            <main> {/* Add semantic main tag */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="*" element={<NotFound />} /> Add 404 route */}
              </Routes>
            </main>
            {/* <SpiralSVG /> Include the SVG component here */}
            <Chatbot />
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
