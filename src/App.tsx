import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingDonationCTA from './components/FloatingDonationCTA';
import Sidebar from './components/Dashboard/Sidebar';
import DashboardHome from './components/Dashboard/DashboardHome';
import BenefactorsList from './components/Dashboard/BenefactorsList';
import CommitmentsDashboard from './components/Dashboard/CommitmentsDashboard';
import QualityMonitor from './components/Dashboard/QualityMonitor';
import { Benefactor } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'promotor' | 'coordinador'>('coordinador');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelectBenefactor = (benefactor: Benefactor) => {
    console.log('Selected benefactor:', benefactor);
    // Handle benefactor selection
  };

  const renderDashboardContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome userRole={userRole} />;
      case 'benefactors':
        return <BenefactorsList onSelectBenefactor={handleSelectBenefactor} />;
      case 'commitments':
        return <CommitmentsDashboard />;
      case 'quality-monitor':
        return <QualityMonitor />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-poppins font-bold text-teleton-primary mb-2">
                Módulo en Desarrollo
              </h2>
              <p className="text-text-main/60 font-inter">
                Este módulo estará disponible próximamente
              </p>
            </div>
          </div>
        );
    }
  };

  if (isLoggedIn) {
    return (
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            userRole={userRole}
          />
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {renderDashboardContent()}
            </div>
          </main>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-surface-light">
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onLogin={handleLogin}
        />
        <Hero />
        <FloatingDonationCTA />
      </div>
    </Router>
  );
}

export default App;