
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Jambo! I am your RasuRide AI Assistant. Looking for a car or have questions about renting in Kenya? Ask me anything!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const historyForGemini = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const aiResponse = await getGeminiResponse(userMsg, historyForGemini);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      {isOpen ? (
        <div className="bg-slate-900 border border-slate-800 w-[350px] md:w-[400px] h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-amber-500 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center">
                <span className="text-amber-500 text-lg font-black">R</span>
              </div>
              <div>
                <h3 className="text-slate-950 font-bold text-sm">RasuRide Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-pulse"></div>
                  <span className="text-slate-950/70 text-[10px] font-bold uppercase tracking-wider">Online & Ready</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-950/60 hover:text-slate-950 p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-slate-950 rounded-tr-none font-medium' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700/50 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Ask me about cars, rates, or trips..."
                className="flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-amber-500 text-slate-950 p-3 rounded-xl hover:bg-amber-400 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-amber-500/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 text-slate-950 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center space-x-2 group"
        >
          <div className="w-8 h-8 bg-slate-950 rounded-full flex items-center justify-center">
            <span className="text-amber-500 text-xs font-black">R</span>
          </div>
          <span className="font-bold text-sm max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap pr-2">
            Ask RasuRide AI
          </span>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
