import { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, Heart } from 'lucide-react';

export const GeminiChatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Davina\'s AI assistant! 🤖✨' },
    { type: 'bot', message: 'I can help you learn more about her skills, projects, and experience. Ask me anything!' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [robotExpression, setRobotExpression] = useState('happy');
  const [showHeart, setShowHeart] = useState(false);
  const [isUsingAPI, setIsUsingAPI] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Check if API is available on component mount
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (API_KEY && API_KEY !== 'AIzaSyDemo_Key_Replace_With_Your_Real_Key' && API_KEY !== 'your_actual_gemini_api_key_here') {
      setIsUsingAPI(true);
      setChatMessages([
        { type: 'bot', message: 'Hi! I\'m Davina\'s intelligent AI assistant! 🤖✨' },
        { type: 'bot', message: 'I can have smart conversations about her portfolio, skills, and projects. Ask me anything!' }
      ]);
    } else {
      setIsUsingAPI(false);
      setChatMessages([
        { type: 'bot', message: 'Hi! I\'m Davina\'s assistant in demo mode! 🤖✨' },
        { type: 'bot', message: 'I have preset responses about her skills and projects. For real AI chat, please configure Gemini API key!' },
        { type: 'bot', message: 'Visit: https://makersuite.google.com/app/apikey to get your free API key 🔑' }
      ]);
    }
  }, []);

  const handleChatClick = () => {
    setShowChatbot(true);
    setRobotExpression('excited');
    setShowHeart(true);
    
    // Reset animations
    setTimeout(() => {
      setRobotExpression('happy');
      setShowHeart(false);
    }, 2000);
  };

  // Gemini API integration
  const callGeminiAPI = async (userMessage) => {
    try {
      // Get API key from environment variable
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      console.log('🔍 Checking API key:', API_KEY ? 'Key found' : 'No key');
      
      if (!API_KEY || API_KEY.includes('demo') || API_KEY.includes('Demo') || API_KEY === 'your_actual_gemini_api_key_here') {
        console.log('🔑 Gemini API key not configured properly, using preset responses');
        return getFallbackResponse(userMessage);
      }

      console.log('🤖 Making API call to Gemini with message:', userMessage);

      const requestBody = {
        contents: [{
          parts: [{
            text: `You are Davina Azalia's AI assistant. 

USER: "${userMessage}"

Respond as Davina's friendly AI assistant in the same language as the user. Keep it under 100 words. Focus on her skills: Python, React, JavaScript, ML, UI/UX, Node.js. She has 3+ years experience and 15+ projects.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 200
        }
      };

      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API Error Details:', errorText);
        console.error('❌ Response status:', response.status, response.statusText);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Successfully got response from Gemini API:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('❌ Unexpected API response structure:', data);
        throw new Error('Invalid response structure from Gemini API');
      }
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      console.log('🔄 Falling back to preset responses...');
      return getFallbackResponse(userMessage) + '\n\n💡 *API temporarily unavailable, using preset response*';
    }
  };

  // Enhanced fallback responses with more variety
  const getFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        'Hello there! 👋 Welcome to Davina\'s amazing portfolio! I\'m so excited to help you explore!',
        'Hi! 😊 Great to meet you! I\'m here to tell you all about Davina\'s incredible journey!',
        'Hey! 🌟 Thanks for visiting! Let me show you why Davina is such an awesome developer!'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Skills responses
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      const skillResponses = [
        'Davina is a master of many technologies! 🚀 She\'s skilled in Python, React, Machine Learning, UI/UX Design, Node.js, and so much more! Her tech stack is incredibly diverse!',
        'Her skills are amazing! 💻 From frontend magic with React to backend wizardry with Python, plus AI/ML expertise - she\'s a true full-stack genius!',
        'She\'s like a tech superhero! 🦸‍♀️ Python, JavaScript, React, Machine Learning, UI/UX - you name it, she\'s mastered it! Check out the Skills section for the full arsenal!'
      ];
      return skillResponses[Math.floor(Math.random() * skillResponses.length)];
    }
    
    // Projects responses
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      const projectResponses = [
        'Oh wow, her projects are incredible! 💼 She has completed 15+ amazing projects ranging from AI applications to stunning web apps! Each one showcases her creativity and technical prowess!',
        'You\'re in for a treat! 🎨 Davina\'s portfolio includes AI-powered applications, beautiful UI/UX designs, and full-stack web solutions. Scroll down to see her masterpieces!',
        'Her project collection is like a tech art gallery! 🖼️ From machine learning models to interactive web experiences - every project tells a story of innovation and skill!'
      ];
      return projectResponses[Math.floor(Math.random() * projectResponses.length)];
    }
    
    // Experience responses
    if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career')) {
      const experienceResponses = [
        'Davina has 3+ years of hands-on experience creating digital magic! 👨‍💻 She\'s worked on everything from AI solutions to user-friendly interfaces. Her journey is inspiring!',
        'With 3+ years in the field, she\'s not just experienced - she\'s passionate! 🔥 Every project she touches becomes something special. Her dedication shows in every line of code!',
        'Her experience speaks volumes! 📈 3+ years of turning ideas into reality, solving complex problems, and creating solutions that make a difference!'
      ];
      return experienceResponses[Math.floor(Math.random() * experienceResponses.length)];
    }
    
    // Contact responses
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
      const contactResponses = [
        'Want to connect with this amazing developer? 📧 Head to the Contact section below! She\'d love to hear from you and discuss potential collaborations!',
        'Ready to work with Davina? 🤝 Check out the Contact section for all the ways to get in touch. She\'s always excited about new opportunities!',
        'Let\'s make it happen! 💫 Visit the Contact section to reach out. Davina is super friendly and loves connecting with fellow tech enthusiasts!'
      ];
      return contactResponses[Math.floor(Math.random() * contactResponses.length)];
    }
    
    // About responses  
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
      const aboutResponses = [
        'Davina is absolutely incredible! ✨ She\'s a passionate Full-Stack Developer & AI Enthusiast who loves crafting intelligent digital experiences. Her creativity knows no bounds!',
        'Let me tell you about this amazing person! 🌟 Davina combines technical expertise with artistic vision to create solutions that are both powerful and beautiful!',
        'She\'s a true innovator! 🚀 Davina doesn\'t just write code - she creates experiences, solves problems, and brings ideas to life with elegance and efficiency!'
      ];
      return aboutResponses[Math.floor(Math.random() * aboutResponses.length)];
    }
    
    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      const thankResponses = [
        'You\'re so welcome! 😊 I love helping people discover how awesome Davina is! Is there anything else you\'d like to know?',
        'My pleasure! 🤗 That\'s what I\'m here for - spreading the word about Davina\'s amazing work! Any other questions?',
        'Aww, you\'re too kind! 💕 I could talk about Davina\'s talents all day! What else would you like to explore?'
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }
    
    // Default responses
    const defaultResponses = [
      'That\'s a great question! 🤔 I\'d love to tell you more about Davina\'s incredible skills, amazing projects, or how to get in touch with her!',
      'Interesting! 🌟 Feel free to ask me about her technical expertise, creative projects, or professional experience - I\'m full of exciting details!',
      'Oh, I love chatting about Davina! 💫 Whether you want to know about her coding skills, design talents, or AI expertise - I\'m here to help!',
      'You\'ve come to the right bot! 🤖 I can share insights about her development journey, project highlights, or ways to connect with her!',
      'Awesome question! ✨ I\'m bursting with information about Davina\'s portfolio, skills, and achievements. What specifically interests you most?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    console.log('📨 User sent message:', userMessage);
    
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      console.log('⏳ Calling Gemini API...');
      const response = await callGeminiAPI(userMessage);
      console.log('📬 Bot response:', response);
      setChatMessages(prev => [...prev, { type: 'bot', message: response }]);
    } catch (error) {
      console.error('❌ Error in handleSendMessage:', error);
      const fallbackResponse = getFallbackResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'bot', message: fallbackResponse + '\n\n💡 *Error occurred, using preset response*' }]);
    }
    
    setIsTyping(false);
  };

  return (
    <>
      {/* Chatbot Modal */}
      {showChatbot && (
        <div 
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            isChatMinimized ? 'pointer-events-none' : ''
          }`}
          style={{ background: isChatMinimized ? 'transparent' : 'rgba(0,0,0,0.8)' }}
        >
          <div 
            className={`absolute transition-all duration-500 ${
              isChatMinimized 
                ? 'bottom-4 right-20 w-72 sm:w-80 h-12' 
                : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[85vh] sm:w-[480px] sm:h-[600px] max-w-[90vw] max-h-[90vh]'
            }`}
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl h-full flex flex-col">
              {/* Cosmic Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="cosmic-button w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden p-2">
                      <Bot className={`h-5 w-5 text-primary-foreground ${robotExpression === 'excited' ? 'animate-bounce' : ''}`} />
                      
                      {/* Cute robot eyes */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <div className={`w-1 h-1 rounded-full ${robotExpression === 'excited' ? 'bg-accent animate-ping' : 'bg-primary/70'}`}></div>
                        <div className={`w-1 h-1 rounded-full ${robotExpression === 'excited' ? 'bg-accent animate-ping' : 'bg-primary/70'}`} style={{animationDelay: '0.2s'}}></div>
                      </div>
                      
                      {/* Cute smile */}
                      <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-0.5 rounded-full ${robotExpression === 'excited' ? 'bg-accent' : 'bg-primary-foreground/70'}`}></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-foreground font-bold text-sm sm:text-base flex items-center gap-2">
                      Davina's AI Assistant
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isUsingAPI 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'bg-secondary/20 text-secondary border border-secondary/30'
                      }`}>
                        {isUsingAPI ? '🤖 AI Mode' : '📝 Demo Mode'}
                      </span>
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {isUsingAPI ? 'Intelligent AI assistant ready to help! ✨' : 'Preset responses only 🎭'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsChatMinimized(!isChatMinimized)}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors border border-primary/20 hover:border-primary/40"
                  >
                    {isChatMinimized ? <Maximize2 className="h-4 w-4 text-primary" /> : <Minimize2 className="h-4 w-4 text-primary" />}
                  </button>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20 hover:border-red-500/40"
                  >
                    <X className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>

              {!isChatMinimized && (
                <>
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-primary/5">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                            msg.type === 'user'
                              ? 'cosmic-button bg-primary text-primary-foreground'
                              : 'bg-card/80 text-foreground border border-primary/20 backdrop-blur-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-card/80 text-foreground p-3 rounded-2xl border border-primary/20 shadow-lg backdrop-blur-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Cosmic Chat Input */}
                  <div className="p-4 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything about Davina's portfolio..."
                        className="flex-1 px-4 py-3 bg-card/50 border border-primary/30 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 backdrop-blur-sm hover:bg-card/70"
                        style={{ fontSize: '16px' }}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isTyping}
                        className="cosmic-button px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all min-w-[48px] flex items-center justify-center hover:scale-105 active:scale-95"
                      >
                        <Send className="h-4 w-4 text-primary-foreground" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cosmic Chat Button with Advanced Cursor Following Effect */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 cursor-pointer select-none"
        onClick={handleChatClick}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          e.currentTarget.style.setProperty('--mouse-x', `${x * 0.15}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y * 0.15}px`);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.setProperty('--scale', '1.1');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty('--mouse-x', '0px');
          e.currentTarget.style.setProperty('--mouse-y', '0px');
          e.currentTarget.style.setProperty('--scale', '1');
        }}
        style={{
          transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px)) scale(var(--scale, 1))',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="relative group">
          {/* Heart animation when clicked */}
          {showHeart && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
              <Heart className="h-5 w-5 text-pink-400 fill-pink-400 animate-pulse" />
            </div>
          )}
          
          {/* Main Cosmic Chat Button */}
          <div className="cosmic-button relative p-4 rounded-2xl border-2 border-primary/30 backdrop-blur-sm shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-500 group-hover:scale-105 animate-pulse-subtle">
            {/* Cosmic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
            
            {/* Floating sparkles */}
            <div className="absolute -top-3 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="h-3 w-3 text-accent animate-bounce" style={{animationDelay: '0.5s'}} />
            </div>
            <div className="absolute -bottom-2 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <Sparkles className="h-2 w-2 text-secondary animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            
            {/* Cute antenna */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-3 bg-primary rounded-full">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Robot body */}
            <Bot className={`h-6 w-6 text-primary-foreground mx-auto relative z-10 ${robotExpression === 'excited' ? 'animate-spin' : 'animate-bounce'}`} style={{animationDuration: '2s'}} />
            
            {/* Cute robot eyes */}
            <div className="absolute top-3 left-3 flex gap-1 z-10">
              <div className={`w-1 h-1 rounded-full ${robotExpression === 'excited' ? 'bg-accent animate-ping' : 'bg-primary/70 animate-pulse'}`}></div>
              <div className={`w-1 h-1 rounded-full ${robotExpression === 'excited' ? 'bg-accent animate-ping' : 'bg-primary/70 animate-pulse'}`} style={{animationDelay: '0.3s'}}></div>
            </div>
            
            {/* Cute smile */}
            <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-0.5 rounded-full transition-all duration-300 z-10 ${
              robotExpression === 'excited' ? 'bg-accent animate-pulse w-4' : 'bg-primary-foreground/70'
            }`}></div>
            
            {/* Side decorations */}
            <div className="absolute -right-1 top-2 z-10">
              <Sparkles className="h-2 w-2 text-accent animate-bounce" style={{animationDelay: '1s'}} />
            </div>
            
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-background animate-pulse z-10"></div>
          </div>
          
          {/* Hover tooltip with cosmic style */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-card/95 border border-primary/20 text-foreground px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl backdrop-blur-sm">
              Chat with Davina's AI! 🤖✨
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card/95"></div>
            </div>
          </div>
          
          {/* Cosmic glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
        </div>
      </div>
    </>
  );
};
