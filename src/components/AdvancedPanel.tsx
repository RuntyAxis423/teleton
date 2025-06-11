import React from 'react';
import { motion } from 'framer-motion';

const AdvancedPanel: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      className="mt-20 mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-teleton-primary mb-4">
          Panel Avanzado
        </h2>
        <p className="text-lg text-text-main/70 font-inter max-w-2xl mx-auto">
          Análisis detallado y métricas avanzadas de nuestro impacto en tiempo real
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex justify-center">
            <iframe 
              width="600" 
              height="500"
              src="https://lookerstudio.google.com/embed/reporting/522c337c-0e08-479a-9e14-cb1bcf7de81a/page/zy5MF"
              frameBorder="0" 
              style={{ border: 0 }} 
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className="rounded-lg shadow-md"
              title="Panel de Análisis Avanzado - Looker Studio"
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-main/60 font-inter">
              Dashboard interactivo con datos actualizados en tiempo real
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdvancedPanel;