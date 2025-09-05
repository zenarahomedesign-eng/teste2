
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter,
  CheckSquare,
  Clock,
  Calendar,
  AlertCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const MyTasks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tasks = [
    {
      id: 'T001',
      title: 'Apresentar projeto para Maria Silva',
      description: 'Apresentação do projeto da cozinha planejada',
      project: 'Cozinha Planejada - Apartamento 120m²',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-03-11',
      dueTime: '14:00',
      completed: false
    },
    {
      id: 'T002',
      title: 'Fazer medição - Apartamento Centro',
      description: 'Medição para projeto de dormitório',
      project: 'Dormitório Casal + Closet',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-03-11',
      dueTime: '16:30',
      completed: false
    },
    {
      id: 'T003',
      title: 'Ligar para cliente - Orçamento pendente',
      description: 'Seguimento sobre aprovação do orçamento',
      project: 'Home Office Completo',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-03-12',
      dueTime: '09:00',
      completed: false
    },
    {
      id: 'T004',
      title: 'Entregar projeto finalizado',
      description: 'Entrega dos arquivos finais do projeto',
      project: 'Sala de Estar + Jantar',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-03-12',
      dueTime: '15:00',
      completed: false
    },
    {
      id: 'T005',
      title: 'Reunião de acompanhamento',
      description: 'Reunião para acompanhar andamento da obra',
      project: 'Cozinha Planejada - Apartamento 120m²',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-03-08',
      dueTime: '10:00',
      completed: true
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.low;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    };
    return labels[priority] || 'Baixa';
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return AlertCircle;
    if (priority === 'medium') return Clock;
    return CheckSquare;
  };

  const handleTaskToggle = (taskId) => {
    toast({
      title: "Tarefa atualizada!",
      description: "Status da tarefa foi alterado com sucesso.",
    });
  };

  const handleAction = (action, task = null) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'pending' && !task.completed) ||
                         (selectedFilter === 'completed' && task.completed) ||
                         (selectedFilter === task.priority);
    return matchesSearch && matchesFilter;
  });

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Tarefas</h1>
          <p className="text-gray-600 mt-2">Organize e acompanhe suas atividades</p>
        </div>
        <Button onClick={() => handleAction('create')} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todas' },
                { value: 'pending', label: 'Pendentes' },
                { value: 'completed', label: 'Concluídas' },
                { value: 'high', label: 'Alta Prioridade' }
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

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => {
          const PriorityIcon = getPriorityIcon(task.priority);
          const overdue = isOverdue(task.dueDate);
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`card-hover ${task.completed ? 'opacity-75' : ''} ${overdue ? 'border-red-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {getPriorityLabel(task.priority)}
                          </Badge>
                          {overdue && (
                            <Badge className="bg-red-100 text-red-800">
                              Atrasada
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{task.project}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(task.dueDate).toLocaleDateString('pt-BR')} às {task.dueTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <PriorityIcon className={`w-4 h-4 ${
                          task.priority === 'high' ? 'text-red-500' :
                          task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <span className="text-sm text-gray-600">
                          Prioridade {getPriorityLabel(task.priority).toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou criar uma nova tarefa.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyTasks;
