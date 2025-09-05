
    import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SupportTools = () => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Funcionalidade em breve! 🚧",
      description: "Esta funcionalidade ainda não foi implementada, mas você pode solicitá-la no próximo prompt! 🚀",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ferramentas de Suporte ("Personificação")</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Acesse temporariamente a conta de um administrador de loja para fornecer suporte. Todas as ações são registradas.
        </p>
        <Button onClick={handleAction}>Acessar Conta de Loja</Button>
        <div className="mt-4 p-8 text-center border-2 border-dashed rounded-lg">
          <p className="text-gray-500">O log de acessos de suporte aparecerá aqui.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTools;
  