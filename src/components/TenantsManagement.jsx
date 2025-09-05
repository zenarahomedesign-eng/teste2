
    import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TenantsManagement = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Funcionalidade em breve! 🚧",
      description: "Esta funcionalidade ainda não foi implementada, mas você pode solicitá-la no próximo prompt! 🚀",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestão de Lojas (Tenants)</CardTitle>
        <Button onClick={handleAction}>Nova Loja</Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Aqui você poderá criar, listar, suspender e configurar as contas de cada loja.
        </p>
        <div className="mt-4 p-8 text-center border-2 border-dashed rounded-lg">
          <p className="text-gray-500">A lista de lojas aparecerá aqui.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantsManagement;
  