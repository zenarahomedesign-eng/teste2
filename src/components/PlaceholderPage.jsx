import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop().replace(/-/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <Construction className="w-16 h-16 text-blue-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize mb-2">
        {pageName}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Esta página está em construção.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md">
        O conteúdo para esta seção será implementado em breve. Fique atento às próximas atualizações! 🚀
      </p>
    </motion.div>
  );
};

export default PlaceholderPage;