import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2,
  ChevronDown,
  LogOut,
  Briefcase,
  FileText,
  Home,
  HardHat,
  Wallet,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const menuConfig = [
  { 
    title: 'Acesso Rápido',
    items: [
      { label: 'Painel de Projetos', icon: Home, path: '/admin/projetos' },
      { label: 'Acomp. Carteira', icon: Wallet, path: '/admin/acompanhamento-carteira' },
    ],
  },
  { 
    title: 'Comercial',
    items: [
      { label: 'Clientes', icon: Briefcase, path: '/admin/comercial/clientes' },
      { label: 'Usuários', icon: Users, path: '/admin/comercial/usuarios' },
      { label: 'Especificadores', icon: HardHat, path: '/admin/comercial/especificadores' },
      { label: 'Projetos', icon: FileText, path: '/admin/comercial/projetos' },
      { label: 'Contratos', icon: FileText, path: '/admin/comercial/contratos' },
    ],
  },
];

const MenuItem = ({ item, isOpen, activeColor }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.path);

  return (
    <Link
      to={item.path}
      className={cn(
        'flex items-center w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200',
        isActive 
          ? 'bg-secondary text-foreground font-semibold' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      )}
    >
      <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive ? activeColor : 'text-muted-foreground')} />
      {isOpen && <span className="ml-3 truncate">{item.label}</span>}
    </Link>
  );
};

const MenuGroup = ({ group, isOpen, activeColor }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-2">
      {isOpen ? (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left px-4 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider"
        >
          <span>{group.title}</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      ) : (
        <div className="h-8 flex items-center justify-center">
          <div className="w-4/5 h-px bg-border"></div>
        </div>
      )}
      
      <motion.div
        initial="collapsed"
        animate={isExpanded || !isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-1 mt-1">
          {group.items.map((item, index) => (
            <MenuItem key={index} item={item} isOpen={isOpen} activeColor={activeColor} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};


const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { signOut } = useAuth();
  const { currentTenant } = useTenant();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen]);

  return (
    <motion.div
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-card text-card-foreground border-r shadow-lg z-50 flex flex-col"
    >
      <div className={cn('flex items-center space-x-3 px-5 h-[69px] border-b flex-shrink-0')}>
        <div className="w-10 h-10 bg-admin-highlight rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-lg truncate text-foreground">{currentTenant?.name || 'Loja'}</h1>
            <p className="text-muted-foreground text-sm">Administrador</p>
          </div>
        )}
      </div>

      <nav className="mt-4 flex-1 px-3 overflow-y-auto scrollbar-hide">
        {menuConfig.map((group, index) => (
          <MenuGroup key={index} group={group} isOpen={isOpen} activeColor="text-admin-highlight" />
        ))}
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

export default AdminSidebar;