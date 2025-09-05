import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import AdminOverview from '@/components/AdminOverview';
import PlaceholderPage from '@/components/PlaceholderPage';
import ClientsPage from '@/pages/ClientsPage';
import UsersPage from '@/pages/UsersPage';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const AdminDashboard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const mainContentMargin = sidebarOpen ? 'md:ml-64' : 'md:ml-20';

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <AdminHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/dashboard" element={<AdminOverview />} />
              <Route path="/projetos" element={<PlaceholderPage />} />
              <Route path="/acompanhamento-carteira" element={<PlaceholderPage />} />
              
              <Route path="/comercial/clientes" element={<ClientsPage />} />
              <Route path="/comercial/especificadores" element={<PlaceholderPage />} />
              <Route path="/comercial/projetos" element={<PlaceholderPage />} />
              <Route path="/comercial/contratos" element={<PlaceholderPage />} />

              <Route path="/sistema/usuarios" element={<UsersPage />} />
              
              {/* Add other admin routes here */}
              <Route path="*" element={<PlaceholderPage />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;