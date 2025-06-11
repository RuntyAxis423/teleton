import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingDonationCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 70 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-teleton-primary to-teleton-accent p-6 rounded-2xl shadow-2xl text-white max-w-sm">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 bg-white text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Cerrar banner de donación"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-8 h-8 fill-current" />
              <div>
                <h3 className="font-poppins font-bold text-lg">¡Tu ayuda es vital!</h3>
                <p className="text-sm opacity-90 font-inter">Cambia vidas hoy</p>
              </div>
            </div>
            
            <p className="text-sm font-inter mb-4 opacity-95">
              Con tu donación, más niños podrán acceder a terapias de rehabilitación especializadas.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-teleton-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors font-inter"
            >
              Donar Ahora
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingDonationCTA;