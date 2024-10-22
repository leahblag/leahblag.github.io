// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact'; // Add this import
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary'; // Create this component

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
                <Route path="*" element={<NotFound />} /> {/* Add 404 route */}
              </Routes>
            </main>
            <Chatbot />
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;