import React, { useState } from 'react';
import { BarChart3, TrendingDown, AlertCircle, CheckCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockKPIs } from '../../data/mockData';

const QualityMonitor: React.FC = () => {
  const [showImprovementPlan, setShowImprovementPlan] = useState(false);
  
  const nationalAverage = {
    nps: 7.5,
    servqual: 8.0,
  };

  const critsBelowAverage = mockKPIs.filter(kpi => kpi.nps < nationalAverage.nps);

  const improvementTasks = [
    { id: 1, task: 'Revisar proceso de seguimiento post-terapia', completed: false },
    { id: 2, task: 'Implementar encuesta de satisfacción semanal', completed: false },
    { id: 3, task: 'Capacitación en atención al benefactor', completed: true },
    { id: 4, task: 'Optimizar tiempos de respuesta', completed: false },
    { id: 5, task: 'Mejoras en comunicación de progreso', completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-poppins font-bold text-teleton-primary">
          Quality Monitor Dashboard
        </h1>
        <p className="text-text-main/60 font-inter">
          Monitoreo SERVQUAL/NPS y planes de mejora exprés
        </p>
      </div>

      {/* Alert Banner */}
      {critsBelowAverage.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-poppins font-semibold text-red-800 mb-2">
                ⚠️ Alerta de Calidad Detectada
              </h3>
              <p className="text-red-700 font-inter mb-4">
                {critsBelowAverage.length} CRIT{critsBelowAverage.length > 1 ? 's' : ''} con NPS por debajo del promedio nacional ({nationalAverage.nps})
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {critsBelowAverage.map(kpi => (
                  <span key={kpi.crit} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    CRIT {kpi.crit}: {kpi.nps}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImprovementPlan(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-inter font-medium flex items-center space-x-2"
              >
                <Play size={16} />
                <span>Activar Plan de Mejora Exprés</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockKPIs.map((kpi, index) => (
          <motion.div
            key={kpi.crit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-6 rounded-xl shadow-sm border ${
              kpi.nps < nationalAverage.nps ? 'border-red-200 bg-red-50' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-poppins font-semibold text-teleton-primary">
                CRIT {kpi.crit}
              </h3>
              <BarChart3 className={`w-6 h-6 ${kpi.nps < nationalAverage.nps ? 'text-red-500' : 'text-teleton-primary'}`} />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-inter text-text-main/60">NPS Score</span>
                  {kpi.nps < nationalAverage.nps && (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className={`text-2xl font-poppins font-bold ${
                  kpi.nps < nationalAverage.nps ? 'text-red-600' : 'text-teleton-primary'
                }`}>
                  {kpi.nps}
                </div>
                <div className="text-xs text-text-main/50 font-inter">
                  Promedio nacional: {nationalAverage.nps}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-inter text-text-main/60">SERVQUAL</span>
                </div>
                <div className="text-2xl font-poppins font-bold text-teleton-primary">
                  {kpi.servqual}
                </div>
                <div className="text-xs text-text-main/50 font-inter">
                  Promedio nacional: {nationalAverage.servqual}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                  <div>
                    <div className="text-text-main/60">Benefactores</div>
                    <div className="font-semibold text-text-main">{kpi.totalBenefactors}</div>
                  </div>
                  <div>
                    <div className="text-text-main/60">Compromisos</div>
                    <div className="font-semibold text-text-main">{kpi.activeCommitments}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Improvement Plan Modal */}
      {showImprovementPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImprovementPlan(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-poppins font-bold text-teleton-primary">
                Plan de Mejora Exprés
              </h2>
              <button
                onClick={() => setShowImprovementPlan(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-text-main/70 font-inter mb-4">
                Se ha generado automáticamente un plan de mejora para los CRITs con indicadores por debajo del promedio nacional.
              </p>
              
              <div className="bg-teleton-primary/10 p-4 rounded-lg mb-6">
                <h3 className="font-poppins font-semibold text-teleton-primary mb-2">
                  CRITs afectados:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {critsBelowAverage.map(kpi => (
                    <span key={kpi.crit} className="bg-teleton-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {kpi.crit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-poppins font-semibold text-teleton-primary">
                Tareas del Plan de Mejora
              </h3>
              
              {improvementTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="w-5 h-5 text-teleton-primary border-gray-300 rounded"
                  />
                  <span className={`flex-1 font-inter ${task.completed ? 'line-through text-text-main/50' : 'text-text-main'}`}>
                    {task.task}
                  </span>
                  {task.completed && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teleton-primary text-white px-6 py-3 rounded-lg hover:bg-teleton-primary/90 transition-colors font-inter font-medium flex-1"
              >
                Iniciar Plan de Mejora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImprovementPlan(false)}
                className="bg-gray-100 text-text-main px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-inter font-medium"
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default QualityMonitor;