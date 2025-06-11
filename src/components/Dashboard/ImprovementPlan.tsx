import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KPIData {
  nps: number;
  servqual: number;
  sla: number;
}

interface CRITData {
  [key: string]: KPIData;
}

const ImprovementPlan: React.FC = () => {
  const [selectedCRIT, setSelectedCRIT] = useState('CDMX');
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([false, false, false, false, false]);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Mock data for different CRITs
  const critData: CRITData = {
    'CDMX': { nps: 78, servqual: 4.5, sla: 0.96 },
    'MTY': { nps: 72, servqual: 4.1, sla: 0.88 },
    'GDL': { nps: 55, servqual: 3.2, sla: 0.75 }
  };

  const [currentData, setCurrentData] = useState<KPIData>(critData[selectedCRIT]);

  // KPI targets and color rules
  const kpiTargets = {
    nps: { target: 75, green: 75, amber: 60 },
    servqual: { target: 4.2, green: 4.2, amber: 3.4 },
    sla: { target: 0.95, green: 0.95, amber: 0.80 }
  };

  // Corrective actions checklist
  const correctiveActions = [
    'Revisar causa raíz con equipo local',
    'Comunicar plan a promotores',
    'Capacitación flash de 30 min',
    'Enviar actualización semanal a benefactores',
    'Verificar KPI después de 7 días'
  ];

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`improvement-plan-${selectedCRIT}`);
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress));
    } else {
      setCompletedTasks([false, false, false, false, false]);
    }
  }, [selectedCRIT]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`improvement-plan-${selectedCRIT}`, JSON.stringify(completedTasks));
  }, [completedTasks, selectedCRIT]);

  // Update data when CRIT changes
  useEffect(() => {
    setCurrentData(critData[selectedCRIT]);
  }, [selectedCRIT]);

  // Check for success condition
  useEffect(() => {
    const allKPIsGreen = getKPIColor('nps', currentData.nps) === 'green' &&
                        getKPIColor('servqual', currentData.servqual) === 'green' &&
                        getKPIColor('sla', currentData.sla) === 'green';
    const allTasksComplete = completedTasks.every(task => task);
    
    setShowSuccessBanner(allKPIsGreen && allTasksComplete);
  }, [currentData, completedTasks]);

  const getKPIColor = (kpi: keyof KPIData, value: number): 'green' | 'amber' | 'red' => {
    const config = kpiTargets[kpi];
    if (value >= config.green) return 'green';
    if (value >= config.amber) return 'amber';
    return 'red';
  };

  const getColorClasses = (color: 'green' | 'amber' | 'red') => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          badge: 'bg-green-100 text-green-800'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          badge: 'bg-amber-100 text-amber-800'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-100 text-red-800'
        };
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...completedTasks];
    newTasks[index] = !newTasks[index];
    setCompletedTasks(newTasks);
  };

  const completedCount = completedTasks.filter(task => task).length;
  const progressPercentage = (completedCount / correctiveActions.length) * 100;

  // Test function to simulate KPI drop
  const simulateKPIDrop = () => {
    setCurrentData(prev => ({ ...prev, nps: 55 }));
  };

  const formatKPIValue = (kpi: keyof KPIData, value: number): string => {
    if (kpi === 'sla') return `${(value * 100).toFixed(0)}%`;
    if (kpi === 'servqual') return value.toFixed(1);
    return value.toString();
  };

  const formatKPITarget = (kpi: keyof KPIData): string => {
    const target = kpiTargets[kpi].target;
    if (kpi === 'sla') return `${(target * 100).toFixed(0)}%`;
    if (kpi === 'servqual') return target.toFixed(1);
    return target.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-teleton-primary">
            Plan de Mejora Exprés
          </h1>
          <p className="text-text-main/60 font-inter">
            Acciones rápidas cuando un indicador baja de la meta
          </p>
        </div>
        
        {/* CRIT Selector */}
        <div className="flex items-center space-x-3">
          <label htmlFor="crit-selector" className="text-sm font-medium text-text-main font-inter">
            CRIT:
          </label>
          <select
            id="crit-selector"
            value={selectedCRIT}
            onChange={(e) => setSelectedCRIT(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-primary font-inter"
            aria-live="polite"
          >
            <option value="CDMX">CDMX</option>
            <option value="MTY">Monterrey</option>
            <option value="GDL">Guadalajara</option>
          </select>
          
          {/* Hidden test button */}
          <button
            onClick={simulateKPIDrop}
            className="opacity-0 hover:opacity-100 transition-opacity text-xs bg-gray-100 px-2 py-1 rounded"
            title="Simular caída de KPI (test)"
          >
            Test
          </button>
        </div>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {showSuccessBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-poppins font-semibold text-green-800">
                  ✅ Plan completado. ¡Excelente trabajo!
                </h3>
                <p className="text-green-700 font-inter">
                  Todos los KPIs están en verde y las acciones correctivas han sido completadas.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NPS Card */}
        <motion.div
          key={`nps-${selectedCRIT}-${currentData.nps}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`p-6 rounded-xl shadow-sm border-2 transition-all duration-500 ${
            getColorClasses(getKPIColor('nps', currentData.nps)).bg
          } ${getColorClasses(getKPIColor('nps', currentData.nps)).border}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-poppins font-semibold text-teleton-primary">NPS</h3>
            <TrendingUp className={`w-6 h-6 ${getColorClasses(getKPIColor('nps', currentData.nps)).text}`} />
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-poppins font-bold ${getColorClasses(getKPIColor('nps', currentData.nps)).text}`}>
              {formatKPIValue('nps', currentData.nps)} / {formatKPITarget('nps')}
            </div>
            <div className="text-sm text-text-main/60 font-inter">Meta: {formatKPITarget('nps')}</div>
          </div>
        </motion.div>

        {/* SERVQUAL Card */}
        <motion.div
          key={`servqual-${selectedCRIT}-${currentData.servqual}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`p-6 rounded-xl shadow-sm border-2 transition-all duration-500 ${
            getColorClasses(getKPIColor('servqual', currentData.servqual)).bg
          } ${getColorClasses(getKPIColor('servqual', currentData.servqual)).border}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-poppins font-semibold text-teleton-primary">SERVQUAL</h3>
            <AlertTriangle className={`w-6 h-6 ${getColorClasses(getKPIColor('servqual', currentData.servqual)).text}`} />
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-poppins font-bold ${getColorClasses(getKPIColor('servqual', currentData.servqual)).text}`}>
              {formatKPIValue('servqual', currentData.servqual)} / {formatKPITarget('servqual')}
            </div>
            <div className="text-sm text-text-main/60 font-inter">Meta: {formatKPITarget('servqual')}</div>
          </div>
        </motion.div>

        {/* SLA Card */}
        <motion.div
          key={`sla-${selectedCRIT}-${currentData.sla}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`p-6 rounded-xl shadow-sm border-2 transition-all duration-500 ${
            getColorClasses(getKPIColor('sla', currentData.sla)).bg
          } ${getColorClasses(getKPIColor('sla', currentData.sla)).border}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-poppins font-semibold text-teleton-primary">SLA</h3>
            <RefreshCw className={`w-6 h-6 ${getColorClasses(getKPIColor('sla', currentData.sla)).text}`} />
          </div>
          <div className="space-y-2">
            <div className={`text-3xl font-poppins font-bold ${getColorClasses(getKPIColor('sla', currentData.sla)).text}`}>
              {formatKPIValue('sla', currentData.sla)} / {formatKPITarget('sla')}
            </div>
            <div className="text-sm text-text-main/60 font-inter">Meta: {formatKPITarget('sla')}</div>
          </div>
        </motion.div>
      </div>

      {/* Corrective Actions Checklist */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-poppins font-semibold text-teleton-primary mb-6">
          Acciones Correctivas
        </h3>
        
        <div className="space-y-4">
          {correctiveActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 ${
                completedTasks[index] 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={completedTasks[index]}
                onChange={() => toggleTask(index)}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                    toggleTask(index);
                  }
                }}
                className="w-5 h-5 text-teleton-primary border-gray-300 rounded focus:ring-2 focus:ring-teleton-primary"
                aria-label={`Acción correctiva: ${action}`}
              />
              <span className={`flex-1 font-inter transition-all duration-300 ${
                completedTasks[index] 
                  ? 'text-green-800 line-through' 
                  : 'text-text-main'
              }`}>
                {action}
              </span>
              {completedTasks[index] && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-main font-inter">
              Progreso del Plan
            </span>
            <span className="text-sm font-medium text-text-main font-inter">
              {completedCount} / {correctiveActions.length} completadas
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className={`h-3 rounded-full transition-colors duration-300 ${
                progressPercentage === 100 ? 'bg-green-600' : 'bg-teleton-accent'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementPlan;