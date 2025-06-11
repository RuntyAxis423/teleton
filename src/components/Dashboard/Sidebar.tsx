import React from 'react';
import { 
  Home, 
  Users, 
  UserCheck, 
  FileText, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Star, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  userRole: 'promotor' | 'coordinador';
}

const modules = [
  { id: 'dashboard', label: 'Inicio / Dashboard', icon: Home, roles: ['promotor', 'coordinador'] },
  { id: 'benefactors', label: 'Lista de Benefactores', icon: Users, roles: ['promotor', 'coordinador'] },
  { id: 'benefactor-detail', label: 'Detalle de Benefactor', icon: UserCheck, roles: ['promotor', 'coordinador'] },
  { id: 'interactions', label: 'Registro de Interacción', icon: FileText, roles: ['promotor', 'coordinador'] },
  { id: 'commitments', label: 'Compromisos Pendientes', icon: Clock, roles: ['promotor', 'coordinador'] },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, roles: ['promotor', 'coordinador'] },
  { id: 'training', label: 'Capacita+', icon: GraduationCap, roles: ['coordinador'] },
  { id: 'impact-stories', label: 'Impact Stories Generator', icon: Star, roles: ['coordinador'] },
  { id: 'surveys', label: 'Encuestas & Feedback', icon: BarChart3, roles: ['coordinador'] },
  { id: 'quality-monitor', label: 'Quality Monitor Dashboard', icon: BarChart3, roles: ['coordinador'] },
  { id: 'improvement-plan', label: 'Plan de Mejora Exprés', icon: Zap, roles: ['coordinador'] },
  { id: 'profile', label: 'Perfil & Ajustes', icon: Settings, roles: ['promotor', 'coordinador'] },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  activeModule, 
  setActiveModule, 
  userRole 
}) => {
  const availableModules = modules.filter(module => module.roles.includes(userRole));

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border-r border-gray-200 h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teleton-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-poppins font-bold text-teleton-primary">Teletón 360</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isCollapsed ? "Expandir menú" : "Contraer menú"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {availableModules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <motion.button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                whileHover={{ x: isCollapsed ? 0 : 4 }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-teleton-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-teleton-accent/10 hover:text-teleton-primary'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-inter text-sm font-medium truncate">
                    {module.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teleton-accent rounded-full flex items-center justify-center">
              <span className="text-text-main font-semibold text-sm">MG</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-text-main truncate">María González</div>
              <div className="text-xs text-gray-500 capitalize">{userRole}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;