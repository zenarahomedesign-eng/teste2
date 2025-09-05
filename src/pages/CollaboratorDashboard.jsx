import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CollaboratorSidebar from '@/components/CollaboratorSidebar';
import CollaboratorHeader from '@/components/CollaboratorHeader';
import CollaboratorOverview from '@/components/CollaboratorOverview';
import MyProjects from '@/components/MyProjects';
import MyClients from '@/components/MyClients';
import MyTasks from '@/components/MyTasks';

const CollaboratorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const mainContentMargin = sidebarOpen ? 'ml-64' : 'ml-20';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <CollaboratorSidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <CollaboratorHeader 
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
              <Route path="/" element={<CollaboratorOverview />} />
              <Route path="/projects" element={<MyProjects />} />
              <Route path="/clients" element={<MyClients />} />
              <Route path="/tasks" element={<MyTasks />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;