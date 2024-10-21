import React, { useState, useRef, useEffect } from 'react';
<img src="/imgs/dream_a1nj5003op2.jpg" alt="Chatbot" />

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => setIsVisible(!isVisible);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      setTimeout(() => {
        const botResponse = generateResponse(inputValue);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }, 1000);
    }
  };

  const generateResponse = (message) => {
    const responses = {
      'hello': 'Hello! How can I assist you today?',
      'hi': 'Hi! I\'m here to help. What\'s on your mind?',
      'how are you': 'I\'m doing well, thanks! How about you?',
      'projects': 'I\'d be happy to discuss my projects! Which one are you interested in?',
      'contact': 'You can reach me through the contact form on this website or connect with me on LinkedIn.',
      'skills': 'My skills include full-stack development, front-end design, and AI integration. What specific area are you curious about?',
      'default': 'That is an interesting topic! Could you provide more details or ask a specific question?'
    };
    
    const lowerCaseMessage = message.toLowerCase();
    for (const key in responses) {
      if (lowerCaseMessage.includes(key)) {
        return responses[key];
      }
    }
    return responses['default'];
  };

  return (
    <>
      <button id="chatbot-toggle" onClick={toggleChatbot}>Chat with me</button>
      <div id="chatbot" className={isVisible ? 'chatbot-visible' : ''}>
        <div className="chatbot-header">
          <h3>Let's Chat!</h3>
          <button onClick={toggleChatbot}>X</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <p key={index} className={`${msg.sender}-message`}>
              {msg.sender === 'user' ? 'You: ' : '🤖 '}{msg.text}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;