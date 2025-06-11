import React from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, onLogin }) => {
  return (
    <nav className="sticky top-0 z-50 bg-surface-light/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-teleton-primary fill-current" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teleton-accent rounded-full"></div>
            </div>
            <span className="text-xl font-poppins font-bold text-teleton-primary">
              Teletón 360
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#inicio" 
              className="text-text-main hover:text-teleton-accent transition-colors font-inter relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teleton-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#transparencia" 
              className="text-text-main hover:text-teleton-accent transition-colors font-inter relative group"
            >
              Transparencia
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teleton-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#impacto" 
              className="text-text-main hover:text-teleton-accent transition-colors font-inter relative group"
            >
              Impacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teleton-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contacto" 
              className="text-text-main hover:text-teleton-accent transition-colors font-inter relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teleton-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={onLogin}
              className="bg-teleton-primary text-white px-4 py-2 rounded-lg hover:bg-text-main transition-colors font-inter font-medium"
            >
              Acceder
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teleton-accent text-text-main px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-inter font-semibold"
            >
              Donar
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-main hover:text-teleton-primary p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              <a href="#inicio" className="text-text-main hover:text-teleton-primary transition-colors font-inter">
                Inicio
              </a>
              <a href="#transparencia" className="text-text-main hover:text-teleton-primary transition-colors font-inter">
                Transparencia
              </a>
              <a href="#impacto" className="text-text-main hover:text-teleton-primary transition-colors font-inter">
                Impacto
              </a>
              <a href="#contacto" className="text-text-main hover:text-teleton-primary transition-colors font-inter">
                Contacto
              </a>
              <button
                onClick={onLogin}
                className="bg-teleton-primary text-white px-4 py-2 rounded-lg hover:bg-text-main transition-colors font-inter font-medium w-full"
              >
                Acceder
              </button>
              <button className="bg-teleton-accent text-text-main px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-inter font-semibold w-full">
                Donar
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;