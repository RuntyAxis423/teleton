import React from 'react';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget';
import ImpactDashboard from './ImpactDashboard';
import CommitmentsSection from './CommitmentsSection';
import ImpactStoryCreator from './ImpactStoryCreator';
import AdvancedPanel from './AdvancedPanel';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-surface-light via-gray-50 to-teleton-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero Content + Chat */}
          <div className="space-y-6">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h1 className="text-4xl md:text-6xl font-poppins font-bold">
                <span className="bg-gradient-to-r from-teleton-primary to-teleton-accent bg-clip-text text-transparent">
                  Teletón 360
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-text-main/80 font-inter font-medium">
                Transparencia y Esperanza en tiempo real
              </h2>
              <p className="text-lg text-text-main/70 font-inter leading-relaxed max-w-2xl">
                Plataforma integral que conecta a benefactores, promotores y coordinadores 
                para brindar transparencia total en nuestros programas de rehabilitación 
                y el impacto de cada donación.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teleton-primary text-white px-8 py-4 rounded-lg hover:bg-teleton-primary/90 transition-colors font-inter font-semibold text-lg shadow-lg"
                >
                  Ver Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teleton-accent text-text-main px-8 py-4 rounded-lg hover:bg-teleton-accent/90 transition-colors font-inter font-semibold text-lg shadow-lg"
                >
                  Hacer Donación
                </motion.button>
              </div>
            </motion.div>

            {/* Chat Widget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="shadow-xl"
            >
              <ChatWidget />
            </motion.div>
          </div>

          {/* Right Column - Impact Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-20"
          >
            <ImpactDashboard />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-poppins font-bold text-teleton-primary">30+</div>
            <div className="text-text-main/60 font-inter">Años de experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-poppins font-bold text-teleton-primary">23</div>
            <div className="text-text-main/60 font-inter">Centros CRIT</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-poppins font-bold text-teleton-primary">30K+</div>
            <div className="text-text-main/60 font-inter">Beneficiarios</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-poppins font-bold text-teleton-primary">87%</div>
            <div className="text-text-main/60 font-inter">Tasa de éxito</div>
          </div>
        </div>

        {/* Commitments Section */}
        <CommitmentsSection />

        {/* Impact Story Creator Section */}
        <ImpactStoryCreator />

        {/* Advanced Panel Section */}
        <AdvancedPanel />
      </div>
    </section>
  );
};

export default Hero;