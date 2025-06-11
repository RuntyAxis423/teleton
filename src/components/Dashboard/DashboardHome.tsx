import React from 'react';
import { Users, FileText, Clock, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockKPIs, mockCommitments, mockBenefactors } from '../../data/mockData';

interface DashboardHomeProps {
  userRole: 'promotor' | 'coordinador';
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ userRole }) => {
  const totalBenefactors = mockBenefactors.length;
  const vipBenefactors = mockBenefactors.filter(b => b.isVIP).length;
  const pendingCommitments = mockCommitments.filter(c => c.status === 'pending').length;
  const overdueCommitments = mockCommitments.filter(c => c.status === 'overdue').length;
  
  const averageNPS = mockKPIs.reduce((sum, kpi) => sum + kpi.nps, 0) / mockKPIs.length;

  const quickStats = [
    {
      label: 'Total Benefactores',
      value: totalBenefactors,
      icon: Users,
      color: 'text-teleton-primary',
      change: '+12%',
    },
    {
      label: 'Benefactores VIP',
      value: vipBenefactors,
      icon: Star,
      color: 'text-teleton-accent',
      change: '+5%',
    },
    {
      label: 'Compromisos Pendientes',
      value: pendingCommitments,
      icon: Clock,
      color: 'text-blue-600',
      change: '-8%',
    },
    {
      label: 'Casos Vencidos',
      value: overdueCommitments,
      icon: AlertTriangle,
      color: 'text-red-600',
      change: '+2',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-poppins font-bold text-teleton-primary">
          Dashboard Principal
        </h1>
        <p className="text-text-main/60 font-inter">
          Bienvenido de vuelta, aquí tienes el resumen de tu actividad
        </p>
      </div>

      {/* SLA Alert */}
      {overdueCommitments > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-poppins font-semibold text-red-800 mb-2">
                ⚠️ Alerta SLA
              </h3>
              <p className="text-red-700 font-inter mb-4">
                Tienes {overdueCommitments} compromiso{overdueCommitments > 1 ? 's' : ''} vencido{overdueCommitments > 1 ? 's' : ''} que requiere{overdueCommitments > 1 ? 'n' : ''} atención inmediata.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-inter font-medium"
              >
                Ver Compromisos Vencidos
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-poppins font-bold text-text-main">
                {stat.value}
              </div>
              <div className="text-sm text-text-main/60 font-inter">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-poppins font-semibold text-teleton-primary mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-teleton-primary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main">
                  Nueva interacción registrada
                </div>
                <div className="text-xs text-text-main/60">
                  Grupo Empresarial López - Hace 2 horas
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main">
                  Compromiso próximo a vencer
                </div>
                <div className="text-xs text-text-main/60">
                  Fundación Corazón - Vence mañana
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main">
                  Nuevo benefactor agregado
                </div>
                <div className="text-xs text-text-main/60">
                  Comercializadora Tapatía - Hace 1 día
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-xl font-poppins font-semibold text-teleton-primary mb-4">
            Rendimiento General
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-inter text-text-main/60">NPS Promedio</span>
                <span className="text-lg font-poppins font-bold text-teleton-primary">
                  {averageNPS.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teleton-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(averageNPS / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-inter text-text-main/60">Cumplimiento SLA</span>
                <span className="text-lg font-poppins font-bold text-green-600">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: '94%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-inter text-text-main/60">Satisfacción General</span>
                <span className="text-lg font-poppins font-bold text-teleton-accent">8.7</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teleton-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: '87%' }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-teleton-primary to-teleton-primary/80 p-6 rounded-xl text-white"
      >
        <h3 className="text-xl font-poppins font-semibold mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors font-inter font-medium"
          >
            + Nuevo Caso
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors font-inter font-medium"
          >
            Revisar Compromisos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors font-inter font-medium"
          >
            Generar Reporte
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;