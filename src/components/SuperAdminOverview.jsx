import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, DollarSign, Activity, Loader2, UserX } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const SuperAdminOverview = () => {
  const [stats, setStats] = useState([
    { title: 'Lojas Ativas', value: '0', icon: Building, change: '' },
    { title: 'Usuários Ativos', value: '0', icon: Users, change: '' },
    { title: 'Usuários Inativos', value: '0', icon: UserX, change: '' },
    { title: 'Receita Recorrente (MRR)', value: 'R$ 0,00', icon: DollarSign, change: 'Em breve' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { count: tenantsCount } = await supabase
          .from('tenants')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'ativo');

        const { count: activeUsersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'ativo');
        
        const { count: inactiveUsersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'inativo');

        setStats(prevStats => [
          { ...prevStats[0], value: tenantsCount?.toString() || '0' },
          { ...prevStats[1], value: activeUsersCount?.toString() || '0' },
          { ...prevStats[2], value: inactiveUsersCount?.toString() || '0' },
          prevStats[3],
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Dashboard Central</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} custom={index} variants={cardVariants} initial="hidden" animate="visible">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminOverview;