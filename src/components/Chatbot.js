// Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    
    if (!inputText.trim()) return; // Don't send empty messages

    try {
      setIsLoading(true);
      // Add user message
      setMessages(prev => [...prev, { text: inputText, isUser: true }]);
      
      // Simulate bot response
      const response = await getBotResponse(inputText);
      
      // Add bot message
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setInputText(''); // Clear input
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't process your message. Please try again.", 
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated bot response function
  const getBotResponse = async (message) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Define bot responses
    const responses = {
      "hello": "Hi there! How can I help you?",
      "how are you": "I'm doing well, thank you for asking!",
      "bye": "Goodbye! Have a great day!",
      "default": "I'm not sure how to respond to that. Could you rephrase?"
    };

    const lowercaseMessage = message.toLowerCase();
    return responses[lowercaseMessage] || responses.default;
  };

  return (
    <div className="chatbot-container">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? "Close chat" : "Open chat"}
      >
        {isVisible ? "Close Chat" : "Chat with me"}
      </button>

      {isVisible && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h3>Chat Assistant</h3>
            <button 
              onClick={() => setIsVisible(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
              >
                <div className={`message-content ${message.isError ? 'error' : ''}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content loading">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              id="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              aria-label="Chat message input"
            />
             <button 
              type="submit"
              aria-label="Send message"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;