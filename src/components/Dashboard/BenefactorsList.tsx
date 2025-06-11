import React, { useState } from 'react';
import { Search, Filter, Plus, Star, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockBenefactors } from '../../data/mockData';
import { Benefactor } from '../../types';

interface BenefactorsListProps {
  onSelectBenefactor: (benefactor: Benefactor) => void;
}

const BenefactorsList: React.FC<BenefactorsListProps> = ({ onSelectBenefactor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'vip'>('all');

  const filteredBenefactors = mockBenefactors.filter(benefactor => {
    const matchesSearch = benefactor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefactor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'vip' && benefactor.isVIP) ||
                         (filterStatus !== 'vip' && benefactor.status === filterStatus);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string, isVIP: boolean) => {
    if (isVIP) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teleton-accent text-text-main">
        <Star size={12} className="mr-1" /> VIP
      </span>;
    }
    
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status === 'active' ? 'Activo' : status === 'pending' ? 'Pendiente' : 'Inactivo'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-teleton-primary">
            Lista de Benefactores
          </h1>
          <p className="text-text-main/60 font-inter">
            Gestiona y da seguimiento a todos los benefactores
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teleton-primary text-white px-4 py-2 rounded-lg hover:bg-teleton-primary/90 transition-colors font-inter font-medium flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nuevo Benefactor</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar benefactores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-primary font-inter"
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teleton-primary font-inter"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="pending">Pendientes</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Benefactors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBenefactors.map((benefactor, index) => (
          <motion.div
            key={benefactor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelectBenefactor(benefactor)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-teleton-primary/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-poppins font-semibold text-teleton-primary mb-1">
                  {benefactor.name}
                </h3>
                {getStatusBadge(benefactor.status, benefactor.isVIP)}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-text-main/60 font-inter">
                <Mail size={16} className="mr-2 text-gray-400" />
                {benefactor.email}
              </div>
              <div className="flex items-center text-sm text-text-main/60 font-inter">
                <Phone size={16} className="mr-2 text-gray-400" />
                {benefactor.phone}
              </div>
              <div className="flex items-center text-sm text-text-main/60 font-inter">
                <MapPin size={16} className="mr-2 text-gray-400" />
                CRIT {benefactor.crit}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-poppins font-bold text-teleton-primary">
                    ${benefactor.totalDonated.toLocaleString('es-MX')}
                  </div>
                  <div className="text-xs text-text-main/60 font-inter">Total donado</div>
                </div>
                {benefactor.lastInteraction && (
                  <div className="text-right">
                    <div className="text-sm font-inter text-text-main">
                      {benefactor.lastInteraction.toLocaleDateString('es-MX')}
                    </div>
                    <div className="text-xs text-text-main/60 font-inter">Última interacción</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBenefactors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg font-inter">
            No se encontraron benefactores que coincidan con los filtros
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefactorsList;