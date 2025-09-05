import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Settings, Loader2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/customSupabaseClient';

const PlansManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('plans').select('*').order('price');
    if (error) {
      toast.error(`Erro ao buscar planos: ${error.message}`);
    } else {
      setPlans(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleConfigure = () => {
    toast.info("🚧 Funcionalidade de configuração de planos em desenvolvimento.");
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos de Assinatura</h1>
          <p className="text-muted-foreground mt-1">Gerencie os planos disponíveis na plataforma.</p>
        </div>
        <Button onClick={handleConfigure} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Configurar Planos
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div key={plan.id} custom={index} variants={cardVariants} initial="hidden" animate="visible">
              <Card className={`flex flex-col h-full ${plan.name === 'Pro' ? 'border-primary border-2 shadow-lg' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    {plan.name === 'Pro' && <div className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">RECOMENDADO</div>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="my-4 text-center">
                    <span className="text-4xl font-extrabold">R${parseFloat(plan.price).toFixed(2).replace('.', ',')}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-3 text-sm flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                    <Tag className="w-4 h-4 mr-2" />
                    Gerenciar Plano
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PlansManagement;