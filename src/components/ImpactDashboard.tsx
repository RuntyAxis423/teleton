import React, { useState, useEffect } from 'react';
import { Users, Heart, TrendingUp, Award, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactMetric {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  change: number;
}

const ImpactDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const metrics: ImpactMetric[] = [
    {
      label: 'Beneficiarios Atendidos',
      value: 30247,
      unit: 'niños y jóvenes',
      icon: <Users className="w-8 h-8" />,
      color: 'text-teleton-primary',
      change: 8.2,
    },
    {
      label: 'Donaciones Recibidas',
      value: 145,
      unit: 'millones MXN',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-teleton-accent',
      change: 12.5,
    },
    {
      label: 'Tasa de Rehabilitación',
      value: 87,
      unit: '% éxito',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-green-600',
      change: 5.3,
    },
    {
      label: 'Centros Activos',
      value: 23,
      unit: 'CRIT en México',
      icon: <MapPin className="w-8 h-8" />,
      color: 'text-blue-600',
      change: 0,
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Animate counters
      metrics.forEach((metric, index) => {
        let start = 0;
        const end = metric.value;
        const duration = 2000;
        const stepTime = 50;
        const steps = duration / stepTime;
        const increment = end / steps;

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(counter);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [metric.label]: Math.floor(start)
          }));
        }, stepTime);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-6 rounded mb-4"></div>
          <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-8 rounded mb-2"></div>
          <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-4 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-[720px] bg-surface-light rounded-2xl shadow-lg p-8">
        <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-8 rounded mb-2 w-1/3"></div>
        <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-4 rounded mb-8 w-1/2"></div>
        <LoadingSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-6 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-4 rounded"></div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-6 rounded mb-4"></div>
            <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:468px_24px] h-40 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-[720px] bg-surface-light rounded-2xl shadow-lg p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-poppins font-bold text-teleton-primary mb-2">
          Dashboard de Impacto en Tiempo Real
        </h2>
        <p className="text-text-main/70 font-inter">
          Transparencia total en nuestros resultados y el uso de donaciones
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={metric.color}>
                {metric.icon}
              </div>
              {metric.change > 0 && (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp size={16} className="mr-1" />
                  +{metric.change}%
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-text-main font-poppins">
                {animatedValues[metric.label]?.toLocaleString('es-MX') || '0'}
              </div>
              <div className="text-sm text-text-main/60 font-inter">{metric.unit}</div>
              <div className="text-sm font-medium text-text-main font-inter">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <Award className="w-6 h-6 text-teleton-accent mr-2" />
            <h3 className="text-xl font-poppins font-semibold text-teleton-primary">
              Logros Recientes
            </h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-teleton-accent pl-4">
              <div className="font-medium text-text-main font-inter">Certificación ISO 9001:2015</div>
              <div className="text-sm text-text-main/60">Sistema de gestión de calidad</div>
              <div className="text-xs text-text-main/50 mt-1">Enero 2024</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="font-medium text-text-main font-inter">Meta anual 2023 superada</div>
              <div className="text-sm text-text-main/60">112% de cumplimiento en rehabilitación</div>
              <div className="text-xs text-text-main/50 mt-1">Diciembre 2023</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-medium text-text-main font-inter">Nuevo CRIT Aguascalientes</div>
              <div className="text-sm text-text-main/60">Centro #23 inaugurado oficialmente</div>
              <div className="text-xs text-text-main/50 mt-1">Noviembre 2023</div>
            </div>
          </div>
        </motion.div>

        {/* Impact Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-teleton-primary mr-2" />
            <h3 className="text-xl font-poppins font-semibold text-teleton-primary">
              Cobertura Nacional
            </h3>
          </div>
          <div className="bg-gradient-to-br from-teleton-primary/10 to-teleton-accent/10 h-40 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-teleton-primary mb-2">23</div>
              <div className="text-text-main/70 font-inter">Centros CRIT</div>
              <div className="text-text-main/60 text-sm font-inter">en toda la República</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-bold text-teleton-primary font-poppins">Norte</div>
              <div className="text-sm text-text-main/60 font-inter">8 centros</div>
            </div>
            <div>
              <div className="font-bold text-teleton-primary font-poppins">Centro</div>
              <div className="text-sm text-text-main/60 font-inter">9 centros</div>
            </div>
            <div>
              <div className="font-bold text-teleton-primary font-poppins">Sur</div>
              <div className="text-sm text-text-main/60 font-inter">6 centros</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Financial Transparency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-teleton-primary to-teleton-primary/80 p-6 rounded-xl text-white mt-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-poppins font-bold mb-2">Transparencia Financiera</h3>
            <p className="font-inter opacity-90">85% de las donaciones van directamente a programas de rehabilitación</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-poppins font-bold">85%</div>
            <div className="text-sm opacity-75 font-inter">Programas directos</div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-inter">Última auditoría: Diciembre 2023</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImpactDashboard;