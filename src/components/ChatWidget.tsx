import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  openAiApiKey?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ openAiApiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente de Teletón 360. Puedo ayudarte con información sobre nuestros programas, transparencia financiera, casos de éxito y cómo hacer donaciones. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('donación') || input.includes('donar')) {
      return 'Para hacer una donación, puedes usar nuestro sistema seguro en línea. Aceptamos transferencias bancarias, tarjetas de crédito y débito. También puedes contactar directamente con nuestro equipo de desarrollo para donaciones corporativas mayores a $50,000 MXN.';
    }
    
    if (input.includes('transparencia') || input.includes('finanzas')) {
      return 'Nuestra transparencia es fundamental. Publicamos informes financieros trimestrales, auditorías externas anuales y reportes de impacto detallados. El 85% de las donaciones van directamente a programas de rehabilitación. ¿Te gustaría ver nuestro último informe?';
    }
    
    if (input.includes('programa') || input.includes('servicios')) {
      return 'Ofrecemos servicios integrales de rehabilitación: terapia física, ocupacional, lenguaje, psicología, trabajo social y medicina de rehabilitación. Atendemos principalmente a niños, niñas y adolescentes con discapacidad motriz, congénita o adquirida.';
    }
    
    if (input.includes('casos') || input.includes('éxito') || input.includes('historias')) {
      return 'Tenemos miles de casos de éxito. Por ejemplo, María, de 8 años, logró caminar después de 2 años de terapia intensiva. José, de 15 años, ahora compite en natación paralímpica. Cada caso es único y celebramos cada logro, por pequeño que parezca.';
    }
    
    return 'Gracias por tu interés en Teletón 360. Puedo brindarte información sobre donaciones, transparencia financiera, nuestros programas de rehabilitación y casos de éxito. También puedo conectarte con un especialista si necesitas información más específica. ¿Hay algo en particular que te gustaría saber?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-teleton-accent rounded-full animate-pulse-dots"></div>
      <div className="w-2 h-2 bg-teleton-accent rounded-full animate-pulse-dots" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-teleton-accent rounded-full animate-pulse-dots" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  return (
    <div className="w-full max-w-md h-[460px] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-teleton-primary text-white p-4 flex items-center space-x-3">
        <Bot size={24} />
        <div>
          <h3 className="font-semibold font-inter">👋 Habla con Teletón Bot</h3>
          <p className="text-sm opacity-90">En línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[320px]" aria-live="polite">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? 'bg-teleton-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {message.isBot ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`px-3 py-2 rounded-lg ${
                  message.isBot 
                    ? 'bg-teleton-primary text-white' 
                    : 'bg-white border border-gray-300 text-text-main'
                }`}>
                  <p className="text-sm font-inter leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('es-MX', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-teleton-primary text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-teleton-primary text-white px-3 py-2 rounded-lg">
                <LoadingDots />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-primary font-inter text-sm"
            disabled={isLoading}
            aria-label="Mensaje para el chat"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="bg-teleton-primary text-white p-2 rounded-lg hover:bg-teleton-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Enviar mensaje"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;