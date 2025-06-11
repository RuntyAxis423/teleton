import React from 'react';
import { CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Commitment {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const commitments: Commitment[] = [
  {
    id: '1',
    title: 'Informe de Impacto Q2 – Asociaciones Civiles',
    description: 'Entregar reporte de resultados a las 15 AC de mayor donación.',
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Video de agradecimiento – Grupo interno Teletón',
    description: 'Grabar y enviar cápsula de impacto a voluntarios internos.',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Presentación ejecutiva – Empresa Top 5',
    description: 'Reunión virtual para mostrar KPIs de rehabilitación.',
    status: 'not-started',
  },
  {
    id: '4',
    title: 'Actualización de protocolos COVID-24 – Institución Gubernamental',
    description: 'Remitir nuevas guías sanitarias al organismo regulador.',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Recibo fiscal digital – Empresa donante emergente',
    description: 'Emitir CFDI y confirmar recepción.',
    status: 'in-progress',
  },
  {
    id: '6',
    title: 'Llamada de seguimiento – Benefactor individual (Leal 10+ años)',
    description: 'Verificar satisfacción y próximos pasos.',
    status: 'not-started',
  },
];

const CommitmentsSection: React.FC = () => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          textColor: 'text-green-800',
          badgeColor: 'bg-green-100 text-green-800',
          statusText: 'Completado',
        };
      case 'in-progress':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: <RotateCcw className="w-6 h-6 text-amber-600" />,
          textColor: 'text-amber-800',
          badgeColor: 'bg-amber-100 text-amber-800',
          statusText: 'En proceso',
        };
      case 'not-started':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <XCircle className="w-6 h-6 text-red-600" />,
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-800',
          statusText: 'Sin iniciar',
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <XCircle className="w-6 h-6 text-gray-600" />,
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-800',
          statusText: 'Desconocido',
        };
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="mt-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-teleton-primary mb-4">
          Compromisos Activos
        </h2>
        <p className="text-lg text-text-main/70 font-inter max-w-2xl mx-auto">
          Seguimiento transparente de nuestros compromisos con benefactores y organizaciones aliadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commitments.map((commitment, index) => {
          const statusConfig = getStatusConfig(commitment.status);
          
          return (
            <motion.div
              key={commitment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teleton-primary/20`}
              tabIndex={0}
              role="button"
              aria-label={`Compromiso: ${commitment.title}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.badgeColor} mb-3`}>
                    {statusConfig.icon}
                    <span className="ml-2">{statusConfig.statusText}</span>
                  </div>
                </div>
              </div>
              
              <h3 className={`text-lg font-poppins font-semibold ${statusConfig.textColor} mb-3 leading-tight`}>
                {commitment.title}
              </h3>
              
              <p className="text-text-main/70 font-inter text-sm leading-relaxed">
                {commitment.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-current/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-inter text-text-main/50">
                    Última actualización: Hoy
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-medium text-teleton-primary hover:text-teleton-primary/80 transition-colors"
                  >
                    Ver detalles →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Ver más link */}
      <div className="flex justify-end mt-8">
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="text-teleton-primary hover:text-teleton-accent transition-colors font-inter font-medium text-lg flex items-center space-x-2 group"
        >
          <span>Ver más</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default CommitmentsSection;