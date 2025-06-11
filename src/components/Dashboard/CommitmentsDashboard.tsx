import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCommitments, mockBenefactors } from '../../data/mockData';

const CommitmentsDashboard: React.FC = () => {
  const getCommitmentStatus = (commitment: any) => {
    const now = new Date();
    const dueDate = new Date(commitment.dueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (commitment.status === 'completed') return 'completed';
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 1) return 'urgent';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'urgent': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} />;
      case 'overdue': return <AlertTriangle size={20} />;
      case 'urgent': return <Clock size={20} />;
      default: return <Calendar size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'overdue': return 'Vencido';
      case 'urgent': return 'Urgente';
      default: return 'Pendiente';
    }
  };

  const commitmentStats = {
    total: mockCommitments.length,
    completed: mockCommitments.filter(c => c.status === 'completed').length,
    overdue: mockCommitments.filter(c => getCommitmentStatus(c) === 'overdue').length,
    urgent: mockCommitments.filter(c => getCommitmentStatus(c) === 'urgent').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-poppins font-bold text-teleton-primary">
          Compromisos Pendientes
        </h1>
        <p className="text-text-main/60 font-inter">
          Sistema de semáforo para seguimiento SLA
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-poppins font-bold text-teleton-primary">
                {commitmentStats.total}
              </div>
              <div className="text-sm text-text-main/60 font-inter">Total</div>
            </div>
            <Calendar className="w-8 h-8 text-teleton-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-poppins font-bold text-red-600">
                {commitmentStats.overdue}
              </div>
              <div className="text-sm text-text-main/60 font-inter">Vencidos (Rojo)</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-poppins font-bold text-yellow-600">
                {commitmentStats.urgent}
              </div>
              <div className="text-sm text-text-main/60 font-inter">Urgentes (Ámbar)</div>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-poppins font-bold text-green-600">
                {commitmentStats.completed}
              </div>
              <div className="text-sm text-text-main/60 font-inter">Completados (Verde)</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>
      </div>

      {/* Commitments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-poppins font-semibold text-teleton-primary">
            Lista de Compromisos
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {mockCommitments.map((commitment, index) => {
            const status = getCommitmentStatus(commitment);
            const benefactor = mockBenefactors.find(b => b.id === commitment.benefactorId);
            const dueDate = new Date(commitment.dueDate);
            const diffTime = dueDate.getTime() - new Date().getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return (
              <motion.div
                key={commitment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="ml-1">{getStatusText(status)}</span>
                      </span>
                      <span className="text-sm text-text-main/60 font-inter">
                        {benefactor?.name}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-inter font-medium text-text-main mb-2">
                      {commitment.description}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-text-main/60 font-inter">
                      <div>
                        <span className="font-medium">Fecha promesa:</span> {new Date(commitment.promiseDate).toLocaleDateString('es-MX')}
                      </div>
                      <div>
                        <span className="font-medium">Vence:</span> {dueDate.toLocaleDateString('es-MX')}
                      </div>
                      {diffDays >= 0 && (
                        <div>
                          <span className="font-medium">Faltan:</span> {diffDays} días
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {status !== 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-teleton-primary text-white px-4 py-2 rounded-lg hover:bg-teleton-primary/90 transition-colors font-inter text-sm"
                      >
                        Marcar Cumplido
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 text-text-main px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-inter text-sm"
                    >
                      Ver Detalle
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommitmentsDashboard;