import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  CheckSquare,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { cn } from '@/lib/utils';

const CollaboratorSidebar = ({ isOpen }) => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { currentTenant } = useTenant();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/colaborador/dashboard' },
    { icon: FolderOpen, label: 'Meus Projetos', path: '/colaborador/projects' },
    { icon: Users, label: 'Meus Clientes', path: '/colaborador/clients' },
    { icon: CheckSquare, label: 'Tarefas', path: '/colaborador/tasks' },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-card text-card-foreground border-r shadow-lg z-50 flex flex-col"
    >
      <div className="flex items-center space-x-3 p-4 h-[69px] border-b flex-shrink-0">
        <div className="w-10 h-10 bg-collaborator-highlight rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-lg truncate text-foreground">Colaborador</h1>
            <p className="text-muted-foreground text-sm truncate">{currentTenant?.name}</p>
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
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-collaborator-highlight' : 'text-muted-foreground')} />
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

export default CollaboratorSidebar;