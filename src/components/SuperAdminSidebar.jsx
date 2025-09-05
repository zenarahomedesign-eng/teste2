import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Headphones, 
  BarChart3,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';

const SuperAdminSidebar = ({ isOpen }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/super-admin/dashboard' },
    { icon: Building2, label: 'Lojas', path: '/super-admin/tenants' },
    { icon: CreditCard, label: 'Planos', path: '/super-admin/plans' },
    { icon: Headphones, label: 'Suporte', path: '/super-admin/support' },
    { icon: BarChart3, label: 'Analytics', path: '/super-admin/analytics' },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-card text-card-foreground border-r shadow-lg z-50 flex flex-col"
    >
      <div className="flex items-center space-x-3 p-4 h-[69px] border-b flex-shrink-0">
        <div className="w-10 h-10 bg-super-admin-highlight rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-lg text-foreground">Super Admin</h1>
            <p className="text-muted-foreground text-sm">Gestão Móveis</p>
          </div>
        )}
      </div>

      <nav className="mt-4 flex-1 px-3 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={index}
              to={item.path}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg transition-all duration-200',
                isActive 
                  ? 'bg-secondary text-foreground font-semibold' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-super-admin-highlight' : 'text-muted-foreground')} />
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 flex-shrink-0">
        <button
          onClick={signOut}
          className="flex items-center w-full px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Sair</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default SuperAdminSidebar;