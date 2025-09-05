import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Básico',
    price: '99',
    features: [
      'Gestão de Clientes (CRM)',
      'Até 5 Usuários',
      'Funil de Vendas',
      'Suporte por Email',
    ],
    recommended: false,
  },
  {
    name: 'Pro',
    price: '199',
    features: [
      'Tudo do plano Básico',
      'Até 20 Usuários',
      'Gestão de Projetos e Orçamentos',
      'Relatórios Avançados',
      'Suporte Prioritário por Chat',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Contato',
    features: [
      'Tudo do plano Pro',
      'Usuários Ilimitados',
      'Integrações Personalizadas',
      'Gerente de Contas Dedicado',
      'Segurança Avançada (SSO)',
    ],
    recommended: false,
  },
];

const PricingCard = ({ plan, index }) => {
  const showNotImplementedToast = () => {
    toast.info("🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`flex flex-col h-full ${plan.recommended ? 'border-blue-600 border-2 shadow-2xl' : 'shadow-lg'}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <CardDescription>
            {plan.price === 'Contato' ? (
              <span className="text-3xl font-bold">Personalizado</span>
            ) : (
              <div>
                <span className="text-4xl font-bold">R${plan.price}</span>
                <span className="text-base text-gray-500">/mês</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild className={`w-full ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`} variant={plan.recommended ? 'default' : 'outline'}>
              <Link to="/login">
                {plan.price === 'Contato' ? 'Entrar em Contato' : 'Assinar'}
              </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Encontre o plano ideal para seu negócio
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Planos flexíveis que crescem com sua loja. Sem taxas ocultas. Cancele quando quiser.
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;