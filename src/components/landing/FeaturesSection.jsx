import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, MessageSquare, DollarSign, ShieldCheck, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Briefcase,
    title: 'CRM e Vendas',
    description: 'Funil de vendas visual e histórico completo de interações com clientes.',
  },
  {
    icon: FileText,
    title: 'Orçamentos e Projetos',
    description: 'Gere orçamentos precisos com upload de arquivos XML do Promob.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios e Análises',
    description: 'Acompanhe vendas, performance e comissões com relatórios detalhados.',
  },
  {
    icon: MessageSquare,
    title: 'Integração e Comunicação',
    description: 'Centralize mensagens de WhatsApp e Instagram para nunca perder um lead.',
  },
  {
    icon: DollarSign,
    title: 'Gestão Financeira',
    description: 'Controle de caixa, contas a pagar/receber e fluxo financeiro.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e Autenticação',
    description: 'Proteja seus dados com login seguro, criptografia e isolamento multi-tenant.',
  },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Tudo que sua loja precisa em um só lugar
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Uma plataforma completa com as ferramentas essenciais para otimizar seus processos e impulsionar suas vendas.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;