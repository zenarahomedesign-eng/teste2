
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  User,
  Building,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const CRMModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const leads = [
    {
      id: 'L001',
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      stage: 'lead',
      value: 25000,
      source: 'WhatsApp',
      lastContact: '2024-03-10',
      notes: 'Interessada em cozinha planejada'
    },
    {
      id: 'L002',
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      stage: 'qualified',
      value: 18500,
      source: 'Instagram',
      lastContact: '2024-03-09',
      notes: 'Orçamento enviado para dormitório'
    },
    {
      id: 'L003',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      stage: 'proposal',
      value: 32000,
      source: 'Indicação',
      lastContact: '2024-03-08',
      notes: 'Aguardando aprovação do projeto'
    },
    {
      id: 'L004',
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 66666-6666',
      stage: 'negotiation',
      value: 28000,
      source: 'Site',
      lastContact: '2024-03-07',
      notes: 'Negociando condições de pagamento'
    }
  ];

  const clients = [
    {
      id: 'C001',
      name: 'Pedro Almeida',
      email: 'pedro@email.com',
      phone: '(11) 55555-5555',
      address: 'Rua das Flores, 123 - São Paulo',
      totalPurchases: 45000,
      lastPurchase: '2024-02-15',
      projects: 2
    },
    {
      id: 'C002',
      name: 'Lucia Fernandes',
      email: 'lucia@email.com',
      phone: '(11) 44444-4444',
      address: 'Av. Paulista, 456 - São Paulo',
      totalPurchases: 32000,
      lastPurchase: '2024-01-20',
      projects: 1
    }
  ];

  const partners = [
    {
      id: 'P001',
      name: 'Arq. Roberto Silva',
      type: 'Arquiteto',
      email: 'roberto@arquitetura.com',
      phone: '(11) 33333-3333',
      commission: 5,
      totalCommissions: 8500,
      activeProjects: 3
    },
    {
      id: 'P002',
      name: 'Imobiliária Prime',
      type: 'Corretor',
      email: 'contato@prime.com',
      phone: '(11) 22222-2222',
      commission: 3,
      totalCommissions: 12000,
      activeProjects: 5
    }
  ];

  const getStageColor = (stage) => {
    const colors = {
      lead: 'bg-gray-100 text-gray-800',
      qualified: 'bg-blue-100 text-blue-800',
      proposal: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-orange-100 text-orange-800',
      closed: 'bg-green-100 text-green-800'
    };
    return colors[stage] || colors.lead;
  };

  const getStageLabel = (stage) => {
    const labels = {
      lead: 'Lead',
      qualified: 'Qualificado',
      proposal: 'Proposta',
      negotiation: 'Negociação',
      closed: 'Fechado'
    };
    return labels[stage] || 'Lead';
  };

  const handleAction = (action, item = null) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600 mt-2">Gerencie leads, clientes e parceiros</p>
        </div>
        <Button onClick={() => handleAction('create')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leads">Funil de Vendas</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="partners">Parceiros</TabsTrigger>
        </TabsList>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['lead', 'qualified', 'proposal', 'negotiation'].map((stage) => (
              <div key={stage} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{getStageLabel(stage)}</h3>
                  <Badge variant="secondary">
                    {leads.filter(lead => lead.stage === stage).length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {leads
                    .filter(lead => lead.stage === stage)
                    .map((lead, index) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="card-hover cursor-pointer">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{lead.name}</h4>
                                <p className="text-sm text-gray-600">{lead.email}</p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-green-600">
                                  R$ {lead.value.toLocaleString()}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {lead.source}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-gray-500">{lead.notes}</p>
                              
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Phone className="w-3 h-3 mr-1" />
                                  Ligar
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Mail className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <p className="text-sm text-gray-600">{client.id}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{client.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{client.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{client.address}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-gray-500">Total Compras</p>
                        <p className="font-semibold text-green-600">R$ {client.totalPurchases.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Projetos</p>
                        <p className="font-semibold">{client.projects}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAction('view', client)}
                    >
                      Ver Histórico
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <p className="text-sm text-gray-600">{partner.type}</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        {partner.commission}% comissão
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{partner.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{partner.phone}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-gray-500">Total Comissões</p>
                        <p className="font-semibold text-green-600">R$ {partner.totalCommissions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Projetos Ativos</p>
                        <p className="font-semibold">{partner.activeProjects}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleAction('commission', partner)}
                    >
                      Ver Comissões
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRMModule;
