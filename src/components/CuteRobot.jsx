import { useState, useEffect, useRef } from 'react';
import { Bot, Heart, Sparkles, Zap, Send, X, Minimize2, Maximize2 } from 'lucide-react';

export const CuteRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [expression, setExpression] = useState('happy');
  const [showHeart, setShowHeart] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Davina\'s AI assistant! 🤖' },
    { type: 'bot', message: 'I can help you navigate through her portfolio! What would you like to know?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.documentElement.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // More dramatic movement for "extraordinary" effect
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      
      setMousePosition({
        x: Math.max(-50, Math.min(50, deltaX)),
        y: Math.max(-50, Math.min(50, deltaY))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleRobotClick = () => {
    setIsClicked(true);
    setExpression('excited');
    setShowHeart(true);
    setShowChatbot(true);
    
    // Reset animations
    setTimeout(() => {
      setIsClicked(false);
      setExpression('happy');
      setShowHeart(false);
    }, 2000);
  };

  const botResponses = {
    'hello': 'Hello there! Welcome to Davina\'s portfolio! 👋',
    'hi': 'Hi! Great to meet you! How can I help you explore? 😊',
    'about': 'Davina is a passionate Full-Stack Developer & AI Enthusiast with 3+ years of experience!',
    'skills': 'She\'s skilled in Python, React, Machine Learning, UI/UX Design, and more! Check out the Skills section! 🚀',
    'projects': 'She has completed 15+ amazing projects! Scroll down to see her work! 💼',
    'contact': 'Want to get in touch? Head to the Contact section below! 📧',
    'experience': 'Davina has 3+ years of experience and has worked with 10+ technologies!',
    'help': 'I can tell you about Davina\'s skills, projects, experience, or help you navigate the portfolio!',
    'default': 'That\'s interesting! Feel free to ask about Davina\'s skills, projects, or experience! 🤖'
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase();
      let response = botResponses.default;
      
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      setChatMessages(prev => [...prev, { type: 'bot', message: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const getEyeExpression = () => {
    switch(expression) {
      case 'excited':
        return 'w-2 h-2 bg-yellow-400 rounded-full animate-ping';
      case 'happy':
      default:
        return 'w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse';
    }
  };

  return (
    <>
      {/* Chatbot Modal */}
      {showChatbot && (
        <div 
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            isChatMinimized ? 'pointer-events-none' : ''
          }`}
          style={{ background: isChatMinimized ? 'transparent' : 'rgba(0,0,0,0.5)' }}
        >
          <div 
            className={`absolute transition-all duration-500 ${
              isChatMinimized 
                ? 'bottom-4 right-4 w-72 sm:w-80 h-12' 
                : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] sm:w-96 sm:h-96 max-w-[90vw] max-h-[90vh]'
            }`}
          >
            <div className="bg-gradient-to-br from-blue-500/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border-2 border-blue-300/50 shadow-2xl h-full flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot className="h-8 w-8 text-white animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">AI Assistant</h3>
                    <p className="text-blue-100 text-xs">Always here to help!</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsChatMinimized(!isChatMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isChatMinimized ? <Maximize2 className="h-4 w-4 text-white" /> : <Minimize2 className="h-4 w-4 text-white" />}
                  </button>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {!isChatMinimized && (
                <>
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.type === 'user'
                              ? 'bg-white/90 text-gray-800'
                              : 'bg-white/20 text-white'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/20 text-white p-3 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/20">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything about Davina's portfolio..."
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                        style={{ fontSize: '16px' }} // Prevents zoom on iOS
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Send className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Cute Robot with Enhanced Movement */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 cursor-pointer select-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(${mousePosition.x * 0.1}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={handleRobotClick}
      >
        {/* Floating particles around robot */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute -top-6 right-2 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Heart animation when clicked */}
        {showHeart && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Heart className="h-6 w-6 text-pink-400 fill-pink-400 animate-pulse" />
          </div>
        )}
        
        {/* Robot Container with Enhanced Effects */}
        <div className={`relative group transition-all duration-500 ${isClicked ? 'scale-125 rotate-12' : 'hover:scale-110'}`}>
          {/* Robot Body */}
          <div className="relative bg-gradient-to-br from-blue-400/95 to-purple-500/95 p-4 sm:p-5 rounded-2xl border-2 border-blue-300/50 backdrop-blur-sm shadow-2xl">
            {/* Enhanced Antenna */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-6 bg-gradient-to-t from-blue-300 to-green-400 rounded-full">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              </div>
            </div>
            
            {/* Robot Head/Body */}
            <Bot className={`h-8 w-8 sm:h-10 sm:w-10 text-white mx-auto ${isClicked ? 'animate-spin' : 'animate-bounce'}`} style={{animationDuration: '2s'}} />
            
            {/* Eyes with enhanced animation */}
            <div className="absolute top-3 left-3 flex gap-2">
              <div className={getEyeExpression()}></div>
              <div className={getEyeExpression()} style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Dynamic Mouth */}
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full transition-all duration-300 ${
              expression === 'excited' ? 'bg-yellow-400 animate-pulse w-6' : 'bg-white/70'
            }`}></div>
            
            {/* Enhanced Side decorations */}
            <div className="absolute -right-1 top-2">
              <Zap className="h-3 w-3 text-yellow-300 animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            <div className="absolute -left-1 bottom-2">
              <Sparkles className="h-3 w-3 text-pink-300 animate-pulse" />
            </div>
          </div>
          
          {/* Enhanced Speech bubble */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-white/95 text-gray-800 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl border border-blue-200">
              Click me for AI Chat! 🤖✨
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white/95"></div>
            </div>
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Enhanced Floating Mini Robots with mouse tracking */}
      <div 
        className="fixed top-1/4 left-4 sm:left-8 z-30 animate-float opacity-70"
        style={{
          transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="bg-gradient-to-br from-green-400/90 to-teal-500/90 p-2 sm:p-3 rounded-lg border border-green-300/50 backdrop-blur-sm shadow-lg">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <div 
        className="fixed top-1/3 right-8 sm:right-12 z-30 animate-float-delayed opacity-60"
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px) rotate(${mousePosition.x * 0.2}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="bg-gradient-to-br from-pink-400/90 to-red-500/90 p-2 sm:p-3 rounded-lg border border-pink-300/50 backdrop-blur-sm shadow-lg">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-bounce" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <div 
        className="fixed bottom-1/3 left-12 sm:left-16 z-30 animate-float opacity-50"
        style={{
          transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.4}px) scale(${1 + mousePosition.x * 0.01})`,
          transition: 'transform 0.6s ease-out'
        }}
      >
        <div className="bg-gradient-to-br from-yellow-400/90 to-orange-500/90 p-2 sm:p-3 rounded-lg border border-yellow-300/50 backdrop-blur-sm shadow-lg">
          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white animate-pulse" />
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </>
  );
};
