import React, { useState, useEffect } from 'react';
import { Send, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ImpactStoryDraft {
  name: string;
  amount: number;
  socialHandle: string;
}

const ImpactStoryCreator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [impactStoryDraft, setImpactStoryDraft] = useState<ImpactStoryDraft>({
    name: '',
    amount: 0,
    socialHandle: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPhoneAnimation, setShowPhoneAnimation] = useState(false);
  const [isFlowComplete, setIsFlowComplete] = useState(false);

  const conversationSteps = [
    {
      botMessage: "¡Hola! ¿Cuál es tu nombre?",
      inputType: "text",
      placeholder: "Escribe tu nombre...",
      field: "name"
    },
    {
      botMessage: (name: string) => `Perfecto, ${name}. ¿Te gustaría apoyar a Teletón con una donación?`,
      inputType: "buttons",
      buttons: ["Sí", "No"]
    },
    {
      botMessage: "¿Con qué cantidad te gustaría donar?",
      inputType: "number",
      placeholder: "500",
      field: "amount"
    },
    {
      botMessage: "Procesando información de pago…",
      inputType: "loading"
    },
    {
      botMessage: (name: string) => `¡Muchas gracias, ${name}! Publicaremos una Historia de Impacto agradeciendo tu donación.\nSi quieres que te etiquetemos, déjanos tu @usuario; si no, escribe "No".`,
      inputType: "text",
      placeholder: "@usuario o No",
      field: "socialHandle"
    },
    {
      botMessage: "Llamando…",
      inputType: "phone"
    }
  ];

  useEffect(() => {
    // Start conversation
    addBotMessage(conversationSteps[0].botMessage as string);
  }, []);

  const addBotMessage = (text: string, isTyping = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsInputDisabled(true);
    addBotMessage("...", true);
    
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      callback();
      setIsInputDisabled(false);
    }, delay);
  };

  const handleSend = () => {
    if (!currentInput.trim() || isInputDisabled) return;

    const step = conversationSteps[currentStep];
    addUserMessage(currentInput);

    // Save data based on current step
    if (step.field) {
      setImpactStoryDraft(prev => ({
        ...prev,
        [step.field!]: step.field === 'amount' ? parseInt(currentInput) || 0 : currentInput
      }));
    }

    setCurrentInput('');
    proceedToNextStep();
  };

  const handleButtonClick = (buttonText: string) => {
    addUserMessage(buttonText);
    
    if (buttonText === "No") {
      simulateTyping(() => {
        addBotMessage("Gracias por visitarnos, ¡que tengas un gran día!");
        setIsFlowComplete(true);
      });
      return;
    }
    
    proceedToNextStep();
  };

  const proceedToNextStep = () => {
    const nextStep = currentStep + 1;
    
    if (nextStep >= conversationSteps.length) {
      setIsFlowComplete(true);
      return;
    }

    const nextStepData = conversationSteps[nextStep];
    
    simulateTyping(() => {
      if (nextStepData.inputType === "loading") {
        handlePaymentProcessing();
      } else if (nextStepData.inputType === "phone") {
        handlePhoneCall();
      } else {
        const message = typeof nextStepData.botMessage === 'function' 
          ? nextStepData.botMessage(impactStoryDraft.name)
          : nextStepData.botMessage;
        addBotMessage(message);
        setCurrentStep(nextStep);
      }
    });
  };

  const handlePaymentProcessing = () => {
    addBotMessage("Procesando información de pago…");
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      addBotMessage("✅ Pago aceptado");
      
      setTimeout(() => {
        const nextStep = currentStep + 2;
        const nextStepData = conversationSteps[nextStep];
        const message = typeof nextStepData.botMessage === 'function' 
          ? nextStepData.botMessage(impactStoryDraft.name)
          : nextStepData.botMessage;
        addBotMessage(message);
        setCurrentStep(nextStep);
      }, 1000);
    }, 1500);
  };

  const handlePhoneCall = () => {
    addBotMessage("Llamando…");
    setShowPhoneAnimation(true);
    
    setTimeout(() => {
      setShowPhoneAnimation(false);
      setIsFlowComplete(true);
      
      // Save final draft to localStorage
      localStorage.setItem('impactStoryDraft', JSON.stringify(impactStoryDraft));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentStepData = conversationSteps[currentStep];
  const showTextInput = currentStepData?.inputType === "text" || currentStepData?.inputType === "number";
  const showButtons = currentStepData?.inputType === "buttons";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="mt-20 mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-teleton-primary mb-4">
          Crea tu Historia de Impacto
        </h2>
        <p className="text-lg text-text-main/70 font-inter max-w-2xl mx-auto">
          Simula una donación y descubre cómo creamos historias personalizadas de impacto
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="w-full max-w-md"
        >
          {/* Chat Widget */}
          <div className="bg-[#F6F1FB] rounded-2xl shadow-lg overflow-hidden h-[380px] flex flex-col">
            {/* Header */}
            <div className="bg-teleton-primary text-white p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">T</span>
              </div>
              <div>
                <h3 className="font-semibold font-inter">Historia de Impacto Bot</h3>
                <p className="text-sm opacity-90">En línea</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      message.isBot 
                        ? 'bg-teleton-primary text-white' 
                        : 'bg-white border border-gray-300 text-text-main'
                    }`}>
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-inter leading-relaxed whitespace-pre-line">
                            {message.text}
                          </p>
                          <p className={`text-xs mt-1 ${message.isBot ? 'text-white/70' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString('es-MX', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Payment Processing Animation */}
              {isProcessingPayment && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="bg-teleton-primary text-white px-4 py-3 rounded-lg flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-inter">Procesando...</span>
                  </div>
                </motion.div>
              )}

              {/* Phone Animation */}
              {showPhoneAnimation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="bg-teleton-primary text-white px-4 py-3 rounded-lg flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Phone className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-inter">Conectando...</span>
                  </div>
                </motion.div>
              )}

              {/* Flow Complete Message */}
              {isFlowComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-text-main/70 font-inter">
                    ¡Simulación completada! Tu historia de impacto será creada.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            {!isFlowComplete && (
              <div className="p-4 border-t border-gray-200">
                {showButtons && (
                  <div className="flex space-x-2">
                    {currentStepData.buttons?.map((button) => (
                      <motion.button
                        key={button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleButtonClick(button)}
                        disabled={isInputDisabled}
                        className="flex-1 bg-teleton-primary text-white py-2 px-4 rounded-lg hover:bg-teleton-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-inter font-medium"
                      >
                        {button}
                      </motion.button>
                    ))}
                  </div>
                )}

                {showTextInput && (
                  <div className="flex space-x-2">
                    <input
                      type={currentStepData.inputType === "number" ? "number" : "text"}
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentStepData.placeholder}
                      disabled={isInputDisabled}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-primary font-inter text-sm disabled:opacity-50"
                      aria-label="Campo de entrada para el chat"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={isInputDisabled || !currentInput.trim()}
                      className="bg-teleton-primary text-white p-2 rounded-lg hover:bg-teleton-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Enviar mensaje"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ImpactStoryCreator;