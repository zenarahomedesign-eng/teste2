
    import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlatformAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análises da Plataforma</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Relatórios detalhados sobre o desempenho geral da plataforma.
        </p>
        <div className="mt-4 p-8 text-center border-2 border-dashed rounded-lg">
          <p className="text-gray-500">Gráficos e métricas avançadas aparecerão aqui.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformAnalytics;
  