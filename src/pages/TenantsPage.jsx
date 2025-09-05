import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Loader2, Building2, Shield, Info, UserX, CheckCircle, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/customSupabaseClient';
import { formatarCNPJ, validarCNPJ, formatarCPF, validarCPF, validarEmail, formatarTelefone } from '@/lib/utils';

const TenantForm = ({ onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '', cnpj: '', proprietario: '', cpf_proprietario: '',
    email: '', telefone: '', endereco: '', cidade: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome da loja é obrigatório.";
    if (!formData.email.trim() || !validarEmail(formData.email)) newErrors.email = "Email inválido.";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório.";
    if (formData.cnpj && !validarCNPJ(formData.cnpj)) newErrors.cnpj = "CNPJ inválido.";
    if (formData.cpf_proprietario && !validarCPF(formData.cpf_proprietario)) newErrors.cpf_proprietario = "CPF inválido.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cnpj') value = formatarCNPJ(value);
    if (name === 'cpf_proprietario') value = formatarCPF(value);
    if (name === 'telefone') value = formatarTelefone(value);
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    } else {
      toast.error("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-1">
      <div className="md:col-span-2">
        <Label htmlFor="name">Nome da Loja</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'border-destructive' : ''} />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} className={errors.cnpj ? 'border-destructive' : ''} />
        {errors.cnpj && <p className="text-sm text-destructive mt-1">{errors.cnpj}</p>}
      </div>
      <div>
        <Label htmlFor="proprietario">Proprietário</Label>
        <Input id="proprietario" name="proprietario" value={formData.proprietario} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="cpf_proprietario">CPF do Proprietário</Label>
        <Input id="cpf_proprietario" name="cpf_proprietario" value={formData.cpf_proprietario} onChange={handleChange} className={errors.cpf_proprietario ? 'border-destructive' : ''} />
        {errors.cpf_proprietario && <p className="text-sm text-destructive mt-1">{errors.cpf_proprietario}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-destructive' : ''} />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} className={errors.telefone ? 'border-destructive' : ''} />
        {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone}</p>}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="endereco">Endereço</Label>
        <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
      </div>
      <DialogFooter className="md:col-span-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>Cancelar</Button>
        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : 'Salvar Loja'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingTenant, setViewingTenant] = useState(null);
  const [deactivatingTenant, setDeactivatingTenant] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const tenantsPromise = supabase.from('tenants').select('*, plans(name)');
    const plansPromise = supabase.from('plans').select('*');

    const [{ data: tenantsData, error: tenantsError }, { data: plansData, error: plansError }] = await Promise.all([tenantsPromise, plansPromise]);

    if (tenantsError) toast.error(`Erro ao buscar lojas: ${tenantsError.message}`);
    else setTenants(tenantsData);

    if (plansError) toast.error(`Erro ao buscar planos: ${plansError.message}`);
    else setPlans(plansData);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveTenant = async (formData) => {
    setFormLoading(true);
    const { error } = await supabase.from('tenants').insert([{ ...formData, status: 'ativo' }]);
    if (error) {
      toast.error(`Erro ao criar loja: ${error.message}`);
    } else {
      toast.success("Loja criada com sucesso!");
      setIsFormOpen(false);
      fetchData();
    }
    setFormLoading(false);
  };

  const handleDeactivateTenant = async () => {
    if (!deactivatingTenant) return;
    const { error } = await supabase.from('tenants').update({ status: 'inativo' }).eq('id', deactivatingTenant.id);
    if (error) {
      toast.error(`Erro ao desativar loja: ${error.message}`);
    } else {
      toast.success(`Loja "${deactivatingTenant.name}" desativada com sucesso!`);
      fetchData();
    }
    setDeactivatingTenant(null);
  };

  const handleSetPlan = async (tenantId, planId) => {
    const { error } = await supabase.from('tenants').update({ plan: planId }).eq('id', tenantId);
    if (error) {
      toast.error(`Erro ao definir plano: ${error.message}`);
    } else {
      toast.success("Plano da loja atualizado com sucesso!");
      fetchData();
    }
  };

  const handleAction = (action) => toast.info(`🚧 Ação de ${action} ainda não implementada.`);

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tenant.email && tenant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tenant.cidade && tenant.cidade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Lojas</h1>
          <p className="text-muted-foreground mt-1">Visualize e gerencie todas as lojas da plataforma.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Adicionar Loja
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lojas Cadastradas</CardTitle>
          <CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar por nome, email ou cidade..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Loja</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Plano</TableHead>
                  <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center h-24"><Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" /></TableCell></TableRow>
                ) : filteredTenants.length > 0 ? (
                  filteredTenants.map(tenant => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium text-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" /> {tenant.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={tenant.status === 'ativo' ? 'default' : 'destructive'} className={tenant.status === 'ativo' ? 'bg-green-500' : ''}>{tenant.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{tenant.plans?.name || 'N/A'}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">{tenant.telefone || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewingTenant(tenant)}><Info className="mr-2 h-4 w-4" /> Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('personificar')}><Shield className="mr-2 h-4 w-4" /> Personificar</DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger><Tag className="mr-2 h-4 w-4" /> Definir Plano</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={tenant.plan} onValueChange={(planId) => handleSetPlan(tenant.id, planId)}>
                                  {plans.map(p => <DropdownMenuRadioItem key={p.id} value={p.id}>{p.name}</DropdownMenuRadioItem>)}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuItem onClick={() => handleAction('editar')}><Edit className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                            {tenant.status === 'ativo' && <DropdownMenuItem onClick={() => setDeactivatingTenant(tenant)} className="text-destructive focus:text-destructive focus:bg-destructive/10"><UserX className="mr-2 h-4 w-4" /> Desativar</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={5} className="text-center h-24 text-muted-foreground">Nenhuma loja encontrada.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}><DialogContent className="sm:max-w-3xl"><DialogHeader><DialogTitle>Adicionar Nova Loja</DialogTitle><DialogDescription>Preencha os dados para registrar uma nova loja na plataforma.</DialogDescription></DialogHeader><TenantForm onSave={handleSaveTenant} onCancel={() => setIsFormOpen(false)} isLoading={formLoading} /></DialogContent></Dialog>
      <Dialog open={!!viewingTenant} onOpenChange={() => setViewingTenant(null)}><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Detalhes da Loja</DialogTitle><DialogDescription>{viewingTenant?.name}</DialogDescription></DialogHeader><div className="grid gap-4 py-4 text-sm">
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">CNPJ</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.cnpj || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">Proprietário</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.proprietario || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">CPF</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.cpf_proprietario || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">Endereço</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.endereco || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">Cidade</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.cidade || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">Telefone</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.telefone || 'N/A'}</span></div>
        <div className="grid grid-cols-3 items-center gap-4"><Label className="text-right font-semibold">Email</Label><span className="col-span-2 text-muted-foreground">{viewingTenant?.email || 'N/A'}</span></div>
      </div><DialogFooter><Button onClick={() => setViewingTenant(null)}>Fechar</Button></DialogFooter></DialogContent></Dialog>
      <AlertDialog open={!!deactivatingTenant} onOpenChange={() => setDeactivatingTenant(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar Desativação</AlertDialogTitle><AlertDialogDescription>Tem certeza que deseja desativar a loja "{deactivatingTenant?.name}"? Esta ação pode ser revertida.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDeactivateTenant} className="bg-destructive hover:bg-destructive/90">Desativar</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </motion.div>
  );
};

export default TenantsPage;