import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SuperAdminSidebar from '@/components/SuperAdminSidebar';
import SuperAdminHeader from '@/components/SuperAdminHeader';
import SuperAdminOverview from '@/components/SuperAdminOverview';
import TenantsPage from '@/pages/TenantsPage';
import PlansManagement from '@/components/PlansManagement';
import SupportTools from '@/components/SupportTools';
import PlatformAnalytics from '@/components/PlatformAnalytics';

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const mainContentMargin = sidebarOpen ? 'ml-64' : 'ml-20';

  return (
    <div className="flex h-screen bg-background">
      <SuperAdminSidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <SuperAdminHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<SuperAdminOverview />} />
              <Route path="/dashboard" element={<SuperAdminOverview />} />
              <Route path="/tenants" element={<TenantsPage />} />
              <Route path="/plans" element={<PlansManagement />} />
              <Route path="/support" element={<SupportTools />} />
              <Route path="/analytics" element={<PlatformAnalytics />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;