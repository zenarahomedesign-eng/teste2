
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Upload,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ProjectsModule = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 'P001',
      name: 'Cozinha Planejada - Apartamento 120m²',
      client: 'Maria Silva',
      status: 'in_progress',
      value: 25000,
      createdAt: '2024-03-01',
      deadline: '2024-04-15',
      progress: 65
    },
    {
      id: 'P002',
      name: 'Dormitório Casal + Closet',
      client: 'João Santos',
      status: 'pending_approval',
      value: 18500,
      createdAt: '2024-03-05',
      deadline: '2024-04-20',
      progress: 30
    },
    {
      id: 'P003',
      name: 'Home Office Completo',
      client: 'Ana Costa',
      status: 'completed',
      value: 12000,
      createdAt: '2024-02-15',
      deadline: '2024-03-30',
      progress: 100
    },
    {
      id: 'P004',
      name: 'Sala de Estar + Jantar',
      client: 'Carlos Oliveira',
      status: 'cancelled',
      value: 22000,
      createdAt: '2024-02-28',
      deadline: '2024-04-10',
      progress: 15
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_progress: { label: 'Em Andamento', className: 'bg-blue-100 text-blue-800' },
      pending_approval: { label: 'Aguardando Aprovação', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.in_progress;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleAction = (action, project = null) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os seus projetos de móveis planejados</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleAction('upload')}>
            <Upload className="w-4 h-4 mr-2" />
            Upload XML
          </Button>
          <Button onClick={() => handleAction('create')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por projeto ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'in_progress', label: 'Em Andamento' },
                { value: 'pending_approval', label: 'Aguardando' },
                { value: 'completed', label: 'Concluídos' }
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter.value)}
                  size="sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{project.id}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{project.client}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    R$ {project.value.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAction('view', project)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction('edit', project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction('delete', project)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou criar um novo projeto.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsModule;
